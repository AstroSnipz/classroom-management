import { getSession } from "../../../lib/actions";
import db from "../../../lib/db";
import TeacherUpdateStudent from "./TeacherUpdateStudent";
import Link from "next/link";

async function getStudentsByTeacher(teacherId) {
  const studentsQuery = `
    SELECT students.user_id, students.email, students.name
    FROM teacher_student
    JOIN users AS students ON teacher_student.student_id = students.user_id
    WHERE teacher_student.teacher_id = $1;
  `;

  try {
    const result = await db.query(studentsQuery, [teacherId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching students for teacher:", error);
    throw new Error("Unable to fetch students");
  }
}

export default async function TeacherPage() {
  const session = await getSession();

  // Fetch students if the user is a teacher
  let students = [];
  if (session.user.role === "teacher") {
    students = await getStudentsByTeacher(session.user.id);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Welcome to the Teacher Dashboard
        </h1>
        <Link
          href="/signup"
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Create Account
        </Link>
      </div>

      <TeacherUpdateStudent students={students} />
    </div>
  );
}
