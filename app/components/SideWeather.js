import Image from 'next/image'
import HourlyWeatherCard from "./HourlyWeatherCard";
import {getIcon} from "../utils/getIcon";
import {getTimeWeather} from '../utils/getTimeWeather';
import Temperature from "./Atoms/Temperature";
import HourlyWeatherVertical from "./HourlyWeatherVertical";
import IconThermometerHalf from "./icons/IconThermometerHalf";
import IconWiHumidity from "./icons/IconWiHumidity";
import React from "react";
import IconWind from "./icons/IconWind";
import IconSun from "./icons/IconSun";
import IconBxLeaf from "./icons/IconBxLeaf";
import IconArrowsCollapse from "./icons/IconArrowsCollapse";
import DailyWeather from "./DailyWeather";
import InfoCard from "./Atoms/InfoCard";
import WeatherTable from "./WeatherTable";
import AirQuality from "./AirQuality";
import UVIndex from "./UVIndex";
import FeelLikeTemp from "./FeelLikeTemp";
import RangeBar from "./Atoms/RangeBar";
import IconUmbrella from "./icons/IconUmbrella";
import IconCloud from "./icons/IconCloud";
import CelestialDoughnutChart from "./Tables/CelestialDoughnutChart";
import IconSunset from "./icons/IconSunset";
import {getTime} from "../utils/getTime";
import CelestialRiseCard from "./CelestialRiseCard";
import SunriseCard from "./SunriseCard";
import MoonriseCard from "./MoonriseCard";
import PlanetsVisible from "./PlanetsVisible";
import IconPlanetOutline from "./icons/IconPlanetOutline";
import IconWiMoonrise from "./icons/IconWiMoonrise";
import IconMoonset from "./icons/IconMoonset";
import WeatherToday from "./WeatherToday";

const Card = ({title, icon, value, units, iconClass, range=[]}) => {
    let color;
    switch (true) {
        case (parseInt(value) <= range[1]):
            color = 'text-lime-300';
            break;
        case (parseInt(value) >= range[2]):
            color = 'text-red-300';
            break;
        case (parseInt(value) > range[1] && parseInt(value) < range[2]):
            color = 'text-yellow-300';
            break;
        default:
            color = 'text-white';
            break;
    }

    return(
        <div className="flex flex-col pb-4 text-3xl ">
            <div className="text-slate-100 capitalize pb-4 ml-1 drop-shadow-2xl text-xs text-slate-300">{title}</div>
            <div className="h-full flex">
                <div className={`${iconClass} self-center text-lg pr-1 ${color}`}>{icon}</div>
                <div className={`text-md self-center ${color}`}>{value}{units}</div>
            </div>
        </div>
    )
};

const getHumidityColor = (humidity) => {
    switch(true) {
        case humidity <= 20:
            return 'bg-yellow-500'
        case humidity > 20 && humidity <=60:
            return 'bg-green-600'
        case humidity > 60:
            return 'bg-red-600'

    }
}

const SimpleData = ({children}) => {
    return (
        <div className="flex flex-col w-full">
            {children}
        </div>
    )
}

export default function SideWeather({current, airPollution, hourly, daily, noaaData, bgColor}) {
    const cardClass = `flex-col flex-1 basis-1/3`;

    return (
        <>
            <div className="p-2 md:p-8 flex flex-col justify-between w-full">
                <div className="flex flex-col md:pr-32">

                    {daily[0].day && <div>
                        <InfoCard classes={cardClass}>
                            <WeatherToday daily={daily} />
                        </InfoCard>
                    </div>}

                    <div className="flex flex-wrap md:justify-between w-full " >
                        <InfoCard title="Feels like" classes={cardClass} icon={<IconThermometerHalf />}>
                            <SimpleData>
                                <div className="mb-4 text-4xl md:text-5xl"><Temperature temp={current.feels_like} /></div>
                                <FeelLikeTemp temp={current.feels_like} />
                            </SimpleData>
                        </InfoCard>

                        <InfoCard title="Humidity" classes={cardClass} icon={<IconWiHumidity />}>
                            <SimpleData>
                                <div className="mb-4 text-4xl md:text-5xl">{current.humidity}%</div>
                                <RangeBar percent={current.humidity} color={getHumidityColor(current.humidity)}/>
                            </SimpleData>
                        </InfoCard>


                        {airPollution.status === 'success' && <InfoCard title="Air Quality Index" classes={cardClass} icon={<IconBxLeaf />} footer="Learn more at:" footerLogo="/icons/ic-logo-iq-air-blue.svg" footerUrl="https://www.iqair.com/us/usa/new-york/ossining" >
                             <AirQuality air={airPollution.data}/>
                        </InfoCard>}

                        {current.uvi !== 0 && <InfoCard title="UV Index" classes={cardClass}  icon={<IconSun />}>
                            <UVIndex uvi={current.uvi}/>
                        </InfoCard>}

                        <InfoCard title="Chance of Rain" classes={cardClass} icon={<IconUmbrella />} footer="See map:" footerLogo="/icons/zoom-earth-logo.png" footerUrl="https://zoom.earth/maps/precipitation/#view=41.18856,-73.83745,10z/date=2023-07-20,03:50,-4/model=icon">
                            <SimpleData>
                                <div className="mb-4 text-4xl md:text-5xl">{Math.floor(current.pop * 100)}%</div>
                                <RangeBar percent={current.pop *100} />
                            </SimpleData>

                        </InfoCard>

                        <InfoCard title="Cloud Cover" classes={cardClass} icon={<IconCloud />}>
                            <SimpleData>
                                <div className="mb-4 text-4xl md:text-5xl">{Math.floor(current.clouds)}%</div>
                                <RangeBar percent={current.clouds} />
                            </SimpleData>

                        </InfoCard>


                        <InfoCard title="Wind" classes={cardClass} icon={<IconWind />}>
                            <Card value={`${current.wind_speed}m/s`}  iconClass="text-3xl" />
                        </InfoCard>

                        <InfoCard title="Pressure" classes={cardClass} icon={<IconArrowsCollapse />}>
                            <Card value={`${current.pressure}hPa`}  iconClass="text-3xl" />
                        </InfoCard>

                    </div>

                    <WeatherTable daily={daily} hourly={hourly} current={current} noaaData={noaaData}/>

                    <div className="flex flex-wrap md:justify-between w-full " >
                        <InfoCard title="Sun" classes={cardClass} icon={<IconSunset />}  >
                            <div className="flex flex-col w-full">
                                {/*<div>Today has {Math.floor(solarData.day_length/ 3600)} hours of daylight</div>*/}
                                <SunriseCard />
                            </div>
                        </InfoCard>

                        <InfoCard title="Moon" classes={cardClass} icon={<IconMoonset />}  >
                            <MoonriseCard />
                        </InfoCard>

                        <InfoCard title="Visible Planets" classes={cardClass} icon={<IconPlanetOutline />}  >
                            <PlanetsVisible />
                        </InfoCard>
                    </div>
                    {/*<HourlyWeatherVertical hourly={hourly}/>*/}

                </div>
            </div>
        </>

    )
}
