import CelestialDoughnutChart from "./Tables/CelestialDoughnutChart";
import {getTime} from "../utils/getTime";
import CelestialRiseCard from "./CelestialRiseCard";
import {getDate} from "../utils/getDate";
import {Observer, SearchRiseSet, MoonPhase} from "astronomy-engine";

// const getMoonPhaseOpenWeather = (phase) => {
//     switch(true) {
//         case phase === 0 || phase === 1:
//             return ['New Moon', 'new.svg'];
//         case phase === 0.25:
//             return ['First Quarter Moon','first-quarter.svg'];
//         case phase === 0.75:
//             return ['Last Quarter Moon', 'last-quarter.svg'];
//         case phase === 0.5:
//             return ['Full Moon', 'full.svg'];
//         case phase < 0.25:
//             return ['Waxing Crescent', 'wax-crescent.svg'];
//         case phase > 0.25 && phase < 0.5:
//             return ['Waxing Gibous', 'wax-gibous.svg'];
//         case phase > 0.5 && phase < 0.75:
//             return ['Waning Gibous', 'wan-gibous.svg'];
//         case phase > 0.75 && phase < 1:
//             return ['Waning Crescent', 'wan-crescent.svg'];
//     }
// }

const getMoonPhase = (phase) => {
    switch(true) {
        case phase === 0 || phase === 360:
            return ['New Moon', 'new.svg'];
        case phase === 90:
            return ['First Quarter Moon','first-quarter.svg'];
        case phase === 270:
            return ['Last Quarter Moon', 'last-quarter.svg'];
        case phase === 180:
            return ['Full Moon', 'full.svg'];
        case phase < 90:
            return ['Waxing Crescent', 'wax-crescent.svg'];
        case phase > 90 && phase < 180:
            return ['Waxing Gibous', 'wax-gibous.svg'];
        case phase > 180 && phase < 270:
            return ['Waning Gibous', 'wan-gibous.svg'];
        case phase > 270 && phase < 360:
            return ['Waning Crescent', 'wan-crescent.svg'];
    }
}

export default function MoonriseCard() {
    const lat = 41.18856;
    const long = -73.83745;

    const date = new Date();
    const observer = new Observer(lat, long, 1);
    const set  = new Date(SearchRiseSet('Moon',  observer, -1, date, 300).date);
    const rise  = new Date(SearchRiseSet('Moon',  observer, +1, date, 300).date);
    const phase = MoonPhase(date);
    const moonData = getMoonPhase(phase);

    const params = [
        {
            name: 'Phase',
            val: moonData[0],
            icon: `/icons/moon/${moonData[1]}`
        }
    ]

    return <CelestialRiseCard rise={rise} set={set} params={params} celestialIcon='/icons/moon.png' riseText="Moonrise" setText="Moonset" highlightColor='#94a2ed'/>
}