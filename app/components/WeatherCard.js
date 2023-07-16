import WeatherDescription from "../components/Atoms/WeatherDescription"
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import CardStyle from "./Atoms/CardStyle";
import Temperature from "./Atoms/Temperature";
import {getDate} from "../utils/getDate";

export default function WeatherCard({date, time, temp, description,icon}) {
    const day = getDate(date);

    return (
        <CardStyle classes="w-[150px] flex-col bg-opacity-25 bg-black">
            <span className="text-slate-400 text-xs">{`${getDay(day).substring(0, 3)} ${getMonth(day)} ${day.getDate()}`}</span>

            {icon && <div><img className="mx-auto" src={icon} width="50" height="50" alt=""/></div>}
            <div className="text-3xl"><Temperature temp={temp.day}/></div>
            <WeatherDescription text={description}/>
            <div className="text-slate-400 text-xs">
                <Temperature temp={temp.min} /> | <Temperature temp={temp.max} />
            </div>
        </CardStyle>
    )
}
