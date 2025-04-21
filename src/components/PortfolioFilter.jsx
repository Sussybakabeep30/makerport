import React from "react";

const PortfolioFilter = ({ categories, active, onChange }) => (
  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 my-4 sm:my-6 px-2">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-3 sm:px-6 py-1 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition duration-200 focus:outline-none
          ${
            active === cat
              ? "bg-blue-600 text-white border-2 border-white shadow-md"
              : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
          }`}
        style={{
          backgroundColor: active === cat ? "#2563eb" : "#fff", 
          color: active === cat ? "#fff" : "#111827", 
        }}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default PortfolioFilter;
