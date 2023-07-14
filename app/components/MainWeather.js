import {getImage} from "../utils/backgroundPhotos";
import {getIcon} from "../utils/getIcon";
import Hourly from "./Hourly";
import WeatherCard from "./WeatherCard";
const weatherID = 800;

export default function MainWeather({current, hourly, daily, alerts}) {

    const today = daily[0];

    return (
        <div className="h-[calc(100vh-400px)] flex flex-col justify-between p-6" >
            <div className="text-right">July 13, 2023 | 13:45</div>

            <div>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col">
                        <div className="self-end"><img src={getIcon(current?.weather)} width="100" height="100"/></div>
                        <div className="text-9xl self-end">{Math.floor(current?.temp)}°</div>
                        <div className="text-4xl self-end">{current?.weather[0]?.main}</div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col">
                            <WeatherCard time="morning" temp={today?.temp?.morn}/>
                        </div>
                        <div className="flex flex-col">
                            <WeatherCard time="afternoon" temp={today?.temp?.day}/>
                        </div>
                        <div className="flex flex-col">
                            <WeatherCard time="evening" temp={today?.temp?.eve}/>
                        </div>
                    </div>


                </div>

                {alerts && <div className="bg-yellow-600 m-2 text-center rounded-md">Alert</div>}

                <hr/>
                <div className="flex">
                    {hourly && hourly.map((weather,i)=> {
                        const date = new Date(weather?.dt * 1000);
                        const time = `${date.getHours()}:00`;
                        const description = weather?.weather[0]?.main;
                        const icon = getIcon(weather?.weather);

                        return (
                            <div key={i}>
                                {i < 6 ?
                                    <div >
                                        <WeatherCard time={time} temp={weather?.temp} description={description} icon={icon}/>
                                    </div>
                                :
                                null}
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>

    )
}
