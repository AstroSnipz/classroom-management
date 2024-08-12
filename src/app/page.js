import Link from "next/link";
import { getSession } from "../../lib/actions";
import PrincipalPage from "./components/PrincipalPage";
import TeacherPage from "./components/TeacherPage";
import StudentPage from "./components/StudentPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }
  return (
    <>
      {session.user.role === "principal" && <PrincipalPage />}
      {session.user.role === "teacher" && <TeacherPage />}
      {session.user.role === "student" && <StudentPage />}
    </>
  );
}
