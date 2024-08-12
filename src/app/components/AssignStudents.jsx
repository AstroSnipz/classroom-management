import { assignStudents, getSession } from "../../../lib/actions";

async function AssignStudents() {
  const session = await getSession();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Assign Students to Teacher</h1>
      <form action={assignStudents}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Select Teacher</label>
            <select
              name="teacherId"
              defaultValue=""
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="" disabled>
                Select a teacher
              </option>
              {session.teachers.map((teacher) => (
                <option key={teacher.user_id} value={teacher.user_id}>
                  {teacher.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Select Students</label>
            <select
              multiple
              name="studentIds"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              {session.students.map((student) => (
                <option key={student.user_id} value={student.user_id}>
                  {student.email}
                </option>
              ))}
            </select>
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Assign Students
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssignStudents;
