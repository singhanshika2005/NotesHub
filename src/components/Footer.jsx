import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#020617] text-gray-700 dark:text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">

        {/* Logo + About */}
        <div className="max-w-xl">
          <Link to="/" className="flex items-center justify-center space-x-2">
            
            {/* Same Logo as Navbar */}
            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-800 to-red-600 text-white font-bold shadow-lg">
              N
            </div>

            <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
              NotesHub
            </span>
          </Link>

          <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            A simple and secure cloud-based notebook to create, manage, and access your notes anytime.
            <br /><br />
            Created by{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              Anshika Singh
            </span>
          </p>
        </div>

        {/* Links Section */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm text-center">

          {/* Services */}
          <div>
            <h3 className="font-semibold uppercase text-gray-800 dark:text-white mb-3">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/createnote"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Create Note
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  See Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold uppercase text-gray-800 dark:text-white mb-3">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold uppercase text-gray-800 dark:text-white mb-3">
              Social
            </h3>

            <div className="flex justify-center space-x-3">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-[#1e293b] hover:bg-black transition"
              >
                <FaGithub className="text-gray-700 dark:text-gray-300 group-hover:text-white text-lg" />
              </a>

              <a
                href="https://www.instagram.com/sanjay_singh.15/"
                target="_blank"
                rel="noreferrer"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-[#1e293b] hover:bg-pink-500 transition"
              >
                <FaInstagram className="text-gray-700 dark:text-gray-300 group-hover:text-white text-lg" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100010363560624"
                target="_blank"
                rel="noreferrer"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-[#1e293b] hover:bg-blue-600 transition"
              >
                <FaFacebookF className="text-gray-700 dark:text-gray-300 group-hover:text-white text-lg" />
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="py-6 text-sm text-center border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        © 2026 NotesHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;