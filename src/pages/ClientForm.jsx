import React, { useState } from 'react';
import { postBrief } from '../api/api';
import Navbar from '../components/Navbar'
import Foot from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientForm = () => {
  const [form, setForm] = useState({
    name: '', 
    email: '', 
    type: 'Prototype', 
    desc: '', 
    deadline: '', 
    budget: '',
    status: 'Pending',
    createdAt: new Date().toISOString()
  });
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const { name, email, desc, deadline } = form;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !re.test(email) || desc.length < 20) {
      return false;
    }

    if (new Date(deadline) <= new Date()) {
      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return alert('Please fill correctly.');
    
    // Add generated ID and ensure timestamps
    const formData = {
      ...form,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      createdAt: form.createdAt || new Date().toISOString(),
      status: 'Pending'
    };
    
    try {
      const response = await postBrief(formData);
      console.log("Project submitted to API:", response);
      
      // Save to localStorage with the email as key
      const key = `briefs_${form.email}`;
      let prev = [];
      try {
        prev = JSON.parse(localStorage.getItem(key)) || [];
      } catch (err) {
        console.error("Error parsing localStorage:", err);
      }
      
      // Add the new project to localStorage
      localStorage.setItem(key, JSON.stringify([...prev, formData]));
      console.log(`Project saved to localStorage key: ${key}`);
      
      toast.success('Request submitted successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('Failed to submit to API. Saving locally only.');
      
      // Still save to localStorage as backup
      const key = `briefs_${form.email}`;
      let prev = [];
      try {
        prev = JSON.parse(localStorage.getItem(key)) || [];
      } catch (err) {
        console.error("Error parsing localStorage:", err);
      }
      localStorage.setItem(key, JSON.stringify([...prev, formData]));
      
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <Navbar />
      <div className="w-full bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Submit a Brief</h1>
          <p className="text-lg leading-relaxed">
            Tell me about your project and I'll bring your ideas to life through 3D printing. 
            Fill in the form below to get started.
          </p>
        </div>
      </div>

      {/* Form Section - centered */}
      <div className="w-full px-4 pb-6">
        <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {msg && <p className="text-green-600">{msg}</p>}

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
                required
              />
            </div>

            {/* Project Type & Deadline */}
            <small className="text-xs text-gray-400 mt-1">Please select a project type & a future date for your project deadline.</small>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
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
                className="w-full border border-gray-300 p-3 rounded"
                required
              />
            </div>

            {/* Description */}
            <textarea
              name="desc"
              placeholder="Project Description (at least 20 characters)"
              value={form.desc}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded h-32"
              required
            />

            {/* Budget */}
            <input
              name="budget"
              placeholder="Budget (optional)"
              value={form.budget}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700 transition"
            >
              Submit Request
            </button>
            <ToastContainer position="top-center" />

            {/* Conditionally render buttons after submission */}
            {submitted && (
              <div className="mt-6 space-x-4 flex justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700"
                >
                  Go Back to Home
                </button>
                <button
                  onClick={() => {
                    // Format the message for WhatsApp
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
                    
                    // Encode the message for URL
                    const encodedMessage = encodeURIComponent(formattedMessage);
                    
                    // Your WhatsApp number - replace with your actual number including country code
                    const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
                    
                    // Construct WhatsApp URL and redirect
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                  }}
                  className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
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