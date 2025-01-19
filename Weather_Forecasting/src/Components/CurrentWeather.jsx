import React, { useEffect, useState } from 'react';
import './Current.css';
import { Link } from 'react-router-dom';

const CurrentWeather = () => {
  const [input, setInput] = useState('Indore');
  const [newData, setNewData] = useState([]);
  const [todayDate, setTodayDate] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const apiDataFetch = async () => {
    const api = '903507f17d707fecd352d38301efba77';
    const apiData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${api}`);
    const data = await apiData.json();

    const location = data.city;
    setCurrentLocation(location);

    const todayDate = data.list[0].dt_txt.split(" ")[0];

    setTodayDate(todayDate);
   
    const filteredData = data.list.filter((item) => {
      const date = item.dt_txt.split(" ")[0];
      return date === todayDate;
    });

    setNewData(filteredData);
  };

  useEffect(() => {
    apiDataFetch();
  }, []); 

  return (
    <div className="container">
      <div className="mainbody">
        <div className="weather-app">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Enter City" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
            />
            <button onClick={apiDataFetch}>
              <Link className="button" to="/">Current</Link>
            </button>
            <button>
              <Link className="button" to={`/WeatherForecast?city=${input}`}>Forecast</Link>
            </button>
          </div>

          {newData.map((e) => (
            <div key={e.dt}>
              <div className="material">
                <div className="weather-icon">☁️</div>
                <div className="box">
                  <div className="temperature">{e.main.temp}&deg;</div>
                  <div className="descri">
                    <div className="description">{e.weather[0].description}</div>
                    <div>{currentLocation.name}, {currentLocation.country}</div>
                  </div>
                  <div className="date-time">
                    <div className="time">{e.dt_txt.split(" ")[0]}</div>
                    <div className="time">{e.dt_txt.split(" ")[1]}</div>
                  </div>
                </div>
                <div className="details">
                  <div className="detail">
                    <span>🌇</span>
                    {e.main.feels_like}&deg;<br />Temp Feel
                  </div>
                  <div className="detail">
                    <span>💧</span>
                    {e.main.humidity}<br />Humidity
                  </div>
                  <div className="detail">
                    <span>💨</span>
                    {e.main.pressure} MM<br />Pressure
                  </div>
                  <div className="detail">
                    <span>🌬️</span>
                    {e.wind.speed}<br />Wind
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
