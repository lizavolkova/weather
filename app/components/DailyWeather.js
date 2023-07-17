import {getDate} from "../utils/getDate";
import {getIcon} from "../utils/getIcon";
import WeatherCard from "./WeatherCard";
import React, {useState} from "react";
import CardStyle from "./Atoms/CardStyle";
import Temperature from "./Atoms/Temperature";
import IconWiHumidity from "./icons/IconWiHumidity";
import IconUmbrella from "./icons/IconUmbrella";
import IconThermometerHalf from "./icons/IconThermometerHalf";
import IconWind from "./icons/IconWind";
import IconSunrise from "./icons/IconSunrise";
import {getTime} from "../utils/getTime";
import IconSunset from "./icons/IconSunset";
import IconWiMoonrise from "./icons/IconWiMoonrise";
import IconMoonset from "./icons/IconMoonset";
import Slider from "react-slick";


const DailyIconAttribute = ({icon, title, value}) => {
    return (
        <div className="w-1/2">
            <div className="text-xs items-center flex"><span className="inline-block pr-2 text-sm">{icon}</span>{title}</div>
            <div className="text-slate-200 pl-6">{value}</div>
        </div>
    )
};


export default function DailyWeather({daily, noaaData}) {
    const [detailedForecast, setDetailedForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2
    };

    const definaNoaaPairs = (i) => {
        if (selectedDay == i) {
            setSelectedDay(null)
        } else {

            const noaaPairs = noaaData.flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)]);
            setDetailedForecast(noaaPairs[i])
            setSelectedDay(i);
        }
    }

    return(
        <div className="p-2 ">
            <div className="p-2 uppercase ml-1">8 Day Forecast</div>
            <div className="h-[200px] w-full">
                <Slider {...sliderSettings}>
                {daily && daily.map((weather,i)=> {

                    const date = getDate(weather?.dt);
                    const time = `${date.getHours()}:00`;
                    const description = weather?.weather[0]?.main;
                    const icon = getIcon(weather?.weather);

                    return (
                        <div key={i} onClick={() => definaNoaaPairs(i)}>
                            <WeatherCard date={weather?.dt} time={time} temp={weather?.temp} description={description} icon={icon} />
                        </div>

                    )
                })}
                </Slider>
            </div>

            {selectedDay != null &&
            <CardStyle classes="text-left">
                {detailedForecast?.map((weather,t) => {
                    const todayWeather = daily[selectedDay];
                    const timeOfDay = weather.isDayTime ? 'day' : 'night';
                    const precipitation = weather.probabilityOfPrecipitation?.value ? weather.probabilityOfPrecipitation?.value : todayWeather?.pop * 100;

                    return (
                        <div className="w-1/2 p-4 flex flex-col justify-between" key={weather.number}>

                            {weather.number && <div className="flex flex-col ">
                                <div className="text-slate-400">{weather.name}</div>
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <div className="text-3xl"><Temperature temp={weather.temperature} /></div>
                                        <img className="mx-auto" src="http://localhost:3000/_next/image?url=http%3A%2F%2Fopenweathermap.org%2Fimg%2Fwn%2F10d%402x.png&w=640&q=75" width="50" height="50" alt=""/>
                                    </div>
                                </div>
                                <div className="pb-8 text-sm pt-6">
                                    {weather.detailedForecast}
                                </div>
                            </div>}


                            {weather.number && <div
                                className="flex flex-col border rounded-md w-full p-2 border-slate-400 text-sm text-slate-400">
                                <div className="border-b flex p-3">
                                    <DailyIconAttribute title="Humidity"
                                                        value={`${weather.relativeHumidity?.value}%`}
                                                        icon={<IconWiHumidity/>}/>
                                    <DailyIconAttribute title={`Precipitation`}
                                                        value={`${precipitation}%`}
                                                        icon={<IconUmbrella />}/>
                                </div>
                                <div className="border-b flex p-3">
                                    <DailyIconAttribute title="Feels like"
                                                        value={<Temperature temp={todayWeather.feels_like[timeOfDay]}/>}
                                                        icon={<IconThermometerHalf/>}/>
                                    <DailyIconAttribute title={`Wind ${weather.windDirection}`}
                                                        value={weather.windSpeed}
                                                        icon={<IconWind />}/>
                                </div>
                                {weather.isDaytime === true &&
                                <div className="flex  m-3">
                                    <DailyIconAttribute title="Sunrise"
                                                        icon={<IconSunrise/>}
                                                        value={getTime(getDate(todayWeather.sunrise))}/>
                                    <DailyIconAttribute title="Sunset"
                                                        icon={<IconSunset />}
                                                        value={getTime(getDate(todayWeather.sunset))}/>
                                </div>}
                                {weather.isDaytime === false &&
                                <div className="flex  m-3">
                                    <DailyIconAttribute title="Moonrise"
                                                        icon={<IconWiMoonrise/>}
                                                        value={getTime(getDate(todayWeather.moonrise))}/>
                                    <DailyIconAttribute title="Moonset"
                                                        icon={<IconMoonset/>}
                                                        value={getTime(getDate(todayWeather.moonset))}/>
                                </div>
                                }

                            </div>
                            }
                        </div>
                    )
                })}

            </CardStyle>
            }

        </div>
    )
}