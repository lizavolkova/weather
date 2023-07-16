import {getImage} from "../utils/backgroundPhotos";
import WeatherDescription from "../components/Atoms/WeatherDescription"
const weatherID = 800;
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import CardStyle from "./Atoms/CardStyle";

export default function WeatherCard({date, time, temp, description,icon}) {
    const day = new Date(date * 1000);

    return (
        <CardStyle classes="w-[150px] flex-col bg-opacity-25 bg-black">
            <span className="text-slate-400 text-xs">{`${getDay(date).substring(0, 3)} ${getMonth(date)} ${day.getDate()}`}</span>

            {icon && <div><img className="mx-auto" src={icon} width="50" height="50" alt=""/></div>}
            <div className="text-3xl">{Math.floor(temp.day)}°</div>
            <WeatherDescription text={description}/>
            <div className="text-slate-400 text-xs">
                <span>{Math.floor(temp.min)}° | </span>
                <span>{Math.floor(temp.max)}°</span>
            </div>
        </CardStyle>
    )
}
