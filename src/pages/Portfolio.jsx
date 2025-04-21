import React, { useState } from "react";
import PortfolioFilter from "../components/PortfolioFilter";
import Foot from "../components/Footer";
import Navbar from "../components/Navbar";
import bookmark from "../assets/bookmark.jpg";
import butterfly from "../assets/butterfly box.jpg";
import dragon from "../assets/dragon.png";
import gadget from "../assets/gadget.png";
import pendant from "../assets/pendant.jpg";
import timestone from "../assets/timestone.jpg";
import headphone from "../assets/Screenshot 2025-04-21 184750.png";
const mockProjects = [
  {
    id: 1,
    type: "Mechanical Parts",
    title: "Drone Realease Mechanism",
    img: gadget,
  },
  { id: 2, type: "Artistic Models", title: "Butterfly Box", img: butterfly },
  {
    id: 3,
    type: "Artistic Models",
    title: "Eye of Agamotto (Replica)",
    img: timestone,
  },
  { id: 4, type: "Artistic Models", title: "Scorpio Pendant", img: pendant },
  { id: 5, type: "Artistic Models", title: "Laptop/Tv Gear", img: dragon },
  { id: 6, type: "Gadgets", title: "Bookmark", img: bookmark },
  { id: 7, type: "Gadgets", title: "Headphone Holder", img: headphone },
];
const Portfolio = () => {
  const categories = [
    "All Projects",
    "Mechanical Parts",
    "Artistic Models",
    "Gadgets",
  ];
  const [active, setActive] = useState("All Projects");

  const filtered =
    active === "All Projects"
      ? mockProjects
      : mockProjects.filter((p) => p.type === active);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-8 sm:py-12 px-4 sm:px-8 md:px-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">
          Portfolio
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mt-2">
          Explore my collection of 3D printing projects across various
          categories. From functional mechanical parts to artistic models and
          practical gadgets.
        </p>
      </div>

      {/* Filters using PortfolioFilter component */}
      <div className="flex justify-center mt-4 sm:mt-6 px-4 sm:px-6">
        <PortfolioFilter
          categories={categories}
          active={active}
          onChange={setActive}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 py-6 sm:py-10 max-w-screen-xl mx-auto">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-36 sm:h-48 object-cover"
            />
            <div className="p-3 sm:p-4 text-center">
              <h3 className="text-sm sm:text-md font-semibold">{p.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{p.type}</p>
            </div>
          </div>
        ))}
      </div>

      <Foot />
    </div>
  );
};

export default Portfolio;
