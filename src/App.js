import { useEffect, useState } from "react";
import "./App.css";
import Detail from "./components/Detail";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [location, setLocation] = useState("Lagos");
  const apiKey = "cdeea3d53da7fa7c4fdd8fb576432c16";
  const weatherImage = `https://openweathermap.org/img/wn/`;
  const apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric&cnt=5`;

  useEffect(() => {
    getWeatherData(apiurl);
    setLocation("");
  }, []);

  const getWeatherData = async (ID) => {
    try {
      const response = await fetch(ID);
      const jsonData = await response.json();
      if (jsonData.cod === "200") {
        setWeatherData((prev) => ({
          ...prev,
          country: jsonData.city.country,
          name: jsonData.city.name,
          list: jsonData.list,
        }));
      } else {
        throw Error("City not found");
      }
      // // console.log(jsonData);
      // console.log(weatherData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const searchLocation = (event) => {
    setLocation(event.target.value);
  };

  const getWeatherDetails = (event) => {
    getWeatherData(apiurl);
    setLocation("");
    event.preventDefault();
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage:
          weatherData.name &&
          `url('https://source.unsplash.com/1600x900/?" + ${weatherData.name} + "')`,
      }}
    >
      <header className="App-header">
        <Detail
          weatherData={weatherData}
          getWeatherDetails={getWeatherDetails}
          weatherImage={weatherImage}
          searchLocation={searchLocation}
          location={location}
        />
      </header>

      <div></div>
      <div></div>
    </div>
  );
}

export default App;
