import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { pink } from "@mui/material/colors";

const StickyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [setUser]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="relative">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link to="/">MyLogo</Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          <div
            className={`md:flex ${
              isOpen ? "block" : "hidden"
            } flex-col md:flex-row md:items-center w-full md:w-auto`}
          >
            <Link
              to="/"
              className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              Contact Us
            </Link>
            {user ? (
              <div className="flex items-center px-4 py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  to="/add-contact"
                  className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                  Add Contact
                </Link>
                <Link
                  to="/show-contact"
                  className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                  Show Contact
                </Link>
                <Avatar
                  sx={{
                    bgcolor: pink[400],
                    color: "white",
                    cursor: "pointer",
                    ml: 2,
                  }}
                >
                  {user.email[0].toUpperCase()}
                </Avatar>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default StickyNavbar;
