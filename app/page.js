"use client"
import React, { useState, useEffect, useContext } from 'react';
import MainWeather from "./components/MainWeather";
import SideWeather from "./components/SideWeather";
import queryString from 'query-string';

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
    const [solarData, setSolarData] = useState(null);
    const [planetData, setPlanetData] = useState(null);



    useEffect ( ()=> {
        const lat = 41.18856;
        const long = -73.83745;

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

        async function fetchData(real = false) {

            const res = await fetch(`/api/coreData?real=${real}`)
            const data = await res.json();

            setAirPollution(data.air.data);
            setData(data);
            setIsLoading(false);

        }

        async function fetchAlerts() {
            const res = await fetch(`https://api.weather.gov/alerts/active?point=${lat},${long}`);
            const data = await res.json();
            setAlerts(data.features);
        }

        async function fetchSolarInfo() {
            const res = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`);
            const data = await res.json();
            setSolarData(data.results);
        }

        async function fetchVisiblePlanets() {
            const today = new Date();
            const formattedDate = today.toLocaleDateString('en-CA')

            const res = await fetch(`https://api.astronomyapi.com/api/v2/bodies/positions?longitude=${long}&latitude=${lat}&from_date=${formattedDate}&to_date=${formattedDate}&time=18%3A52%3A40&elevation=1`,
                { method:'GET',
                    headers: {'Authorization': 'Basic ' + btoa(`${process.env.NEXT_PUBLIC_ASTRO_ID}:${process.env.NEXT_PUBLIC_ASTRO_SECRET}`)},

                });
            const data = await res.json();
            setPlanetData(data.data);

        }


       // fetchRealData();
        fetchNoaaforecast();
        fetchData(true);
        fetchAlerts()
        fetchSolarInfo();
        //fetchVisiblePlanets();

    }, []);


    const timeOfDay = data?.current?.isNight ? 'n' : 'd';
    //const weatherImage = data?.current?.weather[0].main.toLowerCase() === 'clouds' && data?.current?.clouds < 50 ? 'clouds-part' : current?.main.toLowerCase();
    const bgImage = `/weather-photos/${timeOfDay}/${data?.current?.image}.jpg`;

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
              <main className="relative w-full flex md:min-h-screen flex-col items-center p-0 bg-cover" style={{backgroundColor: bgColor, backgroundImage: `url(${bgImage})`}}>
                  <div className="flex w-full flex-col md:flex-row relative ">
                      <div className="w-full md:w-1/4 flex md:h-screen" id="test-class" >
                          {noaaData.length > 0 && <MainWeather current={data.current} hourly={data.hourly} daily={data.daily} alerts={alerts} noaaData={noaaData} />}
                      </div>

                      <div  className="w-full  flex h-screen md:w-3/4 md:overflow-auto md:absolute md:right-0 backdrop-blur-md">
                          {solarData !== null && <SideWeather current={data.current}
                                       daily={data.daily}
                                       hourly={data.hourly}
                                       airPollution={airPollution}
                                       noaaData={noaaData}
                                       solarData={solarData}
                                       planetData={planetData}
                                       bgColor={bgColor}/>}
                      </div>
                  </div>

              </main>
          )}
      </>

  )
}



