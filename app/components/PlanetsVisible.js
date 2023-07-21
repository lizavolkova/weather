import  'astronomy-engine';
import { SearchRiseSet, Observer } from 'astronomy-engine';
import {getDate} from "../utils/getDate";
import {getTime} from "../utils/getTime";
import IconArrowBarDown from "./icons/IconArrowBarDown";
import IconArrowBarUp from "./icons/IconArrowBarUp";

// const StorageKey = 'AstroDemo.Options';
// var Options;
//
// function IsValidNumber(s) {
//
//     return typeof s === 'string' && /^[\-\+]?\d+(\.\d*)?$/.test(s);
// }
//
// function LoadOptions() {
//     let options;
//     try {
//         options = JSON.parse(window.localStorage.getItem(StorageKey));
//     } catch (e) {
//     }
//
//     if (!options) options = {};
//     if (!IsValidNumber(options.latitude))  options.latitude  = '30';
//     if (!IsValidNumber(options.longitude)) options.longitude = '-90';
//     if (!IsValidNumber(options.elevation)) options.elevation = '0';
//     return options;
// }
//
// function SaveOptions() {
//     try {
//         window.localStorage.setItem(StorageKey, JSON.stringify(Options));
//     } catch (e) {
//     }
// }
//
// function Init() {
//     let options = LoadOptions();
//     // document.getElementById('EditLatitude')?.value  = options.latitude;
//     // document.getElementById('EditLongitude')?.value = options.longitude;
//     // document.getElementById('EditElevation')?.value = options.elevation;
//     return options;
// }
//
// function Pad(s, w) {
//     s = s.toFixed(0);
//     while (s.length < w) {
//         s = '0' + s;
//     }
//     return s;
// }
//
// function FormatDate(date) {
//     var year = Pad(date.getFullYear(), 4);
//     var month = Pad(1 + date.getMonth(), 2);
//     var day = Pad(date.getDate(), 2);
//     var hour = Pad(date.getHours(), 2);
//     var minute = Pad(date.getMinutes(), 2);
//     var second = Pad(date.getSeconds(), 2);
//     return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
// }
//
// function DisplayEvent(name, evt) {
//
//     let text = evt ? FormatDate(evt.date) : '';
//     console.log(text)
//     // document.getElementById(name).innerText = text;
// }
//
// function UpdateScreen() {
//
//     let text_latitude = '41.18856';
//     let text_longitude = '-73.83745';
//     let text_elevation = '1';
//     if (!IsValidNumber(text_latitude) || !IsValidNumber(text_longitude) || !IsValidNumber(text_elevation)) {
//
//         // Bail out until user corrects problems in the observer coordinates.
//         // Gray out the whole table so the user knows there is something wrong.
//         //document.getElementById('CalcTable').style.display = 'none';
//     } else {
//         let date = new Date();
//         //document.getElementById('DateTimeBox').innerText = FormatDate(date);
//         //document.getElementById('CalcTable').style.display = '';
//
//         let latitude = parseFloat(text_latitude);
//         let longitude = parseFloat(text_longitude);
//         let elevation = parseFloat(text_elevation);
//         if (latitude !== Options.latitude || longitude !== Options.longitude || elevation !== Options.elevation) {
//             Options = { latitude:text_latitude, longitude:text_longitude, elevation:text_elevation };
//             SaveOptions();
//         }
//         let observer = new Observer(latitude, longitude, elevation);
//
//         let rise  = SearchRiseSet('Mercury',  observer, +1, date, 300);
//         let set  = SearchRiseSet('Mercury',  observer, -1, date, 300);
//
//
//         DisplayEvent('Rise',  rise);
//         DisplayEvent('Set',  set);
//
//     }
//
//     //setTimeout(UpdateScreen, 1000);
// }
//
// Options = Init();
// UpdateScreen();


const Planet = ({planet, rise, set, visible}) => {
    return (
        <div className={`flex flex-1 py-4 ${visible ? 'text-white ' : 'opacity-40'}`}>
            <div className="min-w-[90px]"><img className="pl-4 h-[25px] w-auto pr-3 mx-auto"  src={`/icons/planets/${planet}.svg`} alt=""/></div>
            <div className="w-1/4">{planet}</div>
            <div className="w-1/4 flex items-center"><IconArrowBarUp/><span className="pl-2">{rise}</span></div>
            <div className="w-1/4 flex items-center"><IconArrowBarDown /><span className="pl-2">{set}</span></div>
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
        const rise  = SearchRiseSet(planet,  observer, +1, date, 300);
        const set  = SearchRiseSet(planet,  observer, -1, date, 300);
        const visible = getTime(date) > getTime(rise.date) && getTime(date) < getTime(set.date);

        return {
            planet,
            rise,
            set,
            visible
        }
    })



    // const excludeList = ['sun', 'moon', 'earth'];
    //
    // const visiblePlanets = data.table.rows.filter(body => {
    //     const altitude = body.cells[0].position.horizonal.altitude.degrees;
    //     const azimuth = body.cells[0].position.horizonal.azimuth;
    //
    //     return parseFloat(altitude) > 0 && excludeList.indexOf(body.entry.id) < 0
    // })
    //
    return (
         <div className="w-full">
             <div className="flex flex-col w-full">
                 {planetRiseSetTimes.map(planet => {
                     // const altitude = planet.cells[0].position.horizonal.altitude.degrees;
                     // const azimuth = planet.cells[0].position.horizonal.azimuth.degrees;
                     // const name = planet.entry.name;

                    return <Planet key={planet.planet} planet={planet.planet} rise={getTime(planet.rise.date)} set={getTime(planet.set.date)} visible={planet.visible}/>
                 })}
             </div>
         </div>
    )
}