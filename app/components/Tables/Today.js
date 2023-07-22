import React, {useRef, useEffect, useState} from 'react';
import {getTimeWeather} from "../../utils/getTimeWeather";
import Image from "next/image";
import Temperature from "../Atoms/Temperature";
import {getDate} from "../../utils/getDate";
import {getIcon} from "../../utils/getIcon";
import WeatherLineChart from "./WeatherLineChart";
import ForecastDetailsTable from "../Atoms/ForecastDetailsTable";

export default function Today({current, hourly}) {
    const [details, setDetails] = useState(0);

    const weather = getTimeWeather(current, hourly);
    const temp = weather.map(weather => Math.floor(weather.weather.temp));
    const pop = weather.map(weather => Math.floor(weather.weather.pop*100));
    const time = weather.map(weather => weather.time);
    const icons = weather.map(weather => getIcon(weather.weather.weather))

    const onClick = (el) => {
        setDetails(el);
    }

    return (
        <div className="flex flex-col py-6">
            {weather && <div id="daily-chart" className="chartWrapper overflow-x-scroll">
                <div className="relative w-[800px] h-[350px] mx-auto">
                    <WeatherLineChart temp={temp} pop={pop} time={time} icons={icons} clickedEl={onClick} id="today"/>
                </div>
            </div>}
            <div className="mt-4">
                {/*<ForecastDetailsTable*/}
                {/*    humidity={weather[details].weather.humidity}*/}
                {/*    feels={weather[details].weather.feels_like.day}*/}
                {/*    pop={weather[details].weather.pop}*/}
                {/*    clouds={weather[details].weather.clouds}*/}
                {/*    uvi={weather[details].weather.uvi}*/}
                {/*    wind={weather[details].weather.wind_speed}*/}
                {/*    timeStamp={`${getDate(weather[details].weather.dt).toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: "long",})}`} />*/}
            </div>
        </div>
    )
}