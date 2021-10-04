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
  let result = [];
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
          { 
          list.filter((list, index) => {index % 8 === 0 &&  
              result.push(list); return "";
          })}
          <>
            {result.map((weatherday) => (
              <List weatherday={weatherday} weatherImage={weatherImage} key = {weatherday.dt_txt} />
            ))}           
          </>
        </div>
      ) }
    </div>
  );
}
