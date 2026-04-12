import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const floatAnim = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const Home = () => {
  return (
    <section className="bg-blue-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100 transition-colors duration-300">

      {/* HERO SECTION */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-16 lg:py-24">

        {/* LEFT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-center lg:text-left"
        >
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
            <span className="text-blue-600 dark:text-red-400">Notes</span>Hub
          </h1>

          <p className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Your Notes. Your Space. Anywhere.
          </p>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            A simple and secure way to create, organize, and access your notes
            anytime — without distractions.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/createnote"
                className="px-8 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="px-8 py-3 rounded-xl text-lg font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#1e293b] transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>

      {/* RIGHT IMAGE */}
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  className="mt-10 lg:mt-0 flex justify-center"
>
  <img
    src="https://itsnotebookapp.netlify.app/assets/Bullet_journal-CLlBznnH.png"
    alt="Notebook Illustration"
    className="h-72 sm:h-80 lg:h-96 object-contain drop-shadow-2xl"
  />
</motion.div>
      </div>

      {/* FEATURES SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-6"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-blue-600 dark:text-red-400">Noteshub?</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#0f172a]"
          >
            <h3 className="text-xl font-semibold mb-2">🔒 Secure</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your notes are protected with authentication and private storage.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#0f172a]"
          >
            <h3 className="text-xl font-semibold mb-2">☁️ Cloud Access</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access your notes anytime, anywhere without losing data.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#0f172a]"
          >
            <h3 className="text-xl font-semibold mb-2">⚡ Fast UI</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Smooth, responsive and distraction-free user experience.
            </p>
          </motion.div>

        </div>
      </motion.div>

      {/* REVIEWS */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4"
      >
        <Reviews />
      </motion.div>

      {/* FINAL CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          Start Organizing Your Ideas Today ✨
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Simple. Secure. Powerful note-taking experience.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/createnote"
            className="px-10 py-4 rounded-xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
          >
            Create Your First Note
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Home;