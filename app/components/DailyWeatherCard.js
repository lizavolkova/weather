import React, { useState } from 'react';
import WeatherDescription from "../components/Atoms/WeatherDescription"
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import CardStyle from "./Atoms/CardStyle";
import Temperature from "./Atoms/Temperature";
import {getDate} from "../utils/getDate";

export default function DailyWeatherCard({date, time, temp, description,icon}) {
    const [showDetails, setShowDetails] = useState(true)
    const day = getDate(date);

    return (
        <div className="flex-col">
            <div onClick={() => setShowDetails(!showDetails)}>

            </div>
            <div className={`${showDetails ? '' : 'hidden'}`}>
                Details
            </div>
        </div>
    )
}
