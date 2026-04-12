import { Link } from "react-router-dom";

function About() {
  return (
    <section className="relative bg-blue-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100 transition-colors duration-300 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/20 dark:bg-red-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 dark:bg-blue-500/10 blur-3xl rounded-full"></div>
      </div>

      {/* HERO */}
      <div className="container mx-auto px-6 pt-28 pb-20 text-center max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          A Better Way to
          <span className="block bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Manage Your Thoughts
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          Your notes deserve more than paper. Experience a secure, beautiful,
          and distraction-free way to capture your ideas.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            to="/createnote"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Start Writing
          </Link>

          <Link
            to="/yournotes"
            className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#1e293b] transition"
          >
            Explore Notes
          </Link>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="container mx-auto px-6 pb-20 grid gap-8 md:grid-cols-3">

        {[
          {
            title: "Secure Storage",
            desc: "Your notes are encrypted and safe. Privacy comes first.",
          },
          {
            title: "Access Anywhere",
            desc: "Use your notes from any device, anytime you need.",
          },
          {
            title: "Organized Thinking",
            desc: "Tags, categories, and structure that actually make sense.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-[#0f172a]/70 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* STORY SECTION */}
      <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1">
          <img
            src="https://itsnotebookapp.netlify.app/assets/about%20-%20awesome-Carwd-T-.jpeg"
            alt=""
            className="rounded-2xl shadow-2xl hover:scale-[1.02] transition"
          />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold leading-tight">
            Built from a Real Problem
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            We know the pain of scattered notes and messy notebooks. So we built
            a platform where everything stays organized, accessible, and clean —
            just the way it should be.
          </p>

          <div className="mt-8">
            <Link
              to="/createnote"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
            >
              Create Your First Note
            </Link>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="container mx-auto px-6 pb-24 text-center max-w-2xl">
        <h2 className="text-4xl font-bold">
          Start Your Digital Journey
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Turn your ideas into something meaningful. Your future self will thank you.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Get Started Now 🚀
        </Link>
      </div>
    </section>
  );
}

export default About;