import {getImage} from "../utils/backgroundPhotos";
import {getIcon} from "../utils/getIcon";
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import WeatherDescription from "./Atoms/WeatherDescription";
import Image from "next/image";
const weatherID = 800;
import CardStyle from './Atoms/CardStyle';

const MiniData = ({text, value}) => {
    return (
        <div className="text-xs flex justify-between ">
            <span className="capitalize text-slate-400">{text}</span>
            <span>{value}</span>
        </div>
    )
}

export default function DailyWeatherCard({date, description, icon, temp, humidity, pop, feel}) {
    const day = new Date(date * 1000);
    const time = `${day.getHours()}:00`;

    return (
        <CardStyle>
            <div className="flex-none p-2 text-left self-center">
                <div className="">{time}</div>
            </div>

            <div className="flex flex-auto">
                <Image src={icon} width="75" height="50" alt=""/>
                <div className="self-center"><WeatherDescription text={description}/></div>


            </div>
            <div className="text-left text-3xl self-center pr-8 ">{Math.floor(temp)}°</div>

            <div className="flex flex-col text-left border-l-2 border-slate-400 pl-2 min-w-[140px] justify-around">
                <MiniData text="feels like" value={`${Math.floor(feel)}°`}/>
                <MiniData text="humidity" value={`${Math.floor(humidity)}%`}/>
                <MiniData text="percipitation" value={`${pop*100}%`}/>

                {/*<div className="flex justify-center items-center p-2">*/}
                {/*    <Image className="max-w-[20px]" src="/icons/humidity.png" width="512" height="512" alt=""/>*/}
                {/*    <span>{Math.floor(humidity)}</span>*/}
                {/*</div>*/}
                {/*<div className="flex justify-center items-center p-2">*/}
                {/*    <Image className="max-w-[20px]" src="/icons/drop.png" width="512" height="512" alt=""/>*/}
                {/*    <span>{pop * 100}%</span>*/}
                {/*</div>*/}
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