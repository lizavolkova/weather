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
import AirQuality from "./AirQuality";
import UVIndex from "./UVIndex";

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
    const temp = current.feels_like;
    const tempRange = [-30, 50];
    const total = Math.abs(tempRange[0]) + tempRange[1];
    const percent = ((Math.abs(tempRange[0]) + temp)/total) *100;
    const steps = [0,1,2,3,4,5];

    return (
        <>
            <div className="p-2 md:p-8 flex flex-col justify-between w-full">
                <WeatherTable daily={daily} hourly={hourly} current={current} noaaData={noaaData}/>



                <div className="flex flex-col">

                    <div className="flex flex-wrap md:justify-between w-full " >


                        <InfoCard title="Feels like" classes={cardClass} >
                            <div>{Math.floor(current.feels_like)}°</div>
                            <div className="flex flex-col space-y-2 p-2 w-full">
                                <input type="range" className="w-full" min={0} max={100} step={10} value={percent}/>
                                <ul className="flex justify-between w-full px-[10px]">
                                    {steps.map(step => {
                                        return <li className="flex justify-center relative"><span className="absolute">{Math.floor(tempRange[0] + ((total/5) * step))}</span></li>
                                    })}
                                </ul>
                            </div>
                        </InfoCard>

                        <InfoCard title="Humidity" classes={cardClass}  >
                            <div>{current.humidity}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{width: `${current.humidity}%`}}></div>
                            </div>
                        </InfoCard>

                        <InfoCard title="Wind" classes={cardClass}  >
                            <Card value={`${current.wind_speed}m/s`} icon={<IconWind />} iconClass="text-3xl" />
                        </InfoCard>

                        <InfoCard title="UVI" classes={cardClass}  >
                            <UVIndex uvi={current.uvi}/>
                            {/*<Card value={`${current.uvi}°`} icon={<IconSun/>} iconClass="text-xl" range={[0,2,7]}/>*/}
                        </InfoCard>

                        <InfoCard title="AQI" classes={cardClass}  >
                            <AirQuality air={airPollution}/>
                            {/*<Card value={`${airPollution.current.pollution.aqius}`} icon={<IconBxLeaf />} iconClass="text-3xl" range={[0,50,150]} />*/}
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
