import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useNoteState } from "../contextapi/NoteState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateNote = () => {
  const { createNotes } = useNoteState();
  const navigate = useNavigate();

  const [isPrivate, setIsPrivate] = useState(true);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tag = tags.map((t) => t.value);

    try {
      const isAdded = await createNotes({
        title,
        description,
        tag,
        isPrivate,
        image,
      });

      if (isAdded) {
        toast.success("Note created successfully 🎉");

        setTitle("");
        setDescription("");
        setTags([]);
        setIsPrivate(true);
        setImage(null);
        setPreview(null);

        setTimeout(() => navigate("/yournotes"), 1000);
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (error) {
      toast.error("Error creating note ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-blue-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100 pt-24 pb-16">

      <div className="container mx-auto px-6 max-w-2xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Create Your Note</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Write something meaningful and keep it safe ☁️
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl p-6 bg-white dark:bg-[#0f172a] shadow"
        >

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            required
            className="w-full px-4 py-3 rounded-xl border dark:bg-[#020617]"
          />

          {/* Description */}
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your note..."
            required
            className="w-full px-4 py-3 rounded-xl border dark:bg-[#020617]"
          />

          {/* Tags */}
          <CreatableSelect
            isMulti
            value={tags}
            onChange={setTags}
            placeholder="Add tags..."
          />

          {/* Toggle */}
          <div className="flex justify-between items-center">
            <span>{isPrivate ? "Private 🔒" : "Public 🌍"}</span>

            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={`w-14 h-7 flex items-center rounded-full p-1 ${
                isPrivate ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full transition ${
                  isPrivate ? "translate-x-7" : ""
                }`}
              ></div>
            </button>
          </div>

          {/* Image */}
          <input type="file" onChange={handleImageChange} />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-40 rounded-lg object-cover"
            />
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl"
          >
            {loading ? "Creating..." : "Add Note"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateNote;