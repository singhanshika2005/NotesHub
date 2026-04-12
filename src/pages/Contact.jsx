import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8000/api/v3.2/contact/message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.msg);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Decorative Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-400 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-2xl rounded-3xl p-10">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
            Let’s Talk ✨
          </h1>
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Have a question, suggestion, or just want to say hi?
            Drop a message and we’ll respond as soon as possible.
          </p>

          <div className="mt-8 space-y-4 text-gray-700 dark:text-gray-300">
            <p>📍 Lucknow, India</p>
            <p>📞 +91-6386440094</p>
            <p>✉️ as5204443@gmail.com</p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={submitHandler}
          className="space-y-6"
        >

          {/* Floating Input */}
          <div className="relative">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 outline-none py-3 transition"
            />
            <label className="absolute left-0 top-3 text-gray-500 dark:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-3 peer-valid:text-sm">
              Full Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-red-600 outline-none py-3 transition"
            />
            <label className="absolute left-0 top-3 text-gray-500 dark:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-red-600 peer-valid:-top-3 peer-valid:text-sm">
              Email Address
            </label>
          </div>

          <div className="relative">
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 outline-none py-3 transition resize-none"
            />
            <label className="absolute left-0 top-3 text-gray-500 dark:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-valid:-top-3 peer-valid:text-sm">
              Your Message
            </label>
          </div>

          {/* Animated Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-lg font-semibold text-white 
            bg-gradient-to-r from-blue-800 to-red-600 
            hover:scale-105 active:scale-95 
            transition transform duration-300 shadow-xl"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Contact;
