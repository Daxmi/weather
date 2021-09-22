import { useEffect, useState } from "react";
import "./App.css";
import Detail from "./components/Detail";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("Lagos")
  const [loading, setLoading] = useState(false);
  const apiKey = "cdeea3d53da7fa7c4fdd8fb576432c16";
  const weatherImage = `https://openweathermap.org/img/wn/`;
  const apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric&cnt=5`;

  useEffect(() => {
    getWeatherData(apiurl);
    setLocation("");
  }, [search]);

  const getWeatherData = async (ID) => {
    try {
      const response = await fetch(ID);
      const jsonData = await response.json();
      if (jsonData.cod === "200") {
        setWeatherData(() => ({
          country: jsonData.city.country,
          name: jsonData.city.name,
          list: jsonData.list,
        }));
      } else {
        throw Error("City not found");
      }
      setLoading(true);      
      console.log(jsonData);
      // console.log(weatherData);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const searchLocation = (event) => {
    setLocation(event.target.value);
  };

  const getWeatherDetails = (event) => {
    setSearch(location);
    event.preventDefault();
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage:
          weatherData.name &&
          `url('https://source.unsplash.com/1600x900/?" + ${weatherData.name} + "')`
      }}
    >
      <div className="app-header">
        {loading ?  <Detail
          weatherData={weatherData}
          getWeatherDetails={getWeatherDetails}
          weatherImage={weatherImage}
          searchLocation={searchLocation}
          location={location}
        /> :
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />}
      </div>

    </div>
  );
}

export default App;
