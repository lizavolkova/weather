import CelestialDoughnutChart from "./Tables/CelestialDoughnutChart";
import {getTime} from "../utils/getTime";
import CelestialRiseCard from "../CelestialRiseCard";
import {getDate} from "../utils/getDate";

const getMoonPhase = (phase) => {
    switch(true) {
        case phase === 0 || phase === 1:
            return ['New Moon', 'new.svg'];
        case phase === 0.25:
            return ['First Quarter Moon','first-quarter.svg'];
        case phase === 0.75:
            return ['Last Quarter Moon', 'last-quarter.svg'];
        case phase === 0.5:
            return ['Full Moon', 'full.svg'];
        case phase < 0.25:
            return ['Waxing Crescent', 'wax-crescent.svg'];
        case phase > 0.25 && phase < 0.5:
            return ['Waxing Gibous', 'wax-gibous.svg'];
        case phase > 0.5 && phase < 0.75:
            return ['Waning Gibous', 'wan-gibous.svg'];
        case phase > 0.75 && phase < 1:
            return ['Waning Crescent', 'wan-crescent.svg'];
    }
}

export default function MoonriseCard({data}) {
    const moonriseTime = getDate(data.moonrise);
    const moonsetTime = getDate(data.moonset);
    const phaseIcon = 'http://openweathermap.org/img/wn/01n@2x.png';
    const moonData = getMoonPhase(data.moon_phase);

    const params = [
        {
            name: 'Phase',
            val: moonData[0],
            icon: `/icons/moon/${moonData[1]}`
        }
    ]

    return <CelestialRiseCard rise={moonriseTime} set={moonsetTime} params={params} celestialIcon='/icons/moon.png' riseText="Moonrise" setText="Moonset" highlightColor='#94a2ed'/>
}