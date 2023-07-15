import React, { useState } from 'react';
import {getImage} from "../utils/backgroundPhotos";
import {getIcon} from "../utils/getIcon";
import Hourly from "./Hourly";
import WeatherCard from "./WeatherCard";
import Modal from "./Atoms/Modal";
const weatherID = 800;
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import CardStyle from './Atoms/CardStyle';
import Image from 'next/image'

const Card = ({title, icon, value}) => {
    return(
        <div className="flex flex-col pb-4 ml-12">
            <div className="text-slate-100 capitalize pb-4 ml-2">{title}</div>
            <div className="h-full flex">
                <Image className="w-[32px] fill-white" src={icon} width="800" height="800" alt=""/>
                <div className="text-2xl self-center">{value}</div>
            </div>
        </div>
    )
}
export default function MainWeather({current, hourly, daily, alerts}) {
    const [showAlertModal, setShowAlertModal] = useState(false);
    const today = daily[0];

    const day = new Date(current.dt * 1000);

    return (
        <div className=" flex flex-col justify-between p-6" >
            <div className="text-right">{`${getDay(current.dt).substring(0, 3)} ${getMonth(current.dt)} ${day.getDate()}`} | {`${day.getHours()}:${day.getMinutes()}`}</div>

            <div>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col">
                        <div className="self-end"><Image src={getIcon(current?.weather)} width="200" height="100" alt=""/></div>
                        <div className="text-9xl self-end">{Math.floor(current?.temp)}°</div>
                        <div className="text-4xl self-end capitalize">{current?.weather[0]?.description}</div>
                    </div>


                        <div className="flex mt-12">
                            <Card title="Feels like" value="25°" icon="/icons/temperature.svg"/>
                            <Card title="Humidity" value="60%" icon="/icons/humidity.svg"/>
                            <Card title="Percipitaion" value="60%" icon="/icons/umbrella.svg"/>
                        </div>






                </div>

                {alerts && alerts.map(alert => {
                    const startDate = new Date(alert.start * 1000);
                    const endDate = new Date(alert.end * 1000);

                    return (
                        <div key={alert.start}>
                            <div className="bg-yellow-600 m-2 p-2 text-center rounded-md cursor-pointer" onClick={() => setShowAlertModal(true)}>{alert.event}</div>
                            <Modal showModal={showAlertModal} setShowModal={() => setShowAlertModal(false)} header="Weather Alert: Location">
                                <div className="font-bold">{alert.event}</div>
                                <div className="text-slate-400 mb-4">{`${getMonth(alert.start)} ${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()} - ${getMonth(alert.start)} ${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`}</div>
                                <p>{alert.description}</p>
                                <div className="text-xs mt-4">{alert.sender_name}</div>

                            </Modal>
                        </div>

                    )
                })}

                <hr/>
                8 Day Forecast
                <div className="flex overflow-auto">

                    {daily && daily.map((weather,i)=> {
                        const date = new Date(weather?.dt * 1000);
                        const time = `${date.getHours()}:00`;
                        const description = weather?.weather[0]?.main;
                        const icon = getIcon(weather?.weather);

                        return (
                            <WeatherCard key={i} date={weather?.dt} time={time} temp={weather?.temp} description={description} icon={icon}/>
                        )
                    })}
                </div>
            </div>


        </div>

    )
}
