import React, { useState } from "react";
import { postBrief } from "../api/api";
import Navbar from "../components/Navbar";
import Foot from "../components/Footer";
import { ToastContainer, toast } from "react-toastify"; //npm install react-toastify
import "react-toastify/dist/ReactToastify.css";

const ClientForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "Prototype",
    desc: "",
    deadline: "",
    budget: "",
    status: "Pending",
    createdAt: new Date().toISOString(),
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => { //ensures form is filled correctly
    const { name, email, desc, deadline } = form;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !re.test(email) || desc.length < 20) return false;
    if (new Date(deadline) <= new Date()) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return alert("Please fill the form correctly.");

    const formData = {
      ...form,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: form.createdAt || new Date().toISOString(),
      status: "Pending",
    };

    try {
      const response = await postBrief(formData);
      console.log("Submitted to API:", response);

      const key = `briefs_${form.email}`;
      const prev = JSON.parse(localStorage.getItem(key)) || [];
      localStorage.setItem(key, JSON.stringify([...prev, formData]));

      toast.success("Request submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("API submission failed:", error);
      toast.error("API failed. Saving locally only.");

      const key = `briefs_${form.email}`;
      const prev = JSON.parse(localStorage.getItem(key)) || [];
      localStorage.setItem(key, JSON.stringify([...prev, formData]));

      setSubmitted(true);
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Submit a Brief
          </h1>
          <p className="text-base sm:text-lg leading-relaxed">
            Tell me about your project and I'll bring your ideas to life through
            3D printing. Fill in the form below to get started.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                required
              />
            </div>

            {/* Project Type & Deadline */}
            <small className="text-xs text-gray-500 mt-1 block">
              Please select a project type and a future date for the deadline.
            </small>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                required
              >
                <option value="">Select a project type</option>
                <option>Prototype</option>
                <option>Miniature</option>
                <option>Custom Gadget</option>
                <option>Repair Part</option>
              </select>
              <input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                required
              />
            </div>

            {/* Description */}
            <textarea
              name="desc"
              placeholder="Project Description (at least 20 characters)"
              value={form.desc}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded h-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              required
            />

            {/* Budget */}
            <input
              name="budget"
              placeholder="Budget (optional)"
              value={form.budget}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700 transition"
            >
              Submit Request
            </button>
            <ToastContainer position="top-center" />

            {/* show buttons if submission is done*/}
            {submitted && (
              <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition"
                >
                  Go Back to Home
                </button>
                <button
                  onClick={() => {
                    const formattedMessage = `
Hello! I'd like to check the status of my 3D printing project:
---
Name: ${form.name}
Email: ${form.email}
Project Type: ${form.type}
Description: ${form.desc}
Deadline: ${form.deadline}
Budget: ${form.budget || "Not specified"}
---
Could you please provide an update?
                    `.trim();
                    const encodedMessage = encodeURIComponent(formattedMessage);
                    const phoneNumber = "+918169891989";
                    window.open(
                      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
                      "_blank"  //sends wsap message to the number for the creation
                    );
                  }}
                  className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
                >
                  Check status via WhatsApp
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <Foot />
    </div>
  );
};

export default ClientForm;
