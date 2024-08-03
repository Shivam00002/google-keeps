import React, { useState, useEffect } from "react";
import { FaBell, FaMoon, FaSun, FaSearch, FaWindowClose } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
              <h1 className="text-gray-900 dark:text-white text-xl sm:text-2 md:mt-0 -mt-1 text-[10px] md:ml-0 ml-1 font-semibold">
                Dainsta Notes
              </h1>
              <span className="text-gray-500 dark:text-gray-400 text-sm hidden sm:block">
                Create your own notes
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <div className="relative"></div>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <FaBell className="h-6 w-6" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
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
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src="https://ui.shadcn.com/avatars/01.png"
                  alt="User avatar"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-md py-1">
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-900">
                      Login
                    </Link>
                    <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-900">
                      Signup
                    </Link>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-900">
                      Home
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-3"></div>
            <button className="flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <FaBell className="h-6 w-6 mr-2" />
              <span>Notifications</span>
            </button>
            <Link to="/signup" className="flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <IoMdLogIn className="h-6 w-6 mr-2" />
              <span>Signup / Login</span>
            </Link>
            <button
              onClick={toggleDarkMode}
              className="flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              {darkMode ? (
                <FaSun className="h-6 w-6 mr-2" />
              ) : (
                <FaMoon className="h-6 w-6 mr-2" />
              )}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <Link to="/" className="flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <IoHomeOutline className="h-6 w-6 mr-2" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;