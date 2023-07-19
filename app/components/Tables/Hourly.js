import React, {useRef, useEffect, useState} from 'react';


import { Line } from 'react-chartjs-2';
import {getTime} from "../../utils/getTime";
import {getDate} from "../../utils/getDate";

import {getIcon} from "../../utils/getIcon";
import {Chart as ChartJS} from "chart.js";
import WeatherLineChart from "./WeatherLineChart";




export default function Hourly({current, hourly}) {
    const hourlyHalf = hourly.slice(0, 24);

    const temp = hourlyHalf.map(weather => Math.floor(weather.temp));
    const pop = hourlyHalf.map(weather => Math.floor(weather.pop*100));
    const time = hourlyHalf.map(weather => getTime(getDate(weather.dt)));
    const icons = hourlyHalf.map(weather => getIcon(weather.weather))
    const minTemp = temp.map(temp => temp - 10);

    return (
        <div id="hourly-chart" className="chartWrapper overflow-x-scroll">
            <div className="relative w-[2000px] h-[350px] ">
                <WeatherLineChart hourly={hourly} temp={temp} pop={pop} time={time} icons={icons} inTemp={minTemp}/>
            </div>
        </div>
)
}