import React, {useRef, useEffect, useState} from 'react';


import { Line } from 'react-chartjs-2';
import {getTime} from "../../utils/getTime";
import {getDate} from "../../utils/getDate";

import {getIcon} from "../../utils/getIcon";
import {Chart as ChartJS} from "chart.js";
import WeatherLineChart from "./WeatherLineChart";




export default function DailyWeatherChart({daily}) {
    const temp = daily.map(weather => Math.floor(weather.temp.max));
    const pop = daily.map(weather => Math.floor(weather.pop*100));
    const time = daily.map(weather => {
        const date =  getDate(weather.dt)
        return `${date.toLocaleString('en-US', {weekday: 'short'})} ${date.getDate()}`
    });
    const icons = daily.map(weather => getIcon(weather.weather))
    const minTemp = daily.map(weather => Math.floor(weather.temp.min));

    return (
        <div id="daily-chart" className="chartWrapper overflow-x-scroll">
            <div className="relative w-[800px] h-[350px] mx-auto">
                <WeatherLineChart temp={temp} pop={pop} time={time} icons={icons} minTemp={minTemp}/>
            </div>
        </div>
    )
}