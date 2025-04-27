import React from "react";

import barner from "../assets/barner.png";

const Landing = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50 px-4 py-12">
      <img
        className=" h-80
       w-auto"
        src={barner}
        alt="barner"
      />
    </div>
  );
};

export default Landing;
