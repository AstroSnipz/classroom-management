import { logout } from "../../../lib/actions";

function LogoutForm() {
  return (
    <form action={logout}>
      <button>Logout</button>
    </form>
  );
}

export default LogoutForm;
