import Image from 'next/image'
import DailyWeatherCard from "./DailyWeatherCard";
import {getIcon} from "../utils/getIcon";
import CardStyle from "./Atoms/CardStyle";
import {getTimeWeather} from '../utils/getTimeWeather';

const TimeCard = ({time, temp, icon, feel}) => {

    return (
        <div className="text-center">
            <span className="text-slate-100 capitalize">{time}</span>
            <div className="flex">
                <div className="self-center"><Image src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width="80" height="80" alt=""/></div>
                <div className="text-2xl self-center">{Math.floor(temp)}°</div>
            </div>
            <div className="text-xs text-slate-200">Feels like {Math.floor(feel)}°</div>
        </div>
    )
}

export default function SideWeather({current, daily, hourly}) {
    const today = daily[0];
    const test = getTimeWeather(current, hourly);


    return (
        <div className="m-6 flex flex-col justify-between">
            <div className="pb-10">
                <div className="mb-20">Ossining, NY</div>
                <div className="flex justify-between">
                    {test && test.map(weather => {
                        return (
                            <div className="flex flex-col" key={weather.time}>
                                <TimeCard time={weather.time} temp={weather.weather.temp} feel={weather.weather.feels_like} icon={weather.weather.weather[0].icon} />
                            </div>
                        )
                    })}

                </div>
            </div>

            <hr/>

            <div className="flex">
                <div className="w-1/3">Hourly</div>

            </div>
            <div className="overflow-y-scroll max-h-[38rem]">
                <ul>
                    {
                        hourly.map(weather => {
                            const description = weather.weather[0].description;
                            const icon = getIcon(weather?.weather);

                            return (
                                <li className="" key={weather.dt}>
                                    <DailyWeatherCard description={description} date={weather.dt} icon={icon} temp={weather.temp} humidity={weather.humidity} pop={weather.pop} feel={weather.feels_like}/>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>

    )
}
