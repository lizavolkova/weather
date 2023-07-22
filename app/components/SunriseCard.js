import CelestialDoughnutChart from "./Tables/CelestialDoughnutChart";
import {getTime} from "../utils/getTime";
import CelestialRiseCard from "./CelestialRiseCard";
import {Observer, SearchRiseSet, SearchAltitude, SearchHourAngle} from "astronomy-engine";
import React from "react";

const CelestialTimeCard = ({text, time}) => {
    return (
        <div className="flex flex-col">
            <div className="text-md text-slate-400">{text}</div>
            <div className="text-lg">{time}</div>
        </div>
    )
}

export default function SunriseCard() {
    const lat = 41.18856;
    const long = -73.83745;

    const date = new Date();
    const observer = new Observer(lat, long, 1);
    const set  = new Date(SearchRiseSet('Sun',  observer, -1, date, 300).date);
    const rise  = new Date(SearchRiseSet('Sun',  observer, +1, date, 300).date);

    const dusk = new Date(SearchAltitude('Sun', observer, -1, date, 1, -6));
    const dawn = new Date(SearchAltitude('Sun', observer, +1, date, 1, -6));

    const noon = new Date(SearchHourAngle('Sun', observer, 0, date).time.date);

    const daylight = Math.floor(set.getHours() - rise.getHours());

    const params = [
        {
            name: 'Dawn',
            val: getTime(dawn)
        },
        {
            name: 'Solar Noon',
            val: getTime(noon)
        },
        {
            name: 'Dusk',
            val: getTime(dusk)
        }
    ]

    return (
        <div className="flex flex-col w-full">
            <div>Today has {daylight} hours of daylight</div>
            <CelestialRiseCard rise={rise} set={set} params={params} celestialIcon='/icons/sun.png' riseText="Sunrise" setText="Sunset" highlightColor='#d7b13e'/>
        </div>
    )
}