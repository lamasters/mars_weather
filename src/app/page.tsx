"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Client, Functions } from "appwrite";

async function getLocation() {
  let location_res = await fetch("https://ipapi.co/json/");
  let location_data = await location_res.json();
  return { lat: location_data.latitude, lon: location_data.longitude };
}

async function hydrate(
  setMarsWeather: (data: any) => void,
  setEarthWeather: (data: any) => void
) {
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("651f2b09a469886de156");
  const functions = new Functions(client);
  let location = await getLocation();

  functions
    .createExecution(
      "651f2c381402ba422c70",
      JSON.stringify(location),
      false,
      "/",
      "GET"
    )
    .then((response: any) => {
      let data = JSON.parse(response.response);
      let mars_data = data.mars_data;
      let earth_data = data.earth_data;
      setMarsWeather({
        sol: mars_data.sol,
        data: mars_data.date,
        min_temp: Number(mars_data.min_temp),
        max_temp: Number(mars_data.max_temp),
        pressure: mars_data.pressure,
        sunrise: mars_data.sunrise,
        sunset: mars_data.sunset,
      });
      setEarthWeather({
        temp: earth_data.temp,
        min_temp: Number(earth_data.min_temp),
        max_temp: Number(earth_data.max_temp),
        pressure: earth_data.pressure,
      });
    });
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
  const [colder, setColder] = useState(false);

  useEffect(() => {
    hydrate(setMarsWeather, setEarthWeather);
  }, []);

  const date = new Date(Date.now());
  console.log(marsWeather.max_temp + marsWeather.min_temp);
  console.log(earthWeather.max_temp + earthWeather.min_temp);
  return (
    <>
      <div className={styles.header}>
        Is Mars Colder?
        <br />
        {(marsWeather.max_temp + marsWeather.min_temp) / 2 <
        (earthWeather.max_temp + earthWeather.min_temp) / 2
          ? "Yes"
          : "No"}
      </div>
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
    </>
  );
}
