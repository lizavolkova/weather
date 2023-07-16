import {getIcon} from "../utils/getIcon";
import WeatherCard from "./WeatherCard";
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import Image from 'next/image'
import IconThermometerHalf from '../components/icons/IconThermometerHalf'
import IconWiHumidity from "./icons/IconWiHumidity";
import IconUmbrella from "./icons/IconUmbrella";
import Alert from "./Alert";
import Temperature from "./Atoms/Temperature";
import {getDate} from "../utils/getDate";

const Card = ({title, icon, value, iconClass}) => {
    return(
        <div className="flex flex-col pb-4 ml-12">
            <div className="text-slate-100 capitalize pb-4 ml-1 drop-shadow-2xl">{title}</div>
            <div className="h-full flex">
                <div className={`${iconClass} self-center`}>{icon}</div>
                <div className="text-2xl self-center">{value}</div>
            </div>
        </div>
    )
}
export default function MainWeather({current, daily, alerts}) {
    const day = getDate(current.dt);

    return (
        <div className=" flex flex-col justify-between p-6 bg-black bg-opacity-25 w-full" >
            <div className="text-right">{`${getDay(current.dt).substring(0, 3)} ${getMonth(current.dt)} ${day.getDate()}`} | {`${day.getHours()}:${day.getMinutes()}`}</div>

            <div>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col">
                        <div className="self-end"><Image src={getIcon(current?.weather)} width="200" height="100" alt=""/></div>
                        <div className="text-9xl self-end"><Temperature temp={current.temp} /></div>
                        <div className="text-4xl text-slate-200 self-end capitalize">{current?.weather[0]?.description}</div>
                        <div className="text-2xl text-slate-300 self-end capitalize">High: {Math.floor(daily[0].temp.max)}° | Low: {Math.floor(daily[0].temp.min)}° </div>
                    </div>


                        <div className="flex mt-12">
                            <Card title="Feels like" value="25°" icon={<IconThermometerHalf/>} iconClass="text-xl"/>
                            <Card title="Humidity" value="60%" icon={<IconWiHumidity />} iconClass="text-3xl" />
                            <Card title="precipitation" value="60%" icon={<IconUmbrella />} iconClass="text-xl p-2" />
                        </div>
                </div>

                {alerts && alerts.map(alert => {
                    return <Alert alert={alert} key={alert.id}/>
                })}

                <hr/>
                8 Day Forecast
                <div className="flex overflow-auto">

                    {daily && daily.map((weather,i)=> {

                        const date = getDate(weather?.dt);
                        const time = `${date.getHours()}:00`;
                        const description = weather?.weather[0]?.main;
                        const icon = getIcon(weather?.weather);

                        return (
                            <WeatherCard key={i} date={weather?.dt} time={time} temp={weather?.temp} description={description} icon={icon}/>
                        )
                    })}
                </div>
            </div>


        </div>

    )
}
