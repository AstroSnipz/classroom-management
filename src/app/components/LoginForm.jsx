"use client";

import { login } from "../../../lib/actions";
import { useFormState } from "react-dom";
function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <div className="flex items-center justify-center h-screen">
      <form action={formAction} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="email"
          className="mb-3 p-2 w-full border rounded"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="mb-3 p-2 w-full border rounded"
        />
        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Login
        </button>
        {state?.error && <p>{state.error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
