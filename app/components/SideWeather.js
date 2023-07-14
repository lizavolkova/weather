import Image from 'next/image'
import DailyWeatherCard from "./DailyWeatherCard";
import {getIcon} from "../utils/getIcon";

const Card = ({title, icon, value}) => {
    return(
        <div className="flex">
            <div className="h-full flex justify-center items-center">
                <Image className="max-w-[50%]" src={icon} width="512" height="512" alt=""/>
            </div>
            <div>
                <div className="text-xs">{title}</div>
                <div className="text-4xl">{value}</div>
            </div>

        </div>
    )
}

export default function SideWeather({current, daily, hourly}) {
    return (
        <div className="m-6 flex flex-col justify-between">
            <div className="pb-10">
                <div className="mb-20">New York, NY</div>
                <div className="flex">
                    <Card title="Feels like" value="25°" icon="/icons/thermometer.png"/>
                    <Card title="Humidity" value="60%" icon="/icons/humidity.png"/>
                    <Card title="Percipitaion" value="60%" icon="/icons/drop.png"/>
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
                            const max = weather.temp.max;
                            const min = weather.temp.min;
                            const icon = getIcon(weather?.weather);
                            const temp = weather.temp;
                            const humidity = weather.humidity;
                            const pop = weather.pop;

                            return (
                                <li className="" key={weather.dt}>
                                    <DailyWeatherCard description={description} max={max} min={min} date={weather.dt} icon={icon} temp={temp} humidity={humidity} pop={pop}/>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>

    )
}
