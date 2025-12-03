import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="w-full bg-dark-100/80 backdrop-blur-sm py-3 z-20">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          MyMovieApp
        </Link>

        <button
          className="sm:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:flex items-center gap-4">
          <Link to="/" className="text-gray-100 hover:text-white">
            {/* Home */}
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-100 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="text-gray-100 hover:text-white">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-100">Welcome, {user.name || user.email}</span>
              <button onClick={handleLogout} className="bg-light-100 text-black px-3 py-1 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="sm:hidden px-5 pb-4">
          <Link to="/" className="block py-2 text-gray-100">
            Home
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="block py-2 text-gray-100">
                Login
              </Link>
              <Link to="/register" className="block py-2 text-gray-100">
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="py-2 text-gray-100">Welcome, {user.name || user.email}</div>
              <button onClick={handleLogout} className="block w-full text-left bg-light-100 text-black px-3 py-2 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
