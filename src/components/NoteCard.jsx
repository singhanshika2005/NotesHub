import { Earth, LockKeyhole } from "lucide-react";
import { useAuthState } from "../contextapi/AuthState";
import { useNoteState } from "../contextapi/NoteState";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditNoteModal from "./EditNoteModal";

const NoteCard = ({
  title,
  description,
  tag,
  isPrivate,
  updatedAt,
  image,
  userId,
  userName,
  category,
  noteId,
}) => {
  const { profile } = useAuthState();
  const { deleteNote } = useNoteState();
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditNoteModal open={open} setOpen={setOpen} />

      <div className="group relative overflow-hidden rounded-3xl border bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition duration-500">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={
              image ||
              "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg"
            }
            alt="note"
            className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
          />

          {/* BADGE */}
          <div
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full 
            backdrop-blur-md flex items-center gap-1 shadow-md
            ${
              isPrivate
                ? "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300"
                : "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300"
            }`}
          >
            {isPrivate ? (
              <>
                <LockKeyhole size={14} /> Private
              </>
            ) : (
              <>
                <Earth size={14} /> Public
              </>
            )}
          </div>
        </div> {/* ✅ FIXED: closed image div */}

        {/* CONTENT */}
        <div className="p-5">

          {/* OWNER */}
          {category === "public" && (
            <Link
              to={`/account/${userId}`}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              👤 {userName || "Unknown User"}
            </Link>
          )}

          {/* DATE */}
          <p className="text-xs text-gray-500 mt-1 mb-2">
            {new Date(updatedAt).toLocaleString()}
          </p>

          {/* TITLE */}
          <h2 className="text-lg font-bold mb-2 line-clamp-1">
            {title}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tag?.map((t, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* ACTIONS */}
          {profile?._id === userId && category === "private" && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setOpen(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(noteId)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NoteCard;