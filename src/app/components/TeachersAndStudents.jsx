import { getSession } from "../../../lib/actions";
import StudentsList from "./StudentsList";
import TeachersList from "./TeachersList";

async function TeachersAndStudents() {
  const session = await getSession();
  console.log(session);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Teachers and Students</h1>

      {/* Teachers Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Teachers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  ID
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  Name
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  Email
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <TeachersList session={session} />
          </table>
        </div>
      </div>

      {/* Students Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Students</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  ID
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  Name
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  Email
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <StudentsList session={session} />
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeachersAndStudents;
