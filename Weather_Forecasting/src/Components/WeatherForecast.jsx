import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './WeatherForecast.css';
import Navbar from './Navbar';


const WeatherForecast = () => {
    const [forecast, setForecast] = useState([]);
    const [currentLocation, setCurrentLocation] = useState('');
    const [time, setTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const location = useLocation();
    const input = new URLSearchParams(location.search).get('city') || 'Indore'; 

    const apiDataFetch = async () => {
        const api = '903507f17d707fecd352d38301efba77';
        const apidata = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${api}`);
        const data = await apidata.json();
        console.log(data)
        setCurrentLocation(data.city.name);
        setCurrentDate(data.list[0].dt_txt.split(' ')[0]);

        const uniqueDates = new Set();
        const filteredData = data.list.filter((item) => {
            const date = item.dt_txt.split(' ')[0];
            if (uniqueDates.has(date)) {
                return false;
            } else {
                uniqueDates.add(date);
                return true;
            }
        });

        setForecast(filteredData);
    };

    useEffect(() => {
        apiDataFetch();

        const interval = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString();
            setTime(currentTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [input]);

    return (
        <>
        <div className="weather-forecast-container">
            <h2>{currentDate}</h2>
            <h2>{currentLocation}</h2>
            <h3>{time}</h3>

            <div className="data">
                {forecast.map((entry, index) => (
                    <div className="box" key={index}>
                        <h1>{entry.dt_txt.split(' ')[0]}</h1>
                        <div className="main">
                            <div className="shortbox">
                                <p>🌡️ Temperature: {entry.main.temp}°C</p>
                                <p>🥶 Feel: {entry.main.feels_like}°C</p>
                                <p>💧 Humidity: {entry.main.humidity}%</p>
                                <p>🌤️ Weather: {entry.weather[0].description}</p>
                                <p>🌪️ Pressure: {entry.main.pressure} hPa</p>
                            </div>
                            <div className="shortbox">
                                <p>🌡️ Min Temp: {entry.main.temp_min}°C</p>
                                <p>🔥 Max Temp: {entry.main.temp_max}°C</p>
                                <p>👁️ Visibility: {entry.visibility/1000} km</p>
                                <p>💨 Wind Speed: {entry.wind.speed} meter/sec</p>
                                <p>🧭 Wind Direction: {entry.wind.deg}°</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default WeatherForecast;
