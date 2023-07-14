import React, { useState } from 'react';
import {getImage} from "../utils/backgroundPhotos";
import {getIcon} from "../utils/getIcon";
import Hourly from "./Hourly";
import WeatherCard from "./WeatherCard";
import Modal from "./Atoms/Modal";
const weatherID = 800;
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";

export default function MainWeather({current, hourly, daily, alerts}) {
    const [showAlertModal, setShowAlertModal] = useState(false);
    const today = daily[0];

    return (
        <div className="h-[calc(100vh-400px)] flex flex-col justify-between p-6" >
            <div className="text-right">July 13, 2023 | 13:45</div>

            <div>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col">
                        <div className="self-end"><img src={getIcon(current?.weather)} width="100" height="100"/></div>
                        <div className="text-9xl self-end">{Math.floor(current?.temp)}°</div>
                        <div className="text-4xl self-end">{current?.weather[0]?.main}</div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col">
                            <WeatherCard time="morning" temp={today?.temp?.morn}/>
                        </div>
                        <div className="flex flex-col">
                            <WeatherCard time="afternoon" temp={today?.temp?.day}/>
                        </div>
                        <div className="flex flex-col">
                            <WeatherCard time="evening" temp={today?.temp?.eve}/>
                        </div>
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
                <div className="flex">
                    {hourly && hourly.map((weather,i)=> {
                        const date = new Date(weather?.dt * 1000);
                        const time = `${date.getHours()}:00`;
                        const description = weather?.weather[0]?.main;
                        const icon = getIcon(weather?.weather);

                        return (
                            <div key={i}>
                                {i < 6 ?
                                    <div >
                                        <WeatherCard time={time} temp={weather?.temp} description={description} icon={icon}/>
                                    </div>
                                :
                                null}
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>

    )
}
