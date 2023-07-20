import CelestialDoughnutChart from "./Tables/CelestialDoughnutChart";
import {getTime} from "../utils/getTime";
import CelestialRiseCard from "../CelestialRiseCard";

const CelestialTimeCard = ({text, time}) => {
    return (
        <div className="flex flex-col">
            <div className="text-md text-slate-400">{text}</div>
            <div className="text-lg">{time}</div>
        </div>
    )
}

export default function SunriseCard({data}) {
    const sunriseTime = new Date(data.sunrise);
    const sunsetTime = new Date(data.sunset);
    const dawnTime = new Date(data.civil_twilight_begin);
    const duskTime = new Date(data.civil_twilight_end);
    const solarNoon = new Date(data.solar_noon);


    const params = [
        {
            name: 'Dawn',
            val: getTime(dawnTime)
        },
        {
            name: 'Solar Noon',
            val: getTime(solarNoon)
        },
        {
            name: 'Dusk',
            val: getTime(duskTime)
        }
    ]

    return <CelestialRiseCard rise={sunriseTime} set={sunsetTime} params={params} celestialIcon='/icons/sun.png' riseText="Sunrise" setText="Sunset" highlightColor='#d7b13e'/>
}