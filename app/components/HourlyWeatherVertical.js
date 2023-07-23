import React, { useState, useEffect } from 'react';
import {getIcon} from "../utils/getIcon";
import HourlyWeatherCard from "./HourlyWeatherCard";

export default function HourlyWeatherVertical({hourly}) {
    const [open, setOpen] = useState(true);
    const classes = open ? 'overflow-auto h-auto' : 'h-[237px] overflow-hidden';

    return (
        <div className={`p-3 ${classes}`}>
            <div className="uppercase p-2 cursor-pointer" >Hourly</div>
            <ul className="">
                {
                    hourly.map(weather => {
                        const description = weather.weather[0].description;
                        const icon = weather?.icon;

                        return (
                            <li className="" key={weather.dt}>
                                <HourlyWeatherCard description={description} date={weather.dt} icon={icon} temp={weather.temp} humidity={weather.humidity} pop={weather.pop} feel={weather.feels_like}/>
                            </li>
                        )
                    })
                }

            </ul>
        </div>

    )
}