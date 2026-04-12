import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrls } from "../BaseUrls";
import { errorEmitter, successEmitter } from "../ToastEmitter";
import { motion } from "framer-motion";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Signup() {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const changeHadler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await fetch(`${BaseUrls}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (data.success) {
        successEmitter(data.message);
        setUser({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-[#020617] transition-colors duration-300 px-4">

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Join NotesHub and start saving your ideas
        </p>

        {/* Form */}
        <form className="space-y-5 mt-6" onSubmit={submitHandler}>
          
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={changeHadler}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#020617] border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={changeHadler}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#020617] border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={changeHadler}
              placeholder="Create a password"
              className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#020617] border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Button */}
          {loader ? (
            <button
              disabled
              className="w-full py-3 rounded-xl bg-blue-400 text-white flex items-center justify-center gap-2"
            >
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Creating...
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-md"
            >
              Sign Up
            </motion.button>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-500">or continue with</p>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">

          {/* Google */}
          <a
            href="https://accounts.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#020617] border dark:border-gray-700 hover:bg-red-100 transition"
          >
            <FaGoogle className="text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition" />
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#020617] border dark:border-gray-700 hover:bg-sky-100 transition"
          >
            <FaTwitter className="text-gray-600 dark:text-gray-300 group-hover:text-sky-500 transition" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#020617] border dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            <FaGithub className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition" />
          </a>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

export default Signup;