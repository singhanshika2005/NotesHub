import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNoteState } from "../contextapi/NoteState";
import NoteCard from "../components/NoteCard";

const Account = () => {
  const { userId } = useParams();
  const { notes, getUserNotes } = useNoteState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserNotes(userId);
      setUser(userData);
    };

    fetchUser();
  }, [userId]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] text-gray-800 dark:text-gray-100">

      {/* HEADER */}
      <div className="relative py-16 text-center">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-blue-400 to-purple-500"></div>

        {/* Avatar */}
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-[#1e293b] shadow-xl">
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.name || "User"}`
            }
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h1 className="mt-5 text-3xl font-bold tracking-wide">
          {user?.name || "User"}
        </h1>

        {/* Email */}
        {user?.email && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {user.email}
          </p>
        )}

        {/* Stats Card */}
        <div className="mt-6 flex justify-center">
          <div className="flex gap-10 px-8 py-4 rounded-2xl bg-white dark:bg-[#0f172a] shadow-md border border-gray-200 dark:border-gray-700">

            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {notes?.length || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Public Notes
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* NOTES */}
      <div className="max-w-7xl mx-auto px-6 pb-16">

        {notes?.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                description={note.description}
                tag={note.tag}
                isPrivate={note.isPrivate}
                updatedAt={note.updatedAt}
                image={note.image}
                userId={note.createdBy?._id}
                userName={note.createdBy?.name}
                category="public"
                noteId={note._id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-2xl font-semibold mb-2">
              No Public Notes
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              This user hasn’t shared anything yet
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Account;