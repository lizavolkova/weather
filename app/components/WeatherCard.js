import React, { useState } from 'react';
import WeatherDescription from "../components/Atoms/WeatherDescription"
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import CardStyle from "./Atoms/CardStyle";
import Temperature from "./Atoms/Temperature";
import {getDate} from "../utils/getDate";


export default function WeatherCard({date, time, temp, description,icon, noaa}) {
    const [showDetails, setShowDetails] = useState(true)
    const day = getDate(date);

    return (
        <div className="flex-col">
        <div onClick={() => setShowDetails(!showDetails)}>
            <CardStyle classes="w-[110px] md:w-[150px] flex-col bg-opacity-25 bg-black cursor-pointer text-center" >
                <span className="text-slate-400 text-xs">{`${getDay(day).substring(0, 3)} ${getMonth(day)} ${day.getDate()}`}</span>

                {icon && <div><img className="mx-auto" src={icon} width="50" height="50" alt=""/></div>}
                <div className="text-3xl"><Temperature temp={temp.day}/></div>
                <WeatherDescription text={description}/>
                <div className="text-slate-400 text-xs">
                    <Temperature temp={temp.min} /> | <Temperature temp={temp.max} />
                </div>
            </CardStyle>
        </div>
            {/*<div className={`${showDetails ? '' : 'hidden'} flex `}>*/}
            {/*    {noaa && noaa.map(weather => {*/}
            {/*        return (*/}
            {/*            <div className="flex">*/}
            {/*                <span>{weather.name}</span>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    )
}
