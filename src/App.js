import { useEffect, useState } from "react";
import "./App.css";
import Detail from "./components/Detail";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import photo from "../src/image/photo.jpg";
import cloud from "../src/image/cloud.jpg";
import sun from "../src/image/sun.jpg";
import rain from "../src/image/Rain.jpg";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("Lagos");
  const [loading, setLoading] = useState(false);
  const apiKey = "cdeea3d53da7fa7c4fdd8fb576432c16";
  const weatherImage = `https://openweathermap.org/img/wn/`;

  useEffect(() => {
    const apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric&cnt=40`;
    const getWeatherData = async () => {
      try {
        const response = await fetch(apiurl);
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
      } catch (error) {
        console.log(error.message);
      }
    };
    getWeatherData();
    setLocation("");
  }, [search]);

  const searchLocation = (event) => {
    setLocation(event.target.value);
  };

  const getWeatherDetails = (event) => {
    setSearch(location);
    event.preventDefault();
  };

  return (
    <div className="app">
      <div
        className="app-header"
        style={{
          backgroundImage:
            weatherData &&
            (weatherData.list[0].weather[0].main === "Rain"
              ? `url(${rain})`
              : weatherData.list[0].weather[0].main === "Sun"
              ? `url(${sun})`
              : weatherData.list[0].weather[0].main === "Clouds"
              ? `url(${cloud})`
              : `url(${photo})`),
        }}
      >
        {loading ? (
          <>
            <Detail
              weatherData={weatherData}
              getWeatherDetails={getWeatherDetails}
              weatherImage={weatherImage}
              searchLocation={searchLocation}
              location={location}
            />
            <div>
              {" "}
              {weatherData ? weatherData.list[0].weather[0].main : "boy"}
            </div>
          </>
        ) : (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        )}
      </div>
    </div>
  );
}

export default App;
