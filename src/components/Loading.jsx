import React from "react";

const Loading = () => (
  <div className="flex justify-center items-center p-4 sm:p-8 w-full">
    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default Loading;
