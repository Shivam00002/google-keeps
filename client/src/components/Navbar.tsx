import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaMoon, FaSun, FaWindowClose } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { backend_url } from "../libs/url";

interface Note {
  id: string;
  title: string;
  content: string;
  username: string;
}

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [uniqueUsername, setUniqueUsername] = useState<string>("");

  const { isAuthenticated, logout } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${backend_url}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        if (data.length > 0) {
          const usernames = data.map((note: Note) => note.username);
          const uniqueUsernames: any = Array.from(new Set(usernames));
          setUniqueUsername(uniqueUsernames[0] || "");
        }
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white dark:bg-slate-950 shadow-lg border">
      <div className="max-w-full h-fit px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">

              <h1 className="md:text-[18px] sm:text-2xl md:mt-0 -mt-1  md:ml-0 ml-1 font-semibold dark:text-white">
                <Link to="/">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                  <span> </span>
                  <span className="md:text-[18px]">
                    <span>K</span>
                    <span>e</span>
                    <span>e</span>
                    <span>p</span>
                    <span>s</span> ✏️
                  </span>
                </Link>
              </h1>

              <span className="text-gray-600 dark:text-gray-400  font-semibold md:text-[12px] text-sm hidden sm:block">
                Create your own notes with google keeps
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <div className="px-4 py-2 text-sm font-semibold dark:text-gray-200">
                {isAuthenticated && (
                  <div>
                    <span className="text-blue-500">Welcome 😊 </span>
                    <span className="text-orange-600">{uniqueUsername} 🔥</span>
                  </div>
                )}
              </div>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200">
                <FaBell className="h-6 w-6" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {darkMode ? (
                  <FaSun className="h-6 w-6" />
                ) : (
                  <FaMoon className="h-6 w-6" />
                )}
              </button>
              <div className="relative">
                <img
                  onClick={toggleDropdown}
                  className="h-8 w-8 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
                  src="https://ui.shadcn.com/avatars/01.png"
                  alt="User avatar"
                />
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-md py-1 transition-all duration-200 ease-in-out"
                  >
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      Login 😊
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      Signup 🙏
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 font-semibold dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      Home 🏠
                    </Link>
                    {isAuthenticated && (
                      <Link
                        onClick={() => logout()}
                        to="/"
                        className="block px-4 py-2 text-sm text-red-700 font-semibold dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                      >
                        Logout 🔴
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaWindowClose className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <IoMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-slate-900 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="px-4 pt-6 pb-4 space-y-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Menu
            </h2>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FaWindowClose className="h-6 w-6" />
            </button>
          </div>
          {isAuthenticated && (
            <div className="mb-4">
              <span className="text-blue-500 font-semibold">Welcome 😊 </span>
              <span className="text-orange-600 font-semibold">
                {uniqueUsername} 🔥
              </span>
            </div>
          )}
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
            onClick={toggleMenu}
          >
            <IoHomeOutline className="h-6 w-6 mr-2" />
            <span>Home</span>
          </Link>
          <button className="flex items-center w-full text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
            <FaBell className="h-6 w-6 mr-2" />
            <span>Notifications</span>
          </button>
          <Link
            to="/signup"
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
            onClick={toggleMenu}
          >
            <IoMdLogIn className="h-6 w-6 mr-2" />
            <span>Signup / Login</span>
          </Link>
          <button
            onClick={() => {
              toggleDarkMode();
              toggleMenu();
            }}
            className="flex items-center w-full text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
          >
            {darkMode ? (
              <FaSun className="h-6 w-6 mr-2" />
            ) : (
              <FaMoon className="h-6 w-6 mr-2" />
            )}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          {isAuthenticated && (
            <Link
              onClick={() => {
                logout();
                toggleMenu();
              }}
              to="/"
              className="flex items-center text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
            >
              <RiLogoutCircleLine className="h-6 w-6 mr-2" />
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
