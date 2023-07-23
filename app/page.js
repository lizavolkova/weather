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
    const [api, setApi] = useState();
    const [data, setData] = useState();
    const [airPollution, setAirPollution] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [bgColor, setBgColor] = useState("#000");
    const [alerts, setAlerts] = useState([]);
    const [noaaData, setNoaaData] = useState([]);

    async function fetchData(real = false) {
        if (api) {
            setIsLoading(true);
            const res = await fetch(`/api/coreData?real=${real}&source=${api}`)
            const data = await res.json();

            setAirPollution(data?.air?.data);
            setData(data);
            setIsLoading(false);
        }


    }

    const updateApi = (newApi) => {

        setApi(newApi);
        if (api && newApi !== api) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("api",newApi);
            window.location.search = searchParams.toString();
        }

    }

    useEffect ( ()=> {
        const lat = 41.18856;
        const long = -73.83745;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const apiUrl = urlParams.get('api');
        apiUrl ? updateApi(apiUrl) : updateApi('tomorrow');

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

        async function fetchAlerts() {
            const res = await fetch(`https://api.weather.gov/alerts/active?point=${lat},${long}`);
            const data = await res.json();
            setAlerts(data.features);
        }

       // fetchRealData();
        fetchNoaaforecast();
       // fetchData( apiUrl);
        fetchAlerts()

    }, []);

    useEffect( () => {
       fetchData();
    }, [api])


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
                  <div className="flex">
                      <button className={`bg-transparent  font-semibold hover:text-white py-2 px-4 border  hover:border-white rounded mr-4 ${api === 'tomorrow' ? 'border-white text-white' : 'border-slate-400 text-slate-400'}`} onClick={() => updateApi('tomorrow')}>Tomorrow.io</button>
                      <button className={`bg-transparent  font-semibold hover:text-white py-2 px-4 border border-slate-400 hover:border-white rounded ${api === 'open' ? 'border-white text-white' : 'border-slate-400 text-slate-400'}`} onClick={() => updateApi('open')}>OpenWeather</button>
                  </div>


                  <div className="flex w-full flex-col md:flex-row relative ">

                      <div className="w-full md:w-1/4 flex md:h-screen" id="test-class" >

                          {noaaData.length > 0 && <MainWeather current={data.current} hourly={data.hourly} daily={data.daily} alerts={alerts} noaaData={noaaData} />}

                      </div>

                      <div  className="w-full  flex h-screen md:w-3/4 md:overflow-auto md:absolute md:right-0 backdrop-blur-md">

                          <SideWeather current={data.current}
                                       daily={data.daily}
                                       hourly={data.hourly}
                                       airPollution={airPollution}
                                       noaaData={noaaData}
                                       bgColor={bgColor}/>
                      </div>
                  </div>

              </main>
          )}
      </>

  )
}



