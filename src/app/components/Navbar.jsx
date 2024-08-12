import Link from "next/link";
import { getSession } from "../../../lib/actions";
import LogoutForm from "./LogoutForm";
async function Navbar() {
  const session = await getSession();
  console.log(session);
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">Classroom Management</h1>
        <div>
          {!session.isLoggedIn && (
            <Link href="/login" className="px-4">
              Login
            </Link>
          )}

          {session.isLoggedIn && <LogoutForm />}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
