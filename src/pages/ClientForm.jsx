import React, { useState } from 'react';
import { postBrief } from '../api/api';
import Navbar from '../components/Navbar'
import Foot from '../components/Footer'


const ClientForm = () => {
  const [form, setForm] = useState({
    name: '', email: '', type: 'Prototype', desc: '', deadline: '', budget: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const { name, email, desc, deadline } = form;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !re.test(email) || desc.length < 20) return false;
    if (new Date(deadline) <= new Date()) return false;
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return alert('Please fill correctly.');
    await postBrief(form);
    const key = `briefs_${form.email}`;
    const prev = JSON.parse(localStorage.getItem(key)) || [];
    localStorage.setItem(key, JSON.stringify([...prev, form]));
    setMsg('Request submitted!');
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <Navbar/>
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
      <div className="w-full px-4 pb-4">
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
          </form>
        </div>
      </div>
      <Foot/>
    </div>
  );
};

export default ClientForm;
