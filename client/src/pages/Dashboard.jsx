import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const navigate = useNavigate();

  // Form Data

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFirstName(parsedUser.firstName);
      setLastName(parsedUser.lastName);
      setEmail(parsedUser.email);
    } else {
      alert("Please Login");
      navigate("/login");
    }
    // Fetch registered users
    fetchRegisteredUsers();
  }, [navigate]);

  // Fetch registered users
  const fetchRegisteredUsers = async () => {
    setLoading(true); // Start loading
    try {
      const response = await api.get("/users");
      setRegisteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching registered users:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle form submission to update user
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/user/${user._id}`, {
        firstName,
        lastName,
        email,
      });
      alert("User updated successfully!");
      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); // Update user in state after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/user/${userId}`);
      alert("User deleted successfully!");
      fetchRegisteredUsers(); // Refresh list of registered users
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center p-20">
      <h1 className="text-5xl font-extrabold mb-8">Dashboard</h1>
      {user ? (
        <>
          <div className="mb-8">
            <p className="text-2xl">
              Welcome,{" "}
              <span className="text-blue-500">
                {user.firstName} {user.lastName}
              </span>
              !
            </p>
            <p>Email: {user.email}</p>
          </div>

          {/* Form to Update User */}
          <form
            onSubmit={handleFormSubmit}
            className="w-full max-w-md bg-gray-100 p-6 rounded-md shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <div className="mb-4">
              <label className="block text-left font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>

          {/* List of Registered Users */}
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Registered Users</h2>
            {loading ? (
              <p>Loading users...</p>
            ) : registeredUsers.length > 0 ? (
              <ul className="bg-gray-100 p-4 rounded-md shadow-md">
                {registeredUsers.map((user) => (
                  <li
                    key={user._id} // Make sure to use _id for the key
                    className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow"
                  >
                    <span>
                      {user.firstName} {user.lastName} ({user.email})
                    </span>
                    <button
                      onClick={() => handleDeleteUser(user._id)} // Use _id for deletion
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-2xl">Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
