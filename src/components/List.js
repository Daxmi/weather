import React from "react";

const getCurrentTime = (d) => {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[d.getDay()];
  let hour = d.getHours();

  return `${hour === 12 ? hour + "noon": hour > 12 ? hour + "pm" : hour + "am"}, ${day}`;
};

export default function List(props) {
  const { weatherday, weatherImage } = props;
  return (
    <div  className="condition">
      {<div>{getCurrentTime(new Date(weatherday.dt_txt))}</div>}
      <div className="temp">
        <div>
          <img src={`${weatherImage}${weatherday.weather[0].icon}@2x.png`} alt={weatherday.dt_txt}/>
        </div>
        <div>{weatherday.main.temp}°C</div>
      </div>
    </div>
  );
}
