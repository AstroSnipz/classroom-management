import { createClassroom, getSession } from "../../../lib/actions";

async function CreateClassRoom() {
  // Fetch session data including teachers and students
  const session = await getSession();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create Classroom</h1>
      <form action={createClassroom} method="POST" className="space-y-4">
        <div>
          <label className="block text-gray-700">Classroom Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            name="startTime"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            name="endTime"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Days in Session</label>
          <input
            type="text"
            name="days"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="e.g., Monday-Saturday"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Assign Teacher</label>
          <select
            name="teacherId"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Select a teacher</option>
            {session.teachers.map((teacher) => (
              <option key={teacher.user_id} value={teacher.user_id}>
                {teacher.name}
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Classroom
        </button>
      </form>
    </div>
  );
}

export default CreateClassRoom;
