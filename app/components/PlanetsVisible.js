import  'astronomy-engine';
import { SearchRiseSet, Observer, Horizon, Equator } from 'astronomy-engine';
import {getTime} from "../utils/getTime";
import IconArrowBarDown from "./icons/IconArrowBarDown";
import IconArrowBarUp from "./icons/IconArrowBarUp";

const getCompassDirection = (az) => {
    // return ['north','north east', 'east','south east', 'south','south west', 'west','north west'][Math.floor(((az+22.5)%360)/45)]
     return ['N','NE', 'E','SE', 'S','SW', 'W','NW'][Math.floor(((az+22.5)%360)/45)]
}

const Planet = ({planet, rise, set, visible}) => {
    return (
        <div className={`flex flex-1 py-4 ${visible ? 'text-white ' : 'opacity-40'}`}>
            <div className="min-w-[90px]"><img className="pl-4 h-[25px] w-auto pr-3 mx-auto"  src={`/icons/planets/${planet}.svg`} alt=""/></div>
            <div className="w-1/4">{planet}</div>
            <div className="w-1/4 flex items-center"><IconArrowBarUp/><span className="pl-2">{rise} </span></div>
            <div className="w-1/4 flex items-center "><IconArrowBarDown /><span className="pl-2">{set}</span></div>
        </div>
    )
}

export default function PlanetsVisible({data}) {
    const bodies =[
        "Mercury",
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "Pluto"]

    const lat = 41.18856;
    const long = -73.83745;
    const el = 1;
    const date = new Date();

    const observer = new Observer(lat, long, el);

    const planetRiseSetTimes = bodies.map(planet => {
        const rise  = new Date(SearchRiseSet(planet,  observer, +1, date, 300));
        const set  = new Date(SearchRiseSet(planet,  observer, -1, date, 300));

        const visible = getTime(date) > getTime(rise) && getTime(date) < getTime(set);

        const riseEq = Equator(planet, rise, observer, true, true)
        const riseLocation = Horizon(rise, observer, riseEq.ra, riseEq.dec, 'normal')

        const setEq = Equator(planet, set, observer, true, true);
        const setLocation = Horizon(set, observer, setEq.ra, setEq.dec, 'normal')

        return {
            planet,
            rise,
            set,
            visible,
            riseLocation,
            setLocation
        }
    })

    return (
         <div className="w-full">
             <div className="flex flex-col w-full">
                 {planetRiseSetTimes.map(planet => {
                     const riseDirection = getCompassDirection(planet.riseLocation.azimuth)
                     const setDirection = getCompassDirection(planet.setLocation.azimuth)

                    return <Planet key={planet.planet} planet={planet.planet} rise={`${getTime(planet.rise)} ${riseDirection}`} set={`${getTime(planet.set)} ${setDirection}`} visible={planet.visible}/>
                 })}
             </div>
         </div>
    )
}