"use client"
import React, { useState, useEffect } from 'react';
import CardWrapper from "./components/CardWrapper";
import MainWeather from "./components/MainWeather";
import DailyWeather from "./components/DailyWeather";
import DetailsWeather from "./components/DetailsWeather";
import AirQuality from "./components/AirQuality";

export default function Home() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect ( ()=> {
        async function fetchRealData() {
            const res = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.18856&lon=-73.83745&units=metric&appid=74b1cba4c20bb5cc22ee5c639d0e0919")
            const data = await res.json();
            console.log(data)
        }
        //fetchRealData();

        async function fetchData() {
            const res = await fetch("http://localhost:3000/api/data")
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        }
        fetchData();

    }, []);

  return (

      <>
          {isLoading ? (
             <div>LOADING</div>
          ) : (
              <main className="flex min-h-screen flex-col items-center p-12" style={{backgroundColor: '#99C9F6'}}>

                  <CardWrapper background="/weather-photos/day/clear-skies.jpg">
                      <div className="w-2/3">
                          <MainWeather current={data.current} hourly={data.hourly} daily={data.daily} alerts={data.alerts}/>
                      </div>
                      <div className="backdrop-blur-md border-l-2 border-slate-400 w-1/3">
                          <DailyWeather current={data.current} daily={data.daily}/>
                      </div>

                  </CardWrapper>

                  <CardWrapper>
                      <div className="w-2/3 bg-yellow-600">
                          <DetailsWeather/>
                      </div>
                      <div className="w-1/3 bg-green-600">
                          <AirQuality/>
                      </div>
                  </CardWrapper>

                  <CardWrapper>
                      RADAR
                  </CardWrapper>
              </main>
          )}
      </>

  )
}



