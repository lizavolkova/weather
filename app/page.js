"use client"
import React, { useState, useEffect } from 'react';
import CardWrapper from "./components/CardWrapper";
import MainWeather from "./components/MainWeather";
import SideWeather from "./components/SideWeather";
import DetailsWeather from "./components/DetailsWeather";
import AirQuality from "./components/AirQuality";

import { FastAverageColor } from 'fast-average-color';
import {Map} from "./components/Map";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";

export default function Home() {
    const [data, setData] = useState();
    const [airPollution, setAirPollution] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [bgColor, setBgColor] = useState("#000");
    const [alerts, setAlerts] = useState([]);
    const [noaaData, setNoaaData] = useState([]);


    useEffect ( ()=> {
        async function fetchRealData() {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=41.18856&lon=-73.83745&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
                const data = await res.json();
                const air = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=41.18856&lon=-73.83745&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
                const airData = await air.json();
                setData(data);
                setAirPollution(airData);
                setIsLoading(false);
            } catch(err) {
                console.error(err)
                setIsLoading(true);
            }
        }

        async function fetchNoaaforecast() {
            try {
                const res = await fetch('https://api.weather.gov/gridpoints/OKX/36,57/forecast?units=si')
                const data = await res.json();

                const dailyData = data?.properties?.periods
                if (dailyData[0].isDaytime === false) {

                    dailyData.splice(1, 0, {});
                }
                setNoaaData(dailyData);
            } catch (err) {
                setIsLoading(true);
            }
        }

        async function fetchData() {
            const res = await fetch("http://localhost:3000/api/data")
            const data = await res.json();
            const air = await fetch('http://localhost:3000/api/pollution')
            const airData = await air.json();

            setAirPollution(airData);
            setData(data);
            setIsLoading(false);
        }

        async function fetchAlerts() {
            const res = await fetch('https://api.weather.gov/alerts/active?point=41.18856,-73.83745');
            const data = await res.json();
            setAlerts(data.features);
        }

        fetchRealData();
        fetchNoaaforecast();
        //fetchData();
        fetchAlerts()


    }, []);

    const current = data?.current?.weather[0];
    const timeOfDay = current?.icon?.slice(-1);
    const weatherImage = data?.current?.weather[0].main.toLowerCase() === 'clouds' && data?.current?.clouds < 50 ? 'clouds-part' : current?.main.toLowerCase();
    const bgImage = `/weather-photos/${timeOfDay}/${weatherImage}.jpg`;



    const fac = new FastAverageColor();

    fac.getColorAsync(bgImage)
        .then(color => {
            setBgColor(color.rgba);
        })
        .catch(e => {
            console.log(e);
        });

  return (


      <>
          {isLoading ? (
             <div>LOADING</div>
          ) : (
              <main className="flex min-h-screen flex-col items-center p-0 md:p-12 bg-cover backdrop-blur-3xl" style={{backgroundColor: bgColor}}>

                  <CardWrapper background={bgImage} classes="flex-col md:flex-row " bgColor={bgColor}>
                      <div className="w-full md:w-3/5 flex">
                          {noaaData.length > 0 && <MainWeather current={data.current} hourly={data.hourly} daily={data.daily} alerts={alerts} noaaData={noaaData}/>}
                      </div>
                      <div className="backdrop-blur-md flex flex-col  justify-between bg-opacity-25 bg-black md:border-l md:rounded-r-lg border-slate-400 w-full md:w-2/5">
                          <SideWeather current={data.current} daily={data.daily} hourly={data.hourly} airPollution={airPollution}/>
                      </div>
                  </CardWrapper>

                  <CardWrapper classes="flex flex-col " background={bgImage} bgColor={bgColor}>
                      <div className="backdrop-blur md:rounded-lg ">
                          <DailyWeather daily={data.daily} noaaData={noaaData}/>

                      </div>

                  </CardWrapper>

                  <CardWrapper bgColor={bgColor}>
                      <div style={{backgroundColor: bgColor}}>
                          <div className=""><HourlyWeather hourly={data.hourly}/></div>
                      </div>
                  </CardWrapper>

                  {/*<CardWrapper>*/}
                  {/*    <div className="w-2/3 bg-yellow-600">*/}
                  {/*        <DetailsWeather/>*/}
                  {/*    </div>*/}
                  {/*    <div className="w-1/3 bg-green-600">*/}
                  {/*        <AirQuality/>*/}
                  {/*    </div>*/}
                  {/*</CardWrapper>*/}

                  {/*<CardWrapper>*/}
                  {/*    RADAR*/}
                  {/*</CardWrapper>*/}
              </main>
          )}
      </>

  )
}



