import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="h-16 flex items-center justify-between z-10 bg-white shadow-sm fixed top-0 left-0 right-0 px-40">
      <Link to="/" className="text-xl font-bold">
        Hiral Patel
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogOut}>Logout</button>
      </nav>
    </div>
  );
}

export default Header;