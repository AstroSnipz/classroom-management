import Link from "next/link";
import TeachersAndStudents from "./TeachersAndStudents";
import CreateClassRoom from "./CreateClassRoom";
import ClassRoom from "./ClassRooms";
import AssignStudents from "./AssignStudents";
import AssignedStudents from "./AssignedStudents";

function PrincipalPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Welcome to the Principal Dashboard
        </h1>
        <Link
          href="/signup"
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Create Account
        </Link>
      </div>
      <div className="mt-8 space-y-8">
        <TeachersAndStudents />
        <ClassRoom />
        <AssignedStudents />
        <CreateClassRoom />
        <AssignStudents />
      </div>
    </div>
  );
}

export default PrincipalPage;
