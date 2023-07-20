import CelestialDoughnutChart from "./Tables/CelestialDoughnutChart";
import {getTime} from "../utils/getTime";
import CelestialRiseCard from "../CelestialRiseCard";
import {getDate} from "../utils/getDate";

const getMoonPhase = (phase) => {
    switch(true) {
        case phase === 0 || phase === 1:
            return 'New Moon';
        case phase === 0.25:
            return 'First Quarter Moon';
        case phase === 0.75:
            return 'Last Quarter Moon';
        case phase === 0.5:
            return 'Full Moon';
        case phase < 0.25:
            return 'Waxing Crescent';
        case phase > 0.25 && phase < 0.5:
            return 'Waxing Gibous';
        case phase > 0.5 && phase < 0.75:
            return 'Waning Gibous';
        case phase > 0.75 && phase < 1:
            return 'Waning Crescent';
    }
}

export default function MoonriseCard({data}) {
    const moonriseTime = getDate(data.moonrise);
    const moonsetTime = getDate(data.moonset);
    const phaseIcon = 'http://openweathermap.org/img/wn/01n@2x.png'

    const params = [
        {
            name: 'Phase',
            val: getMoonPhase(data.moon_phase),
            icon: phaseIcon
        }
    ]

    return <CelestialRiseCard rise={moonriseTime} set={moonsetTime} params={params} celestialIcon='/icons/moon.png' riseText="Moonrise" setText="Moonset" highlightColor='#94a2ed'/>
}