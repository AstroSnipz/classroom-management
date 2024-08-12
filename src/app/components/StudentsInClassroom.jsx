import { getSession } from "../../../lib/actions";
import Link from "next/link";

export default async function StudentsInClassroom() {
  const session = await getSession();
  const classroomId = session.classroomId;

  console.log("Session Data:", session); // Debugging output
  console.log("Classroom ID:", classroomId); // Debugging output

  // Fetch students in the classroom
  let students = [];
  if (classroomId) {
    students = await getStudentsInClassroom(classroomId);
  }

  console.log("Fetched Students:", students); // Debugging output

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Students in Classroom
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Student Email</th>
              <th className="px-4 py-2 border">Student Name</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.user_id}>
                  <td className="px-4 py-2 border">{student.email}</td>
                  <td className="px-4 py-2 border">{student.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-2 border text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
