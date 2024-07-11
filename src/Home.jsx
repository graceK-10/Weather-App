import React from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import imageData from "./components/Data";

const Home = () => {
  // Find the cloudy image from imageData
  const cloudyImage = imageData.find((image) => image.id === 1);
  const cloudyIcon = imageData.find((image) => image.id === 5);

  return (
    <div className="container">
      <div
        className="weather"
        style={{
          backgroundImage: `url(${cloudyImage ? cloudyImage.src : ""})`,
        }}
      >
        <div className="search">
          <input type="text" placeholder="Enter City Name" />
          <button>
            <IoSearchCircleSharp className="search-icon" />
          </button>
        </div>
        {/* Weather Information */}
        <div className="weatherInfo">
          {cloudyIcon && (
            <img src={cloudyIcon.src} alt={cloudyIcon.alt} className="mt-10" />
          )}
          <h1 className="text-5xl m-6">22°C</h1>
          <h2 className="text-4xl m-10">London</h2>
          <h3 className="text-xl">Light Rain</h3>
          <h4 className="text-xl">Humidity: 80%</h4>
          <h4 className="text-xl">UV Index: 5 (Moderate)</h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
