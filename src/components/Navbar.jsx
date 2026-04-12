import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "../contextapi/AuthState";
import { useState, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isLogin, setIsLogin, setProfile, setToken, profile } = useAuthState();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        mobileMenu &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target)
      ) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenu]);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsLogin(false);
    setProfile(null);
    setToken(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/notes", label: "Notes" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 bg-blue-100 dark:bg-[#020617]/80">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-800 to-red-600 text-white font-bold shadow-lg">
            N
          </div>
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            NotesHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-2 relative">
          {navItems.map((item, i) => (
            <NavLink key={i} to={item.path} className="relative px-5 py-3">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="navHighlight"
                      className="absolute inset-0 border-2 border-blue-700 border-b-0 rounded-t-lg"
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-blue-700 dark:text-red-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-[#1e293b]"
          >
            {darkMode ? (
              <Sun size={18} className="text-white" />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* Avatar */}
          {isLogin ? (
            <div className="relative">
              <img
                ref={avatarRef}
                src={
                  profile?.avatar ||
                  "https://i.pravatar.cc/150?img=12"
                }
                className="h-10 w-10 rounded-full border-2 border-blue-700 cursor-pointer object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0f172a] shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 p-2 z-50"
                >
                  
                  {/* 👇 USER INFO (NEW) */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {profile?.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {profile?.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1e293b]"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/notes"
                    className="block px-4 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1e293b]"
                  >
                    Your Notes
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 mt-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden lg:block px-5 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu */}
        <div ref={mobileRef} className="lg:hidden relative">
  <button
    onClick={() => setMobileMenu(!mobileMenu)}
    className="p-2 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-gray-800 dark:text-white"
  >
    ☰
  </button>

  {mobileMenu && (
    <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 
    bg-white dark:bg-[#0f172a] p-3 space-y-2 z-50">

      {navItems.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          onClick={() => setMobileMenu(false)}
          className="block px-4 py-2 rounded-lg text-gray-800 dark:text-white 
          hover:bg-gray-100 dark:hover:bg-[#1e293b] transition"
        >
          {item.label}
        </NavLink>
      ))}

      {!isLogin && (
        <Link
          to="/login"
          onClick={() => setMobileMenu(false)}
          className="block text-center mt-3 px-4 py-2 rounded-lg 
          bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md"
        >
          Login
        </Link>
      )}
    </div>
  )}
</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;