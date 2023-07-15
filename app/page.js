"use client"
import React, { useState, useEffect } from 'react';
import CardWrapper from "./components/CardWrapper";
import MainWeather from "./components/MainWeather";
import SideWeather from "./components/SideWeather";
import DetailsWeather from "./components/DetailsWeather";
import AirQuality from "./components/AirQuality";

import { FastAverageColor } from 'fast-average-color';
import {Map} from "./components/Map";

export default function Home() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [bgColor, setBgColor] = useState("#000");
    const [alerts, setAlerts] = useState([]);


    useEffect ( ()=> {
        async function fetchRealData() {
            const res = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.18856&lon=-73.83745&units=metric&appid=74b1cba4c20bb5cc22ee5c639d0e0919")
            const data = await res.json();
            setData(data);
            setIsLoading(false);
            console.log(data)
        }


        async function fetchData() {
            const res = await fetch("http://localhost:3000/api/data")
            const data = await res.json();
            setData(data);
            setIsLoading(false);
            console.log(data)
        }

        async function fetchAlerts() {
            const res = await fetch('https://api.weather.gov/alerts/active?point=41.18856,-73.83745');
            const data = await res.json();
            setAlerts(data.features);
        }

        fetchRealData();
        //fetchData();
        fetchAlerts()

    }, []);

    const current = data?.current?.weather[0];
    const timeOfDay = current?.icon?.slice(-1);
    const bgImage = `/weather-photos/${timeOfDay}/${current?.main}.jpg`;

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
              <main className="flex min-h-screen flex-col items-center p-12 bg-cover backdrop-blur-3xl" style={{backgroundColor: bgColor}}>

                  <CardWrapper background={bgImage} classes="flex-col md:flex-row ">
                      <div className="w-full md:w-1/2 lg:w-3/5 flex">
                          <MainWeather current={data.current} hourly={data.hourly} daily={data.daily} alerts={alerts}/>
                      </div>
                      <div className="backdrop-blur-md bg-opacity-25 bg-black border-l rounded-r-lg border-slate-400 w-full md:w-1/2 md:w-2/3">
                          <SideWeather current={data.current} daily={data.daily} hourly={data.hourly}/>
                      </div>
                  </CardWrapper>

                  <CardWrapper>
                      <Map/>
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



