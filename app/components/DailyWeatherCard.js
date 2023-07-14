import {getImage} from "../utils/backgroundPhotos";
import {getIcon} from "../utils/getIcon";
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import WeatherDescription from "./Atoms/WeatherDescription";
const weatherID = 800;

export default function DailyWeatherCard({date, description, max, min, icon}) {
    const day = new Date(date * 1000);
    return (
        <div className="flex p-4 backdrop-blur-md border-2 border-sky-500 rounded-xl m-2 p-4">
            <div className="flex-none p-2"><img src={icon} width="25" height="25"/></div>
            <div className="flex flex-auto flex-col">
                <span>{`${getDay(date)}, ${getMonth(date)} ${day.getDate()}`}</span>
                <WeatherDescription text={description}/>
            </div>
            <div className="flex flex-col text-center border-l-2 border-slate-400 pl-2">
                <span>{Math.floor(min)}°</span>
                <span>{Math.floor(max)}°</span>
            </div>
        </div>
    )
}
