import React, {useRef, useEffect, useState} from 'react';


import { Line } from 'react-chartjs-2';
import {getTime} from "../../utils/getTime";
import {getDate} from "../../utils/getDate";

import {getIcon} from "../../utils/getIcon";
import {Chart as ChartJS} from "chart.js";
import WeatherLineChart from "./WeatherLineChart";
import ForecastDetailsTable from "../Atoms/ForecastDetailsTable";

export default function DailyWeatherChart({daily, noaaData}) {
    const [details, setDetails] = useState(0);

    const temp = daily.map(weather => Math.floor(weather.temp.max));
    const pop = daily.map(weather => Math.floor(weather.pop*100));
    const time = daily.map(weather => {
        const date =  getDate(weather.dt)
        return `${date.toLocaleString('en-US', {weekday: 'short'})} ${date.getDate()}`
    });
    const icons = daily.map(weather => getIcon(weather.weather))
    const minTemp = daily.map(weather => Math.floor(weather.temp.min));

    const onClick = (el) => {
        setDetails(el);
    }

    return (
        <div>
            <div id="daily-chart" className="chartWrapper overflow-x-scroll py-6">
                <div className="relative w-[800px] h-[350px] mx-auto">
                    <WeatherLineChart temp={temp} pop={pop} time={time} icons={icons} minTemp={minTemp} clickedEl={onClick}/>
                </div>
            </div>
            <div className="mt-4">
                <ForecastDetailsTable
                    humidity={daily[details].humidity}
                    feels={daily[details].feels_like.day}
                    pop={daily[details].pop}
                    clouds={daily[details].clouds}
                    uvi={daily[details].uvi}
                    wind={daily[details].wind_speed}
                    timeStamp={`${getDate(daily[details].dt).toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: "long",})}`}/>
            </div>
        </div>

    )
}