import React, { useState } from 'react';
import Slider from "react-slick";
import {getIcon} from "../utils/getIcon";
import {getDate} from "../utils/getDate";
import CardStyle from "./Atoms/CardStyle";
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
import IconSun from "./icons/IconSun";
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";

const DailyIconAttribute = ({icon, title, value}) => {
    return (
        <div className="w-1/2">
            <div className="text-xs items-center flex"><span className="inline-block pr-2 text-sm">{icon}</span>{title}</div>
            <div className="text-slate-200 pl-6">{value}</div>
        </div>
    )
};

export default function HourlyWeather({children, arr}) {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEl, setSelectedEl] = useState(null);

    const selectElement = (i) => {
        const key = selectedEl === i ? null : i;
        setSelectedEl(key);
        setShowDetails(key != null);
    }

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 4,
        responsive: [

            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 8
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 9
                }
            }
        ]
    };

    const detailsData = arr[selectedEl];

    return (
        <div className="w-full min-w-[200px] p-4">
            <div>HOURLY</div>
            <div className="">
                <Slider {...sliderSettings}>
                {arr.map((weather,i) => {
                    const description = weather.weather[0].description;
                    const icon = getIcon(weather?.weather);
                    const day = getDate(weather.dt);

                    return (
                        <div className="flex flex-col cursor-pointer" key={weather.dt} onClick={() => selectElement(i)}>
                            <CardStyle classes={`w-[100px] flex-col ${selectedEl === i ? 'bg-black bg-opacity-25' : ''}`}>
                                <div className="flex flex-col justify-between items-center">
                                    <div>{getTime(day)}</div>
                                    <div className=" text-slate-400 text-center" style={{fontSize: '0.50rem'}}>{`${getDay(day).substring(0, 3)} ${getMonth(day)} ${day.getDate()}`}</div>
                                    <div><Image src={icon} width="75" height="50" alt=""/></div>
                                    <div className="self-center text-center text-xs text-slate-300 capitalize min-h-[50px]">{description}</div>
                                    <div className="text-3xl "><Temperature temp={weather.temp} /></div>
                                    <div className="text-xs text-slate-300 flex justify-center"><IconUmbrella /><span className="pl-1">{Math.floor(weather.pop*100)}%</span></div>
                                </div>
                            </CardStyle>
                        </div>
                    )
                })}
                </Slider>
            </div>

            {showDetails && <div
                className="flex flex-col border rounded-md w-full p-2 border-slate-400 mt-4">
                <div>{getTime(getDate(detailsData.dt))}</div>
                <div className="border-b flex p-3">
                    <DailyIconAttribute title="Feels like"
                                        value={<Temperature temp={detailsData.feels_like}/>}
                                        icon={<IconThermometerHalf/>}/>
                    <DailyIconAttribute title="Humidity"
                                        value={`${detailsData.humidity}%`}
                                        icon={<IconWiHumidity/>}/>
                    <DailyIconAttribute title={`Precipitation`}
                                        value={`${Math.floor(detailsData.pop * 100)}%`}
                                        icon={<IconUmbrella />}/>
                </div>
                <div className="flex p-3">

                    <DailyIconAttribute title={`Wind ${detailsData.wind_deg}`}
                                        value={detailsData.wind_speed}
                                        icon={<IconWind />}/>
                    <DailyIconAttribute title="UVI"
                                        value={detailsData.uvi}
                                        icon={<IconSun />}/>
                    <DailyIconAttribute title="Cloud cover"
                                        value={`${detailsData.clouds}%`}
                                        icon={<IconSun />}/>
                </div>


            </div>}
        </div>

    )
}

