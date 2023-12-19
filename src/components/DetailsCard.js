import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../css/DetailsCard.css';

function DetailsCard({ weather_icon, data }) {
  const { clouds, main, weather } = data.list[0];
  const [currentDateTime, setCurrentDateTime] = useState(moment());

  useEffect(() => {
    // Update the current date and time every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      setCurrentDateTime(moment());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="details">
      <div className="clouds">
        <p className="celsius">{Math.round(main.temp)}&deg;C</p>
        <div className="cloud-icon">
          {weather[0].main}
          <img src={weather_icon} className="" alt="" />
        </div>
        <p className="des">{weather[0].description}</p>
        <p className="time">{currentDateTime.format("dddd MMM D, YYYY, HH:mm:ss")}</p>
      </div>
      <div className="more-info">
        <p className="">RealFell: {Math.round(main.feels_like)}&deg;C</p>
        <p className="">Humidity: {main.humidity}%</p>
        <p className="">Cloud Cover: {clouds.all}</p>
        <p className="">Min Temp: {Math.round(main.temp_min)}&deg;C</p>
        <p className="">Max Temp: {Math.round(main.temp_max)}&deg;C</p>
      </div>
    </div>
  );
}

export default DetailsCard;
