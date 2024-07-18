import React, { useState } from "react";
import axios from "axios";
import { IoSearchCircleSharp } from "react-icons/io5";
import { PiWindFill } from "react-icons/pi";
import { LiaSunSolid } from "react-icons/lia";

import imageData from "./components/Data";
import backgroundVideo from "./images/Untitled video - Made with Clipchamp (8).mp4";

const Home = () => {
  // Find the cloudy image from imageData
  // const cloudyImage = imageData.find((image) => image.id === 1);
  // const cloudIcon = imageData.find((image) => image.id === 5);

  //
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    description: "Light Rain",
    humidity: 10,
    uv: 6.2,
    uvType: "High",
  });

  const [name, setName] = useState("");

  const uvType =
    data.uv <= 2
      ? "Low"
      : data.uv <= 5
      ? "Moderate"
      : data.uv <= 7
      ? "High"
      : data.uv <= 10
      ? "Very High"
      : "Extreme";

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8e5b060c256ec7d7e0aedf990fc00d1c&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log("Weather data:", res.data);
          const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&appid=8e5b060c256ec7d7e0aedf990fc00d1c`;
          axios.get(uvUrl).then((uvRes) => {
            setData((prevData) => ({
              ...prevData,
              celcius: res.data.main.temp,
              name: res.data.name,
              humidity: res.data.main.humidity,
              description: res.data.weather[0].description,
              uv: uvRes.data.value,
            }));
          });
        })
        .catch((err) => console.log("Error fetching data:", err));
    }
  };

  // Choosing the correct image based on the weather description
  const getWeatherImage = (description) => {
    if (description.includes("cloud")) {
      return imageData.find((image) => image.id === 1);
    } else if (description.includes("rain")) {
      return imageData.find((image) => image.id === 2);
    } else if (description.includes("sunny") || description.includes("clear")) {
      return imageData.find((image) => image.id === 3);
    } else if (description.includes("thunder")) {
      return imageData.find((image) => image.id === 4);
    }
    return null;
  };

  const weatherImage = getWeatherImage(data.description);

  // Choosing the correct icon based on the weather description
  const getWeatherIcon = (description) => {
    if (description.includes("cloud")) {
      return imageData.find((image) => image.id === 5);
    } else if (description.includes("rain")) {
      return imageData.find((image) => image.id === 6);
    } else if (description.includes("sunny") || description.includes("clear")) {
      return imageData.find((image) => image.id === 7);
    } else if (description.includes("thunder")) {
      return imageData.find((image) => image.id === 8);
    }
    return null;
  };

  const weatherIcon = getWeatherIcon(data.description);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container relative z-10">
        <div
          className="weather"
          style={{
            backgroundImage: `url(${weatherImage ? weatherImage.src : ""})`,
          }}
        >
          <div className="search">
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button>
              <IoSearchCircleSharp
                className="search-icon"
                onClick={handleClick}
              />
            </button>
          </div>

          {/* Weather Information */}
          <div className="weatherInfo">
            {weatherImage && (
              <img
                src={weatherIcon.src}
                alt={weatherIcon.alt}
                className="weather-icon"
              />
            )}
            <h1 className="text-5xl mt-2"> {Math.round(data.celcius)} °C</h1>
            <h2 className="text-4xl mt-2"> {data.name} </h2>
            <h4 className="text-xl mt-10"> {data.description} </h4>

            <div className="details">
              <div className="col text-xl">
                <div className="humidity">
                  <PiWindFill className="w-icon" />
                  <p> {Math.round(data.humidity)} %</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col text-xl">
                <div className="uv-rays">
                  <LiaSunSolid className="w-icon" />
                  <p>
                    {" "}
                    {Math.round(data.uv)} ({uvType}){" "}
                  </p>
                  <p>UV Index</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
