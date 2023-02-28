import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const apiKey = "e032120b6de040798b60e522367075cc";
  const location = "Vancouver";
  const units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`

  const [data, setData] = useState();
  const grabWeather = useRef(false);

  const fetchWeater = async () => {
    const response = await axios.get(url);

    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8, 2), 10));
      let num = parseInt(weather.dt_txt.substr(8, 2), 10);

      if (num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("here");
        console.log(response.data.list[index])
        var month = '';
        var icon = '';

        if (weather.dt_txt.substr(5, 2) == 1) {
          month = "January";
        } else if (weather.dt_txt.substr(5, 2) == 2) {
          month = "February";
        } else if (weather.dt_txt.substr(5, 2) == 3) {
          month = "March";
        } else if (weather.dt_txt.substr(5, 2) == 4) {
          month = "April";
        } else if (weather.dt_txt.substr(5, 2) == 5) {
          month = "May";
        } else if (weather.dt_txt.substr(5, 2) == 6) {
          month = "June";
        } else if (weather.dt_txt.substr(5, 2) == 7) {
          month = "July";
        } else if (weather.dt_txt.substr(5, 2) == 8) {
          month = "August";
        } else if (weather.dt_txt.substr(5, 2) == 9) {
          month = "September";
        } else if (weather.dt_txt.substr(5, 2) == 10) {
          month = "October";
        } else if (weather.dt_txt.substr(5, 2) == 11) {
          month = "November";
        } else if (weather.dt_txt.substr(5, 2) == 12) {
          month = "December";
        }

        if (weather.weather[0].main == "Clouds") {
          icon = '/icons/broken-clouds.png';
        } else if (weather.weather[0].main == "Clear") {
          icon = '/icons/clear-sky.png';
        } else if (weather.weather[0].main == "Atmosphere") {
          icon = '/icons/mist.png';
        } else if (weather.weather[0].main == "Rain") {
          icon = '/icons/shower-rain.png';
        } else if (weather.weather[0].main == "Drizzle") {
          icon = '/icons/shower-rain.png';
        } else if (weather.weather[0].main == "Snow") {
          icon = '/icons/snow.png';
        } else if (weather.weather[0].main == "Thunderstorm") {
          icon = '/icons/thunderstorm.png';
        }

        var now = new Date(weather.dt_txt);
        var days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        var day = days[now.getDate()];

        return (
          <div>
            <div key={index} className={styles.weatherContainer}>
              <Image
                src={icon}
                alt={icon}
                width={200}
                height={200}
                priority
              />
              <p>
                {day} <br /> {month} {weather.dt_txt.substr(8, 2)}, {weather.dt_txt.substr(0, 4)}
              </p>
              <div>{weather.main.temp.toFixed(1)} °C</div>
              <div>{weather.weather[0].main}</div>
            </div>
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }

  useEffect(() => {
    if (grabWeather.current === true) {
      fetchWeater();
    }
    return () => {
      grabWeather.current = true;
    }
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  return (
    <>
      <Head>
        <title>DK's Action Weather!</title>
        <meta name="DK's Action Weather!" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lato&family=Oswald:wght@300&family=Sofia+Sans+Condensed:wght@800&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="DK's Action Weather!"
            width={400}
            height={200}
            priority
          />
          <h1 className={styles.mainTitle}> All Weather, All The Time!!</h1>
        </div>
        <div className={styles.siteHeadings}>
          <h2>Vancouver's 6 Day Outlook</h2>
          <h2> Latest updates as of: {date}</h2>
        </div>
        <div className={styles.weatherContainerAlign}>
          {data}
        </div>
      </main>
    </>
  )
}
