import { motion } from "framer-motion";
import { FaStar, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuthState } from "../contextapi/AuthState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Reviews = () => {
  const { isLogin, profile } = useAuthState();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, review: "" });
  const [showForm, setShowForm] = useState(false);

  const API = "http://localhost:8000/api/v3.2/reviews";

  // ✅ Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ⭐ Rating UI
  const StarRating = ({ rating, setRating }) => (
    <div className="flex gap-2 text-2xl justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => setRating(star)}
          className={`cursor-pointer transition ${
            star <= rating
              ? "text-yellow-400 scale-110"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  // ✍️ Write Review
  const handleWriteReview = () => {
    if (!isLogin) {
      toast("Please login first 🔐");
      navigate("/login");
    } else {
      setShowForm(true);
    }
  };

  // ✅ Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: profile?.name,
        image: profile?.avatar || "https://i.pravatar.cc/150",
        rating: form.rating,
        review: form.review,
        userId: profile?._id,
      };

      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Review added ✨");
        setForm({ rating: 5, review: "" });
        setShowForm(false);
        fetchReviews();
      } else {
        toast.error(data.message || "Failed to add review");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // ❌ Delete Review
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete your review?");
      if (!confirmDelete) return;

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          userid: profile?._id,
        },
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Review deleted 🗑️");
        fetchReviews();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // ⭐ Average Rating
  const avg =
    reviews.length > 0
      ? (
          reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <section className="bg-gray-50 dark:bg-[#020617] py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white">
          Reviews ⭐ {avg}/5
        </h2>

        {/* Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleWriteReview}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow hover:scale-105 transition"
          >
            {isLogin ? "Write a Review ✍️" : "Login to Write Review 🔐"}
          </button>
        </div>

        {/* FORM */}
        {showForm && isLogin && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-xl mx-auto bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow space-y-4"
          >
            <StarRating
              rating={form.rating}
              setRating={(r) => setForm({ ...form, rating: r })}
            />

            <p className="text-center text-sm text-gray-500">
              You selected: {form.rating} ⭐
            </p>

            <textarea
              value={form.review}
              onChange={(e) =>
                setForm({ ...form, review: e.target.value })
              }
              placeholder="Write your review..."
              required
              className="w-full p-3 border rounded-lg dark:bg-[#020617] dark:text-white"
            />

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Submit Review
            </button>
          </motion.form>
        )}

        {/* LIST */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {reviews.map((item) => {
            const isOwner =
              isLogin &&
              profile?._id &&
              item.userId &&
              String(profile._id) === String(item.userId);

            return (
              <div
                key={item._id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-gray-800 dark:text-white">
                      {item.name} {isOwner && "• You"}
                    </h3>

                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-500">
                        ({item.rating}/5)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {item.review}
                </p>

                {/* Actions */}
                <div className="flex justify-end mt-4">
                  {isOwner && (
                    <FaTrash
                      className="cursor-pointer text-red-500 hover:scale-110 transition"
                      onClick={() => handleDelete(item._id)}
                      title="Delete your review"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Reviews;