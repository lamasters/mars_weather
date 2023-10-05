"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

async function getMarsWeather(setMarsWeather: (data: any) => void) {
  let mars_res = await fetch(
    "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json"
  );
  let mars_data = await mars_res.json();
  let latest_sol = mars_data.soles[0];

  console.log(latest_sol);
  setMarsWeather({
    sol: latest_sol.sol,
    date: latest_sol.terrestrial_date,
    min_temp: latest_sol.min_temp,
    max_temp: latest_sol.max_temp,
    pressure: latest_sol.pressure,
    sunrise: latest_sol.sunrise,
    sunset: latest_sol.sunset,
  });
}

async function getEarthData(
  setEarthWeather: (data: any) => void,
  lat: number,
  lon: number
) {
  let earth_res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OWM_API_KEY}&units=metric`
  );
  let earth_data = await earth_res.json();
  console.log(earth_data);

  setEarthWeather({
    temp: earth_data.main.temp,
    min_temp: Math.round(earth_data.main.temp_min),
    max_temp: Math.round(earth_data.main.temp_max),
    pressure: earth_data.main.pressure,
  });
}

async function getLocation(
  setEarthData: (data: any) => void,
  lat: number,
  lon: number,
  setLat: (data: any) => void,
  setLon: (data: any) => void
) {
  let location_res = await fetch("https://ipapi.co/json/");
  let location_data = await location_res.json();
  setLat(location_data.latitude);
  setLon(location_data.longitude);
  await getEarthData(
    setEarthData,
    location_data.latitude,
    location_data.longitude
  );
}

async function hydrate(
  setMarsWeather: (data: any) => void,
  setEarthData: (data: any) => void,
  lat: number,
  lon: number,
  setLat: (data: any) => void,
  setLon: (data: any) => void
) {
  await getLocation(setEarthData, lat, lon, setLat, setLon);
  await getMarsWeather(setMarsWeather);
}

export default function Home() {
  const [marsWeather, setMarsWeather] = useState({
    sol: 0,
    date: "",
    min_temp: 0,
    max_temp: 0,
    pressure: 0,
    sunrise: "00:00",
    sunset: "00:00",
  });
  const [earthWeather, setEarthWeather] = useState({
    temp: 0,
    min_temp: 0,
    max_temp: 0,
    pressure: 0,
  });
  const [lat, setLat] = useState(-78.159);
  const [lon, setLon] = useState(16.406);
  useEffect(() => {
    hydrate(setMarsWeather, setEarthWeather, lat, lon, setLat, setLon);
  }, []);

  const date = new Date(Date.now());

  return (
    <main className={styles.main}>
      <div className={styles.mars_container}>
        <div className={styles.weather_container}>
          <h1>Mars</h1>
          <p>Sol: {marsWeather.sol}</p>
          <p>High: {marsWeather.max_temp} °C</p>
          <p>Low: {marsWeather.min_temp} °C</p>
          <p>Pressure: {marsWeather.pressure} mm Hg</p>
        </div>
      </div>
      <div className={styles.earth_container}>
        <div className={styles.weather_container}>
          <h1>Earth</h1>
          <p>Date: {date.toDateString()}</p>
          <p>High: {earthWeather.max_temp}°C</p>
          <p>Low: {earthWeather.min_temp}°C</p>
          <p>Pressure: {earthWeather.pressure} mm Hg</p>
        </div>
      </div>
    </main>
  );
}
