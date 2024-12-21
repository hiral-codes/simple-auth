import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
function SignUp() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      alert(response.data.message)
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-10 border rounded-md shadow-md"
      >
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        <div className="p-2 flex flex-col justify-start gap-5">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            className="outline-none px-2 py-1 border border-black rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            className="outline-none px-2 py-1 border border-black rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none px-2 py-1 border border-black rounded"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none px-2 py-1 border border-black rounded"
          />
          <button
            type="submit"
            className="rounded bg-green-600 text-white py-2 px-1 shadow-md"
          >
            Create An Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
