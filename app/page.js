"use client"
import React, { useState, useEffect, useContext } from 'react';
import MainWeather from "./components/MainWeather";
import SideWeather from "./components/SideWeather";

import { FastAverageColor } from 'fast-average-color';
import {
    Chart as ChartJS,
    CategoryScale,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    ArcElement
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ChartDataLabels,
    ArcElement
)

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
                //const air = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=41.18856&lon=-73.83745&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
                const air = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=41.18856&lon=-73.83745&key=${process.env.NEXT_PUBLIC_AIR_VISUAL_API_KEY}`);
                const airData = await air.json();
                setData(data);
                setAirPollution(airData.data);
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
            const air = await fetch('http://localhost:3000/api/pollution');
            const airData = await air.json();

            setAirPollution(airData.data);
            setData(data);
            setIsLoading(false);
        }

        async function fetchAlerts() {
            const res = await fetch('https://api.weather.gov/alerts/active?point=41.18856,-73.83745');
            const data = await res.json();
            setAlerts(data.features);
        }

        //fetchRealData();
        fetchNoaaforecast();
        fetchData();
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
//  style={{backgroundImage: `url(${bgImage})`}}
  return (


      <>
          {isLoading ? (
             <div>LOADING</div>
          ) : (
              <main className="relative w-full flex min-h-screen flex-col items-center p-0 bg-cover" style={{backgroundColor: bgColor, backgroundImage: `url(${bgImage})`}}>
                  <div className="flex w-full flex-col md:flex-row relative ">
                      <div className="w-full md:w-1/4 flex  h-screen" id="test-class" >
                          {noaaData.length > 0 && <MainWeather current={data.current} hourly={data.hourly} daily={data.daily} alerts={alerts} noaaData={noaaData} />}
                      </div>
                      <div  className="w-full  flex h-screen md:w-3/4 md:overflow-auto md:absolute md:right-0 backdrop-blur-md">
                          <SideWeather current={data.current} daily={data.daily} hourly={data.hourly} airPollution={airPollution} noaaData={noaaData} bgColor={bgColor}/>
                      </div>
                  </div>

              </main>
          )}
      </>

  )
}



