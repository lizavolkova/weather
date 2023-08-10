import React, { useState } from 'react';
import {getDate} from "../../utils/getDate";
import WeatherLineChart from "./WeatherLineChart";
import ForecastDetailsTable from "../Atoms/ForecastDetailsTable";
import TimeWeatherDetails from "../Atoms/TimeWeatherDetails";


export default function DailyWeatherChart({daily, noaaData}) {
    const [details, setDetails] = useState(0);

    const temp = daily.map(weather => Math.floor(weather.temp.max));
    const pop = daily.map(weather => Math.floor(weather.pop*100));
    const time = daily.map(weather => {
        const date =  getDate(weather.dt)
        return `${date.toLocaleString('en-US', {weekday: 'short'})} ${date.getDate()}`
    });
    const icons = daily.map(weather => weather.icon)
    const minTemp = daily.map(weather => Math.floor(weather.temp.min));

    const onClick = (el) => {
        setDetails(el);
    }

    const { day, night } = daily[details];

    return (
        <div>
            <div id="daily-chart" className="chartWrapper overflow-x-scroll py-6">
                <div className="relative w-[1200px] h-[350px] mx-auto">
                    <WeatherLineChart temp={temp} pop={pop} time={time} icons={icons} minTemp={minTemp} clickedEl={onClick} id="daily"/>
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
                    timeStamp={`${getDate(daily[details].dt).toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: "long",})}`}>
                    <div className="flex w-full">
                            <TimeWeatherDetails  icon={day.icon} title="Day" longPhrase={day.longPhrase} temp={daily[details].temp.max}/>
                            <TimeWeatherDetails  icon={night.icon} title="Night" longPhrase={night.longPhrase} temp={daily[details].temp.min}/>
                    </div>
                </ForecastDetailsTable>
            </div>
        </div>

    )
}