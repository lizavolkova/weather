import React, { useState, useEffect } from 'react';
import {getIcon} from "../utils/getIcon";
import WeatherCard from "./WeatherCard";
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import Image from 'next/image'
import IconThermometerHalf from '../components/icons/IconThermometerHalf'
import IconWiHumidity from "./icons/IconWiHumidity";
import IconUmbrella from "./icons/IconUmbrella";
import Alert from "./Alert";
import Temperature from "./Atoms/Temperature";
import {getDate} from "../utils/getDate";
import CardStyle from "./Atoms/CardStyle";
import {getTime} from "../utils/getTime";
import IconWind from "./icons/IconWind";
import IconSunset from "./icons/IconSunset";
import IconSunrise from "./icons/IconSunrise";
import IconWiMoonrise from "./icons/IconWiMoonrise";
import IconMoonset from "./icons/IconMoonset";
import IconSun from "./icons/IconSun";
import DailyWeather from "./DailyWeather";





export default function MainWeather({current, daily, alerts, noaaData}) {


    const day = getDate(current.dt);

    const importantAlerts = alerts.filter(alert => alert.properties.severity === "Severe" ||  alert.properties.severity === "Extreme");
    const otherAlerts     = alerts.filter(alert => alert.properties.severity != "Severe" &&  alert.properties.severity != "Extreme")
    const sortedAlerts = [...importantAlerts, ...otherAlerts];


    return (
        <div className=" flex flex-col justify-between md:p-6 bg-black bg-opacity-25 w-full" >
            <div className="text-right">{`${getDay(day).substring(0, 3)} ${getMonth(day)} ${day.getDate()}`} | {`${day.getHours()}:${day.getMinutes()}`}</div>

            <div>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col">
                        <div className="self-end"><Image src={getIcon(current?.weather)} width="200" height="100" alt=""/></div>
                        <div className="text-9xl self-end"><Temperature temp={current.temp} /></div>
                        <div className="text-4xl text-slate-200 self-end capitalize">{current?.weather[0]?.description}</div>
                        <div className="text-2xl text-slate-300 self-end capitalize">High: {Math.floor(daily[0].temp.max)}° | Low: {Math.floor(daily[0].temp.min)}° </div>
                    </div>



                </div>

                {sortedAlerts && sortedAlerts.map(alert => {
                    return <Alert alert={alert} key={alert.id}/>
                })}

            </div>


        </div>

    )
}
