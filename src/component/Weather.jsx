import React, { useEffect, useRef, useState } from "react";
import "./Weather.css"; // Correct the filename if needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"8b259ebab501cecae06b029e0fdad28f"}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            console.error("Error fetching the weather data:", error);
        }
    };

    useEffect(() => {
        search("New York");
    }, []);

    return (
        <div className="weather-card">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search" />
                <button onClick={() => search(inputRef.current.value)}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {weatherData ? (
                <>
                    <div className="weather-info">
                        <img src={weatherData.icon} alt="Weather icon" className="weather-icon" />
                        <h1>{weatherData.temperature}°C</h1>
                        <h2>{weatherData.location}</h2>
                    </div>
                    <div className="weather-details">
                        <div className="detail-item">
                            <img src={humidity_icon} alt="Humidity icon" />
                            <p style={{margin:"0px"}}>{weatherData.humidity} %</p>
                            <p style={{marginTop:"6px",fontFamily:"monospace"}}>Humidity</p>
                        </div>
                        <div className="detail-item">
                            <img  src={wind_icon} alt="Wind icon" />
                            <p style={{margin:"0px"}}>{weatherData.windSpeed} Km/h</p>
                            <p style={{marginTop:"6px",fontFamily:"monospace"}} >Wind Speed</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Weather;
