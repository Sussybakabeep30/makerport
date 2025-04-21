import React, { useState } from 'react';
import PortfolioFilter from '../components/PortfolioFilter';
import Foot from '../components/Footer';
import Navbar from "../components/Navbar";

const mockProjects = [
  { id: 1, type: 'Mechanical Parts', title: 'Drone Realease Mechanism', img: 'https://via.placeholder.com/300x200' },
  { id: 2, type: 'Artistic Models', title: 'Butterfly Box', img: 'https://via.placeholder.com/300x200' },
  { id: 3, type: 'Gadgets', title: 'Eye of Agamotto (Replica)', img: 'https://via.placeholder.com/300x200' },
  { id: 4, type: 'Mechanical Parts', title: 'Scorpio Pendant', img: 'https://via.placeholder.com/300x200' },
  { id: 5, type: 'Artistic Models', title: 'Laptop/Tv Gear', img: 'https://via.placeholder.com/300x200' },
  { id: 6, type: 'Gadgets', title: 'Bookmark', img: 'https://via.placeholder.com/300x200' },
  ];

const Portfolio = () => {
  const categories = ['All Projects', 'Mechanical Parts', 'Artistic Models', 'Gadgets'];
  const [active, setActive] = useState('All Projects');

  const filtered = active === 'All Projects'
    ? mockProjects
    : mockProjects.filter(p => p.type === active);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12 px-4 sm:px-8 md:px-16">
  <h1 className="text-4xl font-bold mb-3">Portfolio</h1>
  <p className="text-lg max-w-2xl mt-2">
    Explore my collection of 3D printing projects across various categories. From functional mechanical parts to artistic models and practical gadgets.
  </p>
</div>


      {/* Filters using PortfolioFilter component */}
      <div className="flex justify-center mt-6 px-6">
        <PortfolioFilter
          categories={categories}
          active={active}
          onChange={setActive}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-10 max-w-screen-xl mx-auto">
        {filtered.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-md font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.type}</p>
            </div>
          </div>
        ))}
      </div>

      <Foot />
    </div>
  );
};

export default Portfolio;


