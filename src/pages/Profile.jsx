import { useEffect, useState } from "react";
import { useAuthState } from "../contextapi/AuthState";
import { motion } from "framer-motion";

// 💖 Avatar Styles
const styles = {
  male: ["micah", "notionists", "adventurer"],
  female: ["lorelei", "micah", "fun-emoji"],
};

// 🎨 Avatar Generator
const getAvatar = (seed, gender) => {
  const list = styles[gender] || styles.male;

  const randomStyle =
    list[Math.floor(Math.random() * list.length)];

  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};

const Profile = () => {
  const { profile, setProfile } = useAuthState();
  const [form, setForm] = useState({});

  // ✅ FIXED: Use environment variable (IMPORTANT)
  const API = import.meta.env.VITE_API_URL + "/profile";

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "gender") {
      setForm({
        ...form,
        gender: value,
        avatar: getAvatar(form.name || Date.now(), value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Update Profile (Improved)
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API}/${profile._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setProfile(data.user);
      alert("Profile updated ✅");

    } catch (err) {
      console.error("UPDATE ERROR:", err.message);
      alert(err.message || "Server not responding");
    }
  };

  // 🎲 Random Avatar
  const randomAvatar = () => {
    setForm({
      ...form,
      avatar: getAvatar(
        Math.random().toString(36).substring(7),
        form.gender
      ),
    });
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-[#020617] py-10 px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-4 sm:p-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          My Profile 👤
        </h2>

        {/* 🌸 Avatar */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-pink-400 to-purple-500 opacity-40"></div>

            <div className="p-1 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 relative">
              <img
                src={
                  form.avatar ||
                  getAvatar("default", form.gender || "male")
                }
                alt="avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover bg-white"
              />
            </div>
          </div>

          <button
            onClick={randomAvatar}
            className="text-pink-500 text-sm hover:underline"
          >
            🎲 Random Cute Avatar
          </button>
        </div>

        {/* Gender */}
        <div className="mb-6">
          <select
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-[#020617] border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "phone", "city", "state", "country", "pincode"].map(
            (field) => (
              <input
                key={field}
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                placeholder={field}
                className="px-4 py-2 rounded-xl border bg-gray-50 dark:bg-[#020617] border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400 outline-none"
              />
            )
          )}
        </div>

        {/* Save */}
        <button
          onClick={handleUpdate}
          className="mt-8 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:opacity-90 transition shadow-md"
        >
          Save Changes
        </button>
      </motion.div>
    </section>
  );
};

export default Profile;