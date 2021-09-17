import React from "react";

export default function Form(props) {
  const { getWeatherDetails, searchLocation, location } = props;
  return (
    <div>
      <form onSubmit={getWeatherDetails}>
        <div className="search">
          <input
            type="text"
            placeholder="City"
            onChange={searchLocation}
            value={location}
          />
        </div>
      </form>
    </div>
  );
}
