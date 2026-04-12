import { Link } from "react-router-dom";
import { useNoteState } from "../contextapi/NoteState";
import { useEffect } from "react";
import NoteCard from "./../components/NoteCard";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Notes = ({ category = "private" }) => {
  const { getYourNote, getPublicNote, notes } = useNoteState();

  useEffect(() => {
    if (category === "private") {
      getYourNote();
    } else {
      getPublicNote();
    }
  }, [category, getYourNote, getPublicNote]); // ✅ FIXED dependency

  return (
    <section className="relative min-h-screen bg-gradient-to-br 
      from-blue-50 via-white to-purple-50 
      dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] 
      text-gray-800 dark:text-gray-100 overflow-hidden"
    >

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 blur-3xl rounded-full"></div>
      </div>

      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 pt-20 text-center max-w-2xl"
      >
        <h1 className="text-5xl font-bold tracking-tight">
          Notes Cloud ☁️
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Create, explore and discover thoughts from people around you
        </p>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <Link
            to="/createnote"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:scale-105 transition"
          >
            Create Note
          </Link>

          <Link
            to="/yournotes"
            className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 
            hover:bg-gray-100 dark:hover:bg-[#1e293b] transition"
          >
            Your Notes
          </Link>
        </div>
      </motion.div>

      {/* NOTES SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-16"
      >
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <h2 className="text-3xl font-bold">
            {category === "private" ? "Your" : "Public"} Notes
          </h2>

          <span className="px-4 py-1 rounded-full text-sm 
            bg-gray-200 dark:bg-[#1e293b] 
            text-gray-700 dark:text-gray-300"
          >
            {notes?.length || 0} Notes
          </span>
        </div>

        {notes?.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <motion.div
                key={note._id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <NoteCard
                  title={note.title}
                  description={note.description}
                  tag={note.tag}
                  isPrivate={note.isPrivate}
                  updatedAt={note.updatedAt}
                  image={note.image}
                  userId={note.createdBy?._id}
                  userName={note.createdBy?.name} // ✅ for profile
                  category={category}
                  noteId={note._id}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-2xl font-semibold mb-2">
              No Notes Found
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start writing something amazing ✨
            </p>

            <Link
              to="/createnote"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Create Now
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Notes;