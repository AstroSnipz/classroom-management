"use server";

import db from "./db";
import { defaultSession, sessionOptions } from "./lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const saltRounds = 10;

export async function getSession() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  if (session.isLoggedIn) {
    const teachers = await getTeachers();
    const students = await getStudents();
    const classrooms = await getClassrooms();
    const assignedStudents = await getAssignedStudents();

    session.teachers = teachers;
    session.students = students;
    session.classrooms = classrooms;
    session.assignedStudents = assignedStudents;
  }

  return session;
}

export async function login(prevState, formData) {
  const session = await getSession();

  const formEmail = formData.get("email");
  const formPassword = formData.get("password");

  // Fetch user data from the database
  const userQuery = `
    SELECT user_id, name, email, password, role
    FROM users
    WHERE email = $1
    LIMIT 1
  `;
  const result = await db.query(userQuery, [formEmail]);

  if (result.rowCount === 0) {
    // User not found
    return { error: "Invalid username or password" };
  }

  const user = result.rows[0];

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(formPassword, user.password);

  if (!isPasswordValid) {
    // Invalid password
    return { error: "Invalid username or password" };
  }

  // Set up the user session
  session.user = {
    id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  session.isLoggedIn = true;

  // Save the session
  await session.save();

  redirect("/");

  // Return user role and success message
  return { role: user.role, message: "Login successful" };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}

export async function signup(formData) {
  const session = await getSession();

  const formUserName = formData.get("username");
  const formEmail = formData.get("email");
  const formPassword = formData.get("password");
  const formRole = formData.get("role");

  const hashedPassword = await bcrypt.hash(formPassword, saltRounds);

  const userQuery = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id
  `;

  try {
    const result = await db.query(userQuery, [
      formUserName,
      formEmail,
      hashedPassword,
      formRole,
    ]);
    const userId = result.rows[0].user_id;
    console.log("User created with ID:", userId);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Unable to create user");
  }
}

// Function to fetch all teachers
async function getTeachers() {
  try {
    const result = await db.query(
      "SELECT user_id, name, email FROM users WHERE role = $1",
      ["teacher"]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw new Error("Unable to fetch teachers");
  }
}

// Function to fetch all students
async function getStudents() {
  try {
    const result = await db.query(
      "SELECT user_id, name, email FROM users WHERE role = $1",
      ["student"]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new Error("Unable to fetch students");
  }
}

export async function updateTeacher(formData) {
  const session = await getSession();

  const teacherId = formData.get("teacherId");
  const updatedName = formData.get("updatedName");
  const updatedEmail = formData.get("updatedEmail");

  console.log(updatedName);

  // Update the teacher in the database
  const updateQuery = `
    UPDATE users
    SET name = $1, email = $2
    WHERE user_id = $3 AND role = 'teacher'
  `;
  await db.query(updateQuery, [updatedName, updatedEmail, teacherId]);

  revalidatePath("/");
}

export async function updateStudent(formData) {
  const session = await getSession();

  const studentId = formData.get("studentId");
  const updatedName = formData.get("updatedName");
  const updatedEmail = formData.get("updatedEmail");

  // Update the student in the database
  const updateQuery = `
    UPDATE users
    SET name = $1, email = $2
    WHERE user_id = $3 AND role = 'student'
  `;
  await db.query(updateQuery, [updatedName, updatedEmail, studentId]);

  revalidatePath("/");
}

export async function deleteTeacher(teacherId) {
  const session = await getSession();

  if (session.user.role !== "principal") {
    throw new Error("Unauthorized");
  }

  const deleteQuery = `
    DELETE FROM users
    WHERE user_id = $1 AND role = 'teacher'
  `;

  try {
    await db.query(deleteQuery, [teacherId]);
    console.log(`Teacher with ID ${teacherId} deleted.`);
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw new Error("Unable to delete teacher");
  }
}

export async function deleteStudent(studentId) {
  const session = await getSession();

  if (session.user.role !== "principal") {
    throw new Error("Unauthorized");
  }

  const deleteQuery = `
    DELETE FROM users
    WHERE user_id = $1 AND role = 'student'
  `;

  try {
    await db.query(deleteQuery, [studentId]);
    console.log(`Student with ID ${studentId} deleted.`);
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting student:", error);
    throw new Error("Unable to delete student");
  }
}

export async function createClassroom(formData) {
  const session = await getSession();

  const className = formData.get("name");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const days = formData.get("days");
  const teacherId = formData.get("teacherId");

  console.log(className, startTime, endTime, days, teacherId);

  const createClassroomQuery = `
    INSERT INTO classrooms (name, start_time, end_time, days_in_session, teacher_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING classroom_id
  `;

  try {
    const result = await db.query(createClassroomQuery, [
      className,
      startTime,
      endTime,
      days,
      teacherId,
    ]);

    const classroomId = result.rows[0].classroom_id;
    console.log("Classroom created successfully");

    // Now update students_classrooms table
    const studentIds = formData.getAll("studentIds");

    const assignStudentsQuery = `
      INSERT INTO students_classrooms (student_id, classroom_id)
      VALUES ($1, $2)
    `;

    for (const studentId of studentIds) {
      await db.query(assignStudentsQuery, [studentId, classroomId]);
    }

    console.log("Students assigned to classroom successfully");
    revalidatePath("/"); // Revalidate the path or redirect as needed
  } catch (error) {
    console.error("Error creating classroom:", error);
    throw new Error("Unable to create classroom");
  }
}

export async function getClassrooms() {
  const classroomsQuery = `
    SELECT classrooms.classroom_id, classrooms.name, classrooms.start_time, classrooms.end_time, classrooms.days_in_session, users.email AS teacher_email
    FROM classrooms
    LEFT JOIN users ON classrooms.teacher_id = users.user_id
    ORDER BY classrooms.created_at DESC;
  `;
  const result = await db.query(classroomsQuery);
  return result.rows;
}

// In lib/actions.js or a dedicated file
export async function assignStudents(formData) {
  const session = await getSession();
  const teacherId = formData.get("teacherId");
  const studentIds = formData.getAll("studentIds");

  console.log(teacherId);
  console.log(studentIds);

  const assignQuery = `
    INSERT INTO teacher_student (teacher_id, student_id)
    VALUES ($1, $2)
    RETURNING id;
  `;

  try {
    const assignmentIds = [];

    for (const studentId of studentIds) {
      const result = await db.query(assignQuery, [teacherId, studentId]);
      assignmentIds.push(result.rows[0].id);
    }

    // Optionally update students_classrooms table if necessary
    const assignClassroomQuery = `
      INSERT INTO students_classrooms (student_id, classroom_id)
      SELECT student_id, (SELECT classroom_id FROM classrooms WHERE teacher_id = $1 LIMIT 1) AS classroom_id
      FROM teacher_student
      WHERE teacher_id = $1;
    `;

    await db.query(assignClassroomQuery, [teacherId]);

    return { success: true, assignmentIds };
  } catch (error) {
    console.error("Error assigning student to teacher:", error);
    return { success: false, error: "Unable to assign student to teacher" };
  }
}

export async function getAssignedStudents() {
  const assignedStudentsQuery = `
    SELECT
      teachers.name AS teacher_name,
      students.name AS student_name
    FROM teacher_student
    JOIN users AS teachers ON teacher_student.teacher_id = teachers.user_id
    JOIN users AS students ON teacher_student.student_id = students.user_id
    ORDER BY teachers.name, students.name;
  `;

  try {
    const result = await db.query(assignedStudentsQuery);
    return result.rows;
  } catch (error) {
    console.error("Error fetching assigned students:", error);
    throw new Error("Unable to fetch assigned students");
  }
}

export async function deleteStudentFromClassroom(studentId) {
  const deleteQuery = `
    DELETE FROM teacher_student
    WHERE student_id = $1;
  `;

  try {
    await db.query(deleteQuery, [studentId]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting student:", error);
    throw new Error("Unable to delete student");
  }
}
