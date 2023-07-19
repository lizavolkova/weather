import Image from 'next/image'
import HourlyWeatherCard from "./HourlyWeatherCard";
import {getIcon} from "../utils/getIcon";
import {getTimeWeather} from '../utils/getTimeWeather';
import Temperature from "./Atoms/Temperature";
import HourlyWeatherVertical from "./HourlyWeatherVertical";
import IconThermometerHalf from "./icons/IconThermometerHalf";
import IconWiHumidity from "./icons/IconWiHumidity";
import React from "react";
import IconWind from "./icons/IconWind";
import IconSun from "./icons/IconSun";
import IconBxLeaf from "./icons/IconBxLeaf";
import IconArrowsCollapse from "./icons/IconArrowsCollapse";
import DailyWeather from "./DailyWeather";
import InfoCard from "./Atoms/InfoCard";
import WeatherTable from "./WeatherTable";

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
        <div className="flex flex-col pb-4 text-3xl ">
            <div className="text-slate-100 capitalize pb-4 ml-1 drop-shadow-2xl text-xs text-slate-300">{title}</div>
            <div className="h-full flex">
                <div className={`${iconClass} self-center text-lg pr-1 ${color}`}>{icon}</div>
                <div className={`text-md self-center ${color}`}>{value}{units}</div>
            </div>
        </div>
    )
};



export default function SideWeather({current, airPollution, hourly, daily, noaaData, bgColor}) {
    const test = getTimeWeather(current, hourly);
    const cardClass = `flex-col flex-1 basis-1/3 `
    // style={{backgroundColor: bgColor}}

    return (
        <>
            <div className="p-2 md:p-8 flex flex-col justify-between w-full">
                <WeatherTable daily={daily} hourly={hourly} current={current} noaaData={noaaData}/>



                <div className="flex flex-col">

                    <div className="flex flex-wrap md:justify-between w-full " >
                        <InfoCard title="Feels like" classes={cardClass} >
                            <Card value={`${Math.floor(current.feels_like)}°`} icon={<IconThermometerHalf/>} iconClass="text-xl"/>
                        </InfoCard>

                        <InfoCard title="Humidity" classes={cardClass}  >
                            <Card value={`${current.humidity}`} units="%" icon={<IconWiHumidity />} iconClass="text-3xl" range={[0,55,65]}/>
                        </InfoCard>

                        <InfoCard title="Wind" classes={cardClass}  >
                            <Card value={`${current.wind_speed}m/s`} icon={<IconWind />} iconClass="text-3xl" />
                        </InfoCard>

                        <InfoCard title="UVI" classes={cardClass}  >
                            <Card value={`${current.uvi}°`} icon={<IconSun/>} iconClass="text-xl" range={[0,2,7]}/>
                        </InfoCard>

                        <InfoCard title="AQI" classes={cardClass}  >
                            <Card value={`${airPollution.current.pollution.aqius}`} icon={<IconBxLeaf />} iconClass="text-3xl" range={[0,50,150]} />
                        </InfoCard>

                        <InfoCard title="Pressure" classes={cardClass} >
                            <Card value={`${current.pressure}hPa`} icon={<IconArrowsCollapse />} iconClass="text-3xl" />
                        </InfoCard>
                    </div>

                    <HourlyWeatherVertical hourly={hourly}/>

                </div>
            </div>
        </>

    )
}
