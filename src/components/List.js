import React from "react";

export default function List(props) {
  const { weatherday, weatherImage } = props;
  return (
    <div  className="condition">
      {<div>{new Date(weatherday.dt_txt).toDateString().slice(0, 10)}</div>}
      <div className="temp">
        <div>
          <img src={`${weatherImage}${weatherday.weather[0].icon}@2x.png`} alt={weatherday.dt_txt}/>
        </div>
        <div>{weatherday.main.temp}°C</div>
      </div>
    </div>
  );
}
