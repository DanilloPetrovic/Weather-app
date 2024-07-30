import React, { useEffect, useState } from "react";
import "./Home.css";
import searchimg from "../photos/searchimg.png";
import loadinggif from "../photos/Ripple@1x-1.0s-200px-200px.gif";
import windicon from "../photos/Untitled design (13).png";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Belgrade");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe94d81925869f3edd043653d1cce961&units=metric`
      );
      const data = await response.json();
      if (data.cod === "404") {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching the weather data");
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      getWeather(searchTerm);
      setCity(searchTerm);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, [city]);

  console.log(weather);

  return (
    <div className="weather">
      <div className="weather-info">
        <div className="weather-info-header">
          <input
            placeholder="Search for place..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>
            <img src={searchimg} alt="Search" />
          </button>
        </div>

        <div className="main-weather">
          {error ? (
            <div className="error-message">{error}</div>
          ) : weather ? (
            <div className="weather-div">
              <div className="upper-weahter-div">
                <div>
                  <h1 className="weather-name">{weather.name}</h1>
                  <p className="weather-country">{weather.sys.country}</p>
                </div>
                {weather.weather && weather.weather[0] && (
                  <div className="weather-temp-icon-desc">
                    <p className="weather-temp">{weather.main.temp}°</p>

                    <div>
                      <img
                        className="weather-icon"
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                      />
                      <p className="weather-description">
                        {weather.weather[0].main}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="middle-weather-div">
                <div className="wind-div">
                  <img src={windicon} className="wind-img" alt="Wind icon" />
                  <p className="wind-speed-p">
                    Speed:{" "}
                    <span className="wind-speed-span">
                      {weather.wind.speed}
                    </span>
                  </p>
                </div>

                <div className="feels-like-div">
                  <p className="feels-like-p">Feels like</p>
                  <p className="feels-like-p-temp">
                    {weather.main.feels_like}°
                  </p>
                </div>

                <div className="min-max-div">
                  <p className="min-max-p">Min-Max</p>
                  <p className="min-max-values">
                    {weather.main.temp_min}° - {weather.main.temp_max}°
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="loading-gif-div">
              <img src={loadinggif} className="loading-gif" alt="Loading" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
