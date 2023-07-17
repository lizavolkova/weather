import WeatherDescription from "./Atoms/WeatherDescription";
import Image from "next/image";
import CardStyle from './Atoms/CardStyle';
import Temperature from "./Atoms/Temperature";
import {getDate} from "../utils/getDate";
import {getTime} from "../utils/getTime";

const MiniData = ({text, value}) => {
    return (
        <div className="text-xs flex justify-between ">
            <span className="capitalize text-slate-400">{text}</span>
            <span>{value}</span>
        </div>
    )
}

export default function HourlyWeatherCard({date, description, icon, temp, humidity, pop, feel}) {
    const day = getDate(date);

    return (
        <CardStyle>
            <div className="flex-none p-2 text-left self-center">
                <div className="">{getTime(day)}</div>
            </div>

            <div className="flex flex-auto flex-col md:flex-row">
                <Image src={icon} width="75" height="50" alt=""/>
                <div className="self-center"><WeatherDescription text={description}/></div>
            </div>
            <div className="text-left text-3xl self-center pr-2 md:pr-8 "><Temperature temp={temp} /></div>

            <div className="flex flex-col text-left border-l-2 border-slate-400 pl-2 min-w-[140px] justify-around">
                <MiniData text="feels like" value={`${Math.floor(feel)}°`}/>
                <MiniData text="humidity" value={`${Math.floor(humidity)}%`}/>
                <MiniData text="percipitation" value={`${pop*100}%`}/>
            </div>
        </CardStyle>
    )
}
