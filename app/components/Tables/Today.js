import InfoCard from "../Atoms/InfoCard";
import {getTimeWeather} from "../../utils/getTimeWeather";
import Image from "next/image";
import Temperature from "../Atoms/Temperature";

const TimeCard = ({time, temp, icon, feel}) => {
    return (
        <div className="text-center md:text-left flex justify-between">
            <div>
                <div className="flex">
                    <div className="self-center"><Image src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width="80" height="80" alt=""/></div>
                    <div className="text-2xl self-center"><Temperature temp={temp} /></div>
                </div>
                <div className="text-xs text-slate-200">Feels like <Temperature temp={feel}/></div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default function Today({current, hourly}) {
    const test = getTimeWeather(current, hourly);
    const cardClass = `flex-col flex-1 basis-1/3 `

    return (
        <div className="flex justify-between md:mb-24 ">
            {test && test.map(weather => {
                return (
                    <InfoCard title={weather.time} classes={cardClass} key={weather.time}>
                        <TimeCard temp={weather.weather.temp} feel={weather.weather.feels_like} icon={weather.weather.weather[0].icon} />
                    </InfoCard>
                )
            })}
        </div>
    )
}