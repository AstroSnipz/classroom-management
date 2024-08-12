import { getSession, signup } from "../../../lib/actions";

async function SignupForm() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Create Account for{" "}
        {session.user.role === "principal"
          ? "Teacher/Student"
          : session.user.role === "teacher"
          ? "Student"
          : "Unknown Role"}
      </h2>

      <form
        action={signup}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="username"
            name="username"
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            name="role"
            required
          >
            {session.user.role === "principal" && (
              <>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </>
            )}

            {session.user.role === "teacher" && (
              <>
                <option value="student">Student</option>
              </>
            )}
          </select>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
