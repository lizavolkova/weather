import {getImage} from "../utils/backgroundPhotos";
import {getIcon} from "../utils/getIcon";
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import WeatherDescription from "./Atoms/WeatherDescription";
import Image from "next/image";
const weatherID = 800;
import CardStyle from './Atoms/CardStyle';

export default function DailyWeatherCard({date, description, max, min, icon, temp, humidity, pop}) {
    const day = new Date(date * 1000);
    const time = `${day.getHours()}:00`;
    return (
        <CardStyle>
            <div className="flex-none p-2">
                <span>{time}</span>


            </div>
            <div className="flex flex-auto flex-col">
                <img src={icon} width="25" height="25"/>
                <span>{Math.floor(temp)}</span>
                <WeatherDescription text={description}/>
            </div>
            <div className="flex text-center border-l-2 border-slate-400 pl-2">
                <div className="flex justify-center items-center p-2">
                    <Image className="max-w-[20px]" src="/icons/humidity.png" width="512" height="512" alt=""/>
                    <span>{Math.floor(humidity)}</span>
                </div>
                <div className="flex justify-center items-center p-2">
                    <Image className="max-w-[20px]" src="/icons/drop.png" width="512" height="512" alt=""/>
                    <span>{Math.floor(pop)}</span>
                </div>
            </div>
        </CardStyle>
    )
}


// <div className="flex p-4 backdrop-blur-md border-2 border-sky-500 rounded-xl m-2 p-4">
//     <div className="flex-none p-2"><img src={icon} width="25" height="25"/></div>
//     <div className="flex flex-auto flex-col">
//         <span>{`${getDay(date)}, ${getMonth(date)} ${day.getDate()}`}</span>
//         <WeatherDescription text={description}/>
//     </div>
//     <div className="flex flex-col text-center border-l-2 border-slate-400 pl-2">
//         <span>{Math.floor(min)}°</span>
//         <span>{Math.floor(max)}°</span>
//     </div>
// </div>