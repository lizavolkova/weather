import IconWiHumidity from "../icons/IconWiHumidity";
import IconUmbrella from "../icons/IconUmbrella";
import Temperature from "./Temperature";
import IconThermometerHalf from "../icons/IconThermometerHalf";
import IconWind from "../icons/IconWind";
import IconSunrise from "../icons/IconSunrise";
import {getTime} from "../../utils/getTime";
import {getDate} from "../../utils/getDate";
import IconSunset from "../icons/IconSunset";
import IconWiMoonrise from "../icons/IconWiMoonrise";
import IconMoonset from "../icons/IconMoonset";
import IconCloud from "../icons/IconCloud";
import IconSun from "../icons/IconSun";

const DailyIconAttribute = ({icon, title, value}) => {
    return (
        <div className="w-1/2 py-2">
            <div className="text-xs items-center flex"><span className="inline-block pr-2 text-sm">{icon}</span>{title}</div>
            <div className="text-slate-200 pl-6">{value}</div>
        </div>
    )
};

export default function ForecastDetailsTable({humidity, wind, feels, pop, timeStamp, clouds, uvi, children}) {
    return (
        <div
            className="flex flex-col rounded-md w-full p-2 border-slate-400 text-sm text-slate-400">
            <div className="p-2 text-slate-200 text-base">{timeStamp}</div>

            {children}

            <div className="flex p-3 flex-wrap">

                {feels >= 0 && <DailyIconAttribute title="Feels like"
                                              value={<Temperature temp={feels}/>}
                                            icon={<IconThermometerHalf/>} />}

                {humidity >=0 && <DailyIconAttribute title="Humidity"
                                                 value={`${humidity}%`}
                                                 icon={<IconWiHumidity/>}/>}

                {pop >= 0 && <DailyIconAttribute title="Chance of Rain"
                                                 value={`${Math.floor(pop * 100)}%`}
                                                 icon={<IconUmbrella/>}/>}

                {uvi >=0 && <DailyIconAttribute title="UV Index"
                                               value={uvi}
                                               icon={<IconSun/>}/>}

                {clouds >= 0 && <DailyIconAttribute title="Cloud Cover"
                                            value={`${clouds}%`}
                                            icon={<IconCloud/>}/>}

                {wind >= 0 && <DailyIconAttribute title="Wind"
                                               value={`${wind}m/s`}
                                               icon={<IconWind/>}/>}



            </div>
        </div>
    )
}