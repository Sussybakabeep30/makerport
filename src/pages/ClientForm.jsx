import React, { useState } from 'react';
import { postBrief } from '../api/api';

const ClientForm = () => {
  const [form, setForm] = useState({
    name:'', email:'', type:'Prototype', desc:'', deadline:'', budget:''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    // also save locally
    const key = `briefs_${form.email}`;
    const prev = JSON.parse(localStorage.getItem(key)) || [];
    localStorage.setItem(key, JSON.stringify([...prev, form]));
    setMsg('Request submitted!');
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h2 className="text-2xl mb-4">Submit Your 3D Print Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {msg && <p className="text-green-600">{msg}</p>}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Prototype</option>
          <option>Miniature</option>
          <option>Custom Gadget</option>
          <option>Repair Part</option>
        </select>
        <textarea
          name="desc"
          placeholder="Project Description (at least 20 chars)"
          value={form.desc}
          onChange={handleChange}
          className="w-full border p-2 rounded h-24"
        />
        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="budget"
          placeholder="Budget (optional)"
          value={form.budget}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
