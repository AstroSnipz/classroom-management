import { getSession, getClassrooms } from "../../../lib/actions";

export default async function ClassRoom() {
  const session = await getSession();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Classrooms</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Classroom Name</th>
              <th className="px-4 py-2 border">Start Time</th>
              <th className="px-4 py-2 border">End Time</th>
              <th className="px-4 py-2 border">Days in Session</th>
              <th className="px-4 py-2 border">Assigned Teacher</th>
            </tr>
          </thead>
          <tbody>
            {session.classrooms.map((classroom) => (
              <tr key={classroom.classroom_id}>
                <td className="px-4 py-2 border">{classroom.name}</td>
                <td className="px-4 py-2 border">{classroom.start_time}</td>
                <td className="px-4 py-2 border">{classroom.end_time}</td>
                <td className="px-4 py-2 border">
                  {classroom.days_in_session}
                </td>
                <td className="px-4 py-2 border">
                  {classroom.teacher_email || "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
