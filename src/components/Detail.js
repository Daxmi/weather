import React from "react";
import Form from "./Form";
import List from "./List";

export default function Detail(props) {
  const {
    weatherData,
    searchLocation,
    getWeatherDetails,
    weatherImage,
    location,
  } = props;
  const { country, name, list } = weatherData;
  return (
    <div className="weather-container">
      
      <Form
        getWeatherDetails={getWeatherDetails}
        searchLocation={searchLocation}
        location={location}
      /> 
      {weatherData !== "" && (
        <div>
          <div className="heading">
            <h1>
              <b>
                {name}, {country}
              </b>
            
            </h1>
          </div>
          <>
            {list.map((weatherday) => (
              <List weatherday={weatherday} weatherImage={weatherImage} key = {weatherday.dt_txt} />
            ))}           
          </>
        </div>
      ) }
      <div className="date">{new Date().toDateString().slice(0, 10)}</div>
    </div>
  );
}
