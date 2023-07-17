import React, { useState, useEffect } from 'react';
import {getIcon} from "../utils/getIcon";
import HourlyWeatherCard from "./HourlyWeatherCard";
import CardStyle from "./Atoms/CardStyle";
import {getDate} from "../utils/getDate";
import {getTime} from "../utils/getTime";
import Image from "next/image";
import WeatherDescription from "./Atoms/WeatherDescription";
import Temperature from "./Atoms/Temperature";
import IconWiHumidity from "./icons/IconWiHumidity";
import IconUmbrella from "./icons/IconUmbrella";
import IconThermometerHalf from "./icons/IconThermometerHalf";
import IconWind from "./icons/IconWind";
import IconSunrise from "./icons/IconSunrise";
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

export default function HourlyWeatherUpdated({hourly}) {
    const [hourData, setHourData] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3
    };

    const updateDetails = (i) => {
        if (selectedDay == i) {
            setSelectedDay(null)
            setHourData(false)
        } else {
            setSelectedDay(i);
            setHourData(hourly[i])
        }
    }

    return (
        <div>

            <div className="w-full">
                <div className="p-2 uppercase ml-1">Hourly</div>

                <div className="h-[200px]">
                    <Slider {...sliderSettings}>
                    {
                        hourly.map((weather, i) => {
                            const description = weather.weather[0].description;
                            const icon = getIcon(weather?.weather);
                            const day = getDate(weather.dt);

                            return (
                                <div className="flex flex-col" key={weather.dt} onClick={() => updateDetails(i)}>
                                    <CardStyle classes="w-[150px] flex-col ">
                                        <div className="flex flex-col justify-between">
                                            <div>{getTime(day)}</div>
                                            <div><Image src={icon} width="75" height="50" alt=""/></div>
                                            <div className="self-center text-center text-xs"><WeatherDescription text={description}/></div>
                                            <div className="flex text-left text-3xl self-center pr-2 md:pr-8 text-center"><Temperature temp={weather.temp} /></div>
                                        </div>
                                    </CardStyle>
                                </div>
                            )
                        })
                    }
                    </Slider>
                </div>
            </div>

            {/*{selectedDay != null && <CardStyle classes="w-[500px] flex-col">*/}
            {/*    {getTime(getDate(hourData.dt))}*/}
            {/*        <div className="border-b flex p-3">*/}
            {/*            <DailyIconAttribute title="Feels like"*/}
            {/*                                value={<Temperature temp={hourData.feels_like}/>}*/}
            {/*                                icon={<IconThermometerHalf/>}/>*/}
            {/*            <DailyIconAttribute title="Humidity"*/}
            {/*                                value={`${hourData.humidity}%`}*/}
            {/*                                icon={<IconWiHumidity/>}/>*/}
            {/*            <DailyIconAttribute title={`Precipitation`}*/}
            {/*                                value={`${hourData.pop * 100}%`}*/}
            {/*                                icon={<IconUmbrella />}/>*/}
            {/*        </div>*/}
            {/*        <div className="border-b flex p-3">*/}

            {/*            <DailyIconAttribute title={`Wind ${hourData.wind_deg}`}*/}
            {/*                                value={hourData.wind_speed}*/}
            {/*                                icon={<IconWind />}/>*/}
            {/*            <DailyIconAttribute title={`UV Index`}*/}
            {/*                                value={hourData.uvi}*/}
            {/*                                icon={<IconWind />}/>*/}
            {/*            <DailyIconAttribute title={`Cloud cover`}*/}
            {/*                                value={`${hourData.clouds}%`}*/}
            {/*                                icon={<IconWind />}/>*/}
            {/*        </div>*/}
            {/*        /!*{weather.isDaytime === true &&*!/*/}
            {/*        /!*<div className="flex  m-3">*!/*/}
            {/*        /!*    <DailyIconAttribute title="Sunrise"*!/*/}
            {/*        /!*                        icon={<IconSunrise/>}*!/*/}
            {/*        /!*                        value={getTime(getDate(todayWeather.sunrise))}/>*!/*/}
            {/*        /!*    <DailyIconAttribute title="Sunset"*!/*/}
            {/*        /!*                        icon={<IconSunset />}*!/*/}
            {/*        /!*                        value={getTime(getDate(todayWeather.sunset))}/>*!/*/}
            {/*        /!*</div>}*!/*/}
            {/*        /!*{weather.isDaytime === false &&*!/*/}
            {/*        /!*<div className="flex  m-3">*!/*/}
            {/*        /!*    <DailyIconAttribute title="Moonrise"*!/*/}
            {/*        /!*                        icon={<IconWiMoonrise/>}*!/*/}
            {/*        /!*                        value={getTime(getDate(todayWeather.moonrise))}/>*!/*/}
            {/*        /!*    <DailyIconAttribute title="Moonset"*!/*/}
            {/*        /!*                        icon={<IconMoonset/>}*!/*/}
            {/*        /!*                        value={getTime(getDate(todayWeather.moonset))}/>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*        /!*}*!/*/}


            {/*</CardStyle>}*/}
        </div>
    )
}