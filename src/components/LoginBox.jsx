import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const LoginBox = () => {
  const { isLoggedIn, email, login, logout } = useUser();
  const [input, setInput] = useState("");

  const handleLogin = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(input)) login(input);
    else alert("Please enter a valid email.");
  };

  return (
    <div className="p-4 border rounded max-w-sm mx-auto w-full">
      {isLoggedIn ? (
        <>
          <p className="text-green-600 mb-2 break-words">
            Logged in as: {email}
          </p>
          <button
            onClick={logout}
            className="mt-2 bg-red-500 !text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Your email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded mb-2 text-black bg-white placeholder-gray-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default LoginBox;
