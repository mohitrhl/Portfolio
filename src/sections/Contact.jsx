import React, { useState } from "react";
import { motion } from "framer-motion"; // for animations
import emailjs from "@emailjs/browser"; // for sending emails directly from the frontend
import Astra from "../assets/Astra.png"; // image on the left side

// =======================
// 🔑 EmailJS credentials (replace with yours)
// =======================
const SERVICE_ID = "service_msru4yg"; // Your EmailJS Service ID
const TEMPLATE_ID = "template_7qqubns"; // Your EmailJS Template ID
const PUBLIC_KEY = "aKLohsVJnST4eZayW"; // Your EmailJS Public Key

const Contact = () => {
  // ✅ Stores form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // --- REMOVED: service, budget ---
    // --- ADDED: subject, message ---
    subject: "",
    message: "",
  });

  // ✅ Stores field validation errors
  const [errors, setErrors] = useState({});

  // ✅ Tracks form status: "", "sending", "success", "error"
  const [status, setStatus] = useState("");

  // -----------------------
  // 🔄 Handles input changes
  // -----------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // // Removed budget number validation as budget field is removed
    // if (name === "budget" && value !== "" && !/^\d+$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    // Clear error if user starts typing
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // -----------------------
  // ✅ Form validation rules
  // -----------------------
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) newErrors.email = "Please enter your email.";
    // --- REMOVED: service and budget validation ---
    // if (!formData.service) newErrors.service = "Fill the details in this field";
    // if (formData.service !== "other" && !formData.budget.trim())
    //   newErrors.budget = "Fill the details in this field";
    // --- ADDED: subject and message validation ---
    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------
  // 📤 Handles form submit
  // -----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if validation fails

    setStatus("sending"); // show "sending..."

    try {
      // Send form data to EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          from_name: formData.name,

          email: formData.email,
          reply_to: formData.email,

          // --- REMOVED: service, budget ---
          // service: formData.service,
          // budget: formData.budget,

          // --- ADDED: subject, message (ensure your EmailJS template matches these field names) ---
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      // ✅ Success
      setStatus("success");
      // --- Updated form clearing to match new fields ---
      setFormData({ name: "", email: "", subject: "", message: "" }); // clear form
    } catch (err) {
      console.error("EmailJS Error:", err);
      if (err?.text) console.error("EmailJS detail:", err.text);

      // ❌ Failure
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-black text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      {/* ====================
        Left Side (Image)
        ==================== */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <motion.img
          src={Astra} // 👉 Replace this with your own image/logo
          alt="Contact"
          className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
          animate={{ y: [0, -10, 0] }} // floating animation
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ====================
        Right Side (Form)
        ==================== */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
      >
        <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>

        {/* --------------------
            Contact Form
        -------------------- */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* 📝 Name */}
          <div className="flex flex-col">
            <label className="mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 text-white border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* 📧 Email */}
          <div className="flex flex-col">
            <label className="mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 text-white border ${
                errors.email ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          {/* 💡 ADDED: Subject Field */}
          <div className="flex flex-col">
            <label className="mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 text-white border ${
                errors.subject ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
          </div>

          {/* 💡 ADDED: Message Textarea (replaces "Explain Your Idea") */}
          <div className="flex flex-col">
            <label className="mb-1">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message" // Changed name from "idea" to "message"
              placeholder="Type your message here..." // Changed placeholder
              rows={5}
              value={formData.message} // Changed value from formData.idea to formData.message
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.message ? "border-red-500" : "border-gray-500" // Changed errors.idea to errors.message
              } focus:outline-none focus:border-blue-500`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>} {/* Changed errors.idea to errors.message */}
          </div>

          {/* Status messages */}
          {status === "sending" && <p className="text-yellow-400 text-sm">Sending...</p>}
          {status === "success" && <p className="text-green-400 text-sm">Message sent successfully ✅</p>}
          {status === "error" && <p className="text-red-400 text-sm">Something went wrong ❌</p>}

          {/* 🚀 Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
