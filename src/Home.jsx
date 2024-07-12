import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { PiWindFill } from "react-icons/pi";
import { LiaSunSolid } from "react-icons/lia";

import imageData from "./components/Data";

const Home = () => {
  // Find the cloudy image from imageData
  const cloudyImage = imageData.find((image) => image.id === 1);
  const cloudyIcon = imageData.find((image) => image.id === 5);

  //
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    uv: 6.2,
    uvType: "High",
  });
  useEffect(() => {
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=london&appid=8e5b060c256ec7d7e0aedf990fc00d1c&units=metric";
    axios
      .get(apiUrl)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

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
          <h1 className="text-5xl mt-6">22°C</h1>
          <h2 className="text-4xl mt-2">London</h2>
          <h4 className="text-xl mt-10">Light Rain</h4>

          <div className="details">
            <div className="col text-xl">
              <div className="humidity">
                <PiWindFill className="w-icon" />
                <p>80%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col text-xl">
              <div className="uv-rays">
                <LiaSunSolid className="w-icon" />
                <p>5 (Moderate)</p>
                <p>UV Index</p>
                {/* <h4 className="text-xl">UV Index: 5 (Moderate)</h4> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
