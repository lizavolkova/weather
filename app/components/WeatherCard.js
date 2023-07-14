import {getImage} from "../utils/backgroundPhotos";
import WeatherDescription from "../components/Atoms/WeatherDescription"
const weatherID = 800;


export default function WeatherCard({time, temp, description,icon}) {

    return (
        <div className="backdrop-blur-md border-2 border-sky-500 rounded-xl w-24 m-2 p-4 flex flex-col text-center">
            <span className="">{time}</span>
            <hr/>
            {icon && <div><img className="mx-auto" src={icon} width="50" height="50"/></div>}
            <div>{Math.floor(parseInt(temp))}°</div>
            <WeatherDescription text={description}/>
        </div>
    )
}
