import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-10 border rounded-md ring-1 shadow-md"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <div className="p-2 flex flex-col justify-start gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none px-2 py-1 ring-1 rounded"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none px-2 py-1 ring-1 rounded"
          />
          <button
            type="submit"
            className="rounded bg-green-600 font-bold text-white py-2 px-1 shadow-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
