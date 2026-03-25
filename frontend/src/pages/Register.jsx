import { useState } from "react";

function Register({ go }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      go("login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow w-80"
      >
        <h2 className="text-lg font-bold mb-4">Register</h2>

        <input
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-pink-500 text-white py-2 rounded">
          Register
        </button>

        <button
          type="button"
          onClick={() => go("login")}
          className="w-full mt-2 text-sm text-gray-600"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default Register;