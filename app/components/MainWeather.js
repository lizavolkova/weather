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


const Card = ({title, icon, value, iconClass}) => {
    return(
        <div className="flex flex-col pb-4 ml-12">
            <div className="text-slate-100 capitalize pb-4 ml-1 drop-shadow-2xl">{title}</div>
            <div className="h-full flex">
                <div className={`${iconClass} self-center`}>{icon}</div>
                <div className="text-2xl self-center">{value}</div>
            </div>
        </div>
    )
};

const DailyIconAttribute = ({icon, title, value}) => {
    return <div className="w-1/2">{title}<br/>{value}</div>
};

export default function MainWeather({current, daily, alerts, noaaData}) {
    const [detailedForecast, setDetailedForecast] = useState([]);
    const day = getDate(current.dt);




    const importantAlerts = alerts.filter(alert => alert.properties.severity === "Severe" ||  alert.properties.severity === "Extreme");
    const otherAlerts     = alerts.filter(alert => alert.properties.severity != "Severe" &&  alert.properties.severity != "Extreme")
    const sortedAlerts = [...importantAlerts, ...otherAlerts];

    console.log(daily);
    const definaNoaaPairs = (i) => {
        const noaaPairs = noaaData.flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)]);
        setDetailedForecast(noaaPairs[i])
    }
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


                        <div className="flex mt-12">
                            <Card title="Feels like" value={`${Math.floor(current.feels_like)}°`} icon={<IconThermometerHalf/>} iconClass="text-xl"/>
                            <Card title="Humidity" value={`${current.humidity}%`} icon={<IconWiHumidity />} iconClass="text-3xl" />
                        </div>
                </div>

                {sortedAlerts && sortedAlerts.map(alert => {
                    return <Alert alert={alert} key={alert.id}/>
                })}

                <hr/>
                8 Day Forecast
                <div className="flex overflow-auto">

                    {daily && daily.map((weather,i)=> {

                        const date = getDate(weather?.dt);
                        const time = `${date.getHours()}:00`;
                        const description = weather?.weather[0]?.main;
                        const icon = getIcon(weather?.weather);

                        return (
                            <div key={i} onClick={() => definaNoaaPairs(i)}>
                                <WeatherCard date={weather?.dt} time={time} temp={weather?.temp} description={description} icon={icon} />
                            </div>

                        )
                    })}
                </div>


                {detailedForecast?.length > 0 &&
                <CardStyle classes="text-left">
                    {detailedForecast?.map(weather => {
                        console.log(weather)
                        return (
                            <div className="w-1/2 p-4 flex flex-col justify-between">
                                <div className="flex flex-col ">
                                    <div className="text-slate-400">{weather.name}</div>
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            <div className="text-3xl"><Temperature temp={weather.temperature} /></div>
                                            <img className="mx-auto" src="http://localhost:3000/_next/image?url=http%3A%2F%2Fopenweathermap.org%2Fimg%2Fwn%2F10d%402x.png&w=640&q=75" width="50" height="50" alt=""/>
                                        </div>
                                        <div>
                                            <div>P {weather.probabilityOfPrecipitation.value}</div>
                                            <div>H {weather.relativeHumidity.value}%</div>
                                        </div>
                                    </div>
                                    <div className="pb-12 text-sm">
                                        {weather.detailedForecast}
                                    </div>
                                </div>


                                <div className="flex flex-col border rounded-md w-full p-2 border-slate-400 text-sm text-slate-400">
                                    <div className="border-b flex m-2">
                                        <DailyIconAttribute title="Feels like" value="25"/>
                                        <DailyIconAttribute title={`Wind ${weather.windDirection}`} value={weather.windSpeed}/>
                                    </div>
                                    <div className="flex  m-2">
                                        <DailyIconAttribute title="Sunrise" value="time"/>
                                        <DailyIconAttribute title="Sunset" value="time"/>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </CardStyle>
                }

            </div>


        </div>

    )
}
