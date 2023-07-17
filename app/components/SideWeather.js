import Image from 'next/image'
import HourlyWeatherCard from "./HourlyWeatherCard";
import {getIcon} from "../utils/getIcon";
import {getTimeWeather} from '../utils/getTimeWeather';
import Temperature from "./Atoms/Temperature";
import HourlyWeather from "./HourlyWeather";
import IconThermometerHalf from "./icons/IconThermometerHalf";
import IconWiHumidity from "./icons/IconWiHumidity";
import React from "react";
import IconWind from "./icons/IconWind";
import IconSun from "./icons/IconSun";
import IconBxLeaf from "./icons/IconBxLeaf";
import IconArrowsCollapse from "./icons/IconArrowsCollapse";

const Card = ({title, icon, value, units, iconClass, range=[]}) => {
    let color;
    switch (true) {
        case (parseInt(value) <= range[1]):
            color = 'text-lime-300';
            break;
        case (parseInt(value) >= range[2]):
            color = 'text-red-300';
            break;
        case (parseInt(value) > range[1] && parseInt(value) < range[2]):
            color = 'text-yellow-300';
            break;
        default:
            color = 'text-white';
            break;
    }

    return(
        <div className="flex flex-col pb-4">
            <div className="text-slate-100 capitalize pb-4 ml-1 drop-shadow-2xl text-xs text-slate-300">{title}</div>
            <div className="h-full flex">
                <div className={`${iconClass} self-center text-lg pr-1 ${color}`}>{icon}</div>
                <div className={`text-md self-center ${color}`}>{value}{units}</div>
            </div>
        </div>
    )
};

const TimeCard = ({time, temp, icon, feel}) => {

    return (
        <div className="text-center">
            <span className="text-slate-100 capitalize">{time}</span>
            <div className="flex">
                <div className="self-center"><Image src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width="80" height="80" alt=""/></div>
                <div className="text-2xl self-center"><Temperature temp={temp} /></div>
            </div>
            <div className="text-xs text-slate-200">Feels like <Temperature temp={feel}/></div>
        </div>
    )
}

export default function SideWeather({current, airPollution, hourly}) {
    const test = getTimeWeather(current, hourly);
    console.log(airPollution.current)
    return (
        <>
            <div className="mb-2 flex p-6">Ossining, NY</div>
            <div className="px-8 pb-8 flex flex-col justify-between w-full">
                <div className="flex flex-col">

                    <div className="flex justify-between">
                        <Card title="Feels like" value={`${Math.floor(current.feels_like)}°`} icon={<IconThermometerHalf/>} iconClass="text-xl"/>
                        <Card title="Humidity" value={`${current.humidity}`} units="%" icon={<IconWiHumidity />} iconClass="text-3xl" range={[0,55,65]}/>
                        <Card title="Wind" value={`${current.wind_speed}m/s`} icon={<IconWind />} iconClass="text-3xl" />
                    </div>
                    <hr />
                    <div className="flex justify-between mb-32 pt-8">
                        <Card title="UVI" value={`${current.uvi}°`} icon={<IconSun/>} iconClass="text-xl" range={[0,2,7]}/>
                        <Card title="AQI" value={`${airPollution.current.pollution.aqius}`} icon={<IconBxLeaf />} iconClass="text-3xl" range={[0,50,150]} />
                        <Card title="Pressure" value={`${current.pressure}hPa`} icon={<IconArrowsCollapse />} iconClass="text-3xl" />
                    </div>


                    <div className="flex justify-between">
                        {test && test.map(weather => {
                            return (
                                <div className="flex flex-col" key={weather.time}>
                                    <TimeCard time={weather.time} temp={weather.weather.temp} feel={weather.weather.feels_like} icon={weather.weather.weather[0].icon} />
                                </div>
                            )
                        })}
                    </div>


                </div>
            </div>
        </>

    )
}
