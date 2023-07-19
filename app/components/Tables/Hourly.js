import React, {useRef, useEffect, useState, useCallback} from 'react';


import { Line } from 'react-chartjs-2';
import {getTime} from "../../utils/getTime";
import {getDate} from "../../utils/getDate";

import {getIcon} from "../../utils/getIcon";
import {Chart as ChartJS} from "chart.js";
import WeatherLineChart from "./WeatherLineChart";
import ForecastDetailsTable from "../Atoms/ForecastDetailsTable";




export default function Hourly({current, hourly}) {
    const [details, setDetails] = useState(0);
    const hourlyHalf = hourly.slice(0, 24);

    const temp = hourlyHalf.map(weather => Math.floor(weather.temp));
    const pop = hourlyHalf.map(weather => Math.floor(weather.pop*100));
    const time = hourlyHalf.map(weather => getTime(getDate(weather.dt)));
    const icons = hourlyHalf.map(weather => getIcon(weather.weather))

    const onClick = (el) => {
        setDetails(el);
    }

    return (
        <div>
            <div id="hourly-chart" className="chartWrapper overflow-x-scroll">
                <div className="relative w-[2000px] h-[350px] ">
                    <WeatherLineChart hourly={hourly} temp={temp} pop={pop} time={time} icons={icons} clickedEl={onClick}/>
                </div>
            </div>
            <div className="mt-4">
                <ForecastDetailsTable humidity={hourly[details].humidity}
                                      feels={hourly[details].feels_like}
                                      pop={hourly[details].pop}
                                      clouds={hourly[details].clouds}
                                      uvi={hourly[details].uvi}
                                      wind={hourly[details].wind_speed}
                                      timeStamp={`Today at ${getDate(hourly[details].dt).toLocaleTimeString('en-GB', {timeStyle: 'short'})}`}/>
            </div>
        </div>

)
}