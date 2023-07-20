import CelestialDoughnutChart from "./Tables/CelestialDoughnutChart";
import {getTime} from "../utils/getTime";
import CelestialRiseCard from "../CelestialRiseCard";
import {getDate} from "../utils/getDate";

const CelestialTimeCard = ({text, time}) => {
    return (
        <div className="flex flex-col">
            <div className="text-md text-slate-400">{text}</div>
            <div className="text-lg">{time}</div>
        </div>
    )
}

export default function MoonriseCard({data}) {
    const moonriseTime = getDate(data.moonrise);
    const moonsetTime = getDate(data.moonset);
    const phaseIcon = 'http://openweathermap.org/img/wn/01n@2x.png'

    const params = [
        {
            name: 'Phase',
            val: 'Waxing Gibbous',
            icon: phaseIcon
        }
    ]

    return <CelestialRiseCard rise={moonriseTime} set={moonsetTime} params={params} celestialIcon='/icons/moon.png' riseText="Moonrise" setText="Moonset" highlightColor='#94a2ed'/>
}