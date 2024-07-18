import React from "react";
import Payment from "./Payment";

const Home = () => {
  return (
    <div className="bg-blue-500 text-white py-20 px-10 md:px-20 lg:px-40">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to Our Website
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6">
          We provide the best solutions for your business. Our team is dedicated
          to delivering high-quality services to meet your needs.
        </p>
        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-100">
          Learn More
        </button>
      </div>
      <Payment />
    </div>
  );
};

export default Home;
