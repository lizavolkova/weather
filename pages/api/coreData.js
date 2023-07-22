import queryString from 'query-string';
import tomorrowDailyJson from './tomorrowDaily.json';
import tomorrowCurrent from './tomorrowCurrent.json';
const lat = 41.18856;
const long = -73.83745;


const fetchOpenWeatherData = async (real) => {
    if(real == 'true' ) {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
        return await res.json();
    } else {
        const data = await fetch("http://localhost:3000/api/data")
        return await data.json();
    }
}

const fetchAirDate = async (real) => {
    if (real == 'true') {
        const air = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.NEXT_PUBLIC_AIR_VISUAL_API_KEY}`);
        return await air.json();

    } else {
        const air = await fetch('http://localhost:3000/api/pollution');
        return await air.json();
    }
}


const fetchTomorrowWeather = async(real) => {
    if (real == 'true') {
        try {
            const apikey = process.env.NEXT_PUBLIC_TOMORROW_API_KEY;
            const location = [lat, long];
            const units = "metric";

            const timesteps = ["daily", "1h"];
            const weatherDailyForecastParams =  queryString.stringify({
                apikey,
                location,
                units,
                timesteps
            }, {arrayFormat: "comma"});
            const getDailyWeatherForecastUrl = "https://api.tomorrow.io/v4/weather/forecast";
            const options = {method: 'GET', headers: {accept: 'application/json'}};
            const weatherDailyForecastRes = await fetch(
                `${getDailyWeatherForecastUrl}?${weatherDailyForecastParams}`,
                options
            );
            const dailyHourly = await weatherDailyForecastRes.json();

            // GET CURRENT WEATHER
            const weatherCurrentForecastParams =  queryString.stringify({
                apikey,
                location,
                units
            }, {arrayFormat: "comma"});
            const getCurrentWeatherForecastUrl = "https://api.tomorrow.io/v4/weather/realtime";
            const weatherCurrentForecastRes = await fetch(
                `${getCurrentWeatherForecastUrl}?${weatherCurrentForecastParams}`,
                options
            );
            const current = await weatherCurrentForecastRes.json();

            return {
                dailyHourly,
                current
            }


        } catch (err) {
            console.error("error:" + err);
            return err;
        }
    } else {
        return {
            dailyHourly: tomorrowDailyJson,
            current: tomorrowCurrent
        }
    }
}


export default async function handler(req, res) {
    try {
        const fetchRealData = req.query.real;
        // const dataJson = await fetchOpenWeatherData(fetchRealData);

        const air = await fetchAirDate(fetchRealData);
        const tomorrowWeather = await fetchTomorrowWeather(fetchRealData);

        const tomorrowHourly = tomorrowWeather.dailyHourly.timelines.hourly.slice(0,24);

        const date = new Date()
        const dt = Math.floor(date.getTime() / 1000);

        const daily =  tomorrowWeather.dailyHourly.timelines.daily.map(weather => {
            const { values } = weather;
            const date = new Date(weather.time);
            const dt = Math.floor(date.getTime() / 1000);

            const moonriseDate = new Date (values.moonriseTime);
            const moonsetDate = new Date (values.moonsetTime);

            const moonrise = Math.floor(moonriseDate.getTime() / 1000);
            const moonset = Math.floor(moonsetDate.getTime() / 1000);


            return {
                dt,
                cloud: values.cloudCoverAvg,
                feels_like: {
                    day: values.temperatureApparentMax,
                    night: values.temperatureApparentMin,
                    eve: values.temperatureApparentMin,
                    morn: values.temperatureApparentMin,
                },
                humidity: values.humidityAvg,
                pop: values.precipitationProbabilityAvg,
                pressure: values.pressureSurfaceLevelAvg,
                temp: {
                    day: '',
                    min: values.temperatureMin,
                    max: values.temperatureMax,
                    night: '',
                    eve: '',
                    morn: '',
                },
                uvi: values.uvIndexMax,
                weather: [
                    {
                        id: 123,
                        main: 'rain',
                        icon: '10d',
                        description: 'long description'
                    }
                ],
                moonrise,
                moonset,
                moon_phase: ''
            }
        })


        const { values } = tomorrowWeather.current.data;
        const current = {
            dt: dt,
            feels_like: values.temperatureApparent,
            temp: values.temperature,
            uvi: values.uvIndex,
            pop: values.precipitationProbability / 100,
            clouds: values.cloudCover,
            humidity: values.humidity,
            pressure: values.pressureSurfaceLevel,
            wind_speed: values.windSpeed,
            weather: [
                {
                    description: 'current condition description',
                    icon: '10d',
                    id: tomorrowCurrent.id,
                    main: 'clouds'
                }
            ],
        };

        const hourly = tomorrowHourly.map(weather => {
            const date = new Date(weather.startTime)
            const timestamp = Math.floor(date.getTime() / 1000);
            return {
                dt: timestamp,
                feels_like: weather.temperatureApparent,
                temp: weather.values.temperature,
                uvi:weather.values.uvIndex,
                pop: weather.values.precipitationProbability / 100,
                clouds: weather.values.cloudCover,
                humidity: weather.values.humidity,
                weather: [
                    {
                        description: weather.description,
                        icon: '10d',
                        id: weather.id,
                        main: weather.main
                    }
                ],
            }
        })


        // PARSE OLD DATA
        //const hourlyForecast = dataJson.hourly;
        //const daily = dataJson.daily;
        // const current = dataJson.current;

        res.status(200).json({air, hourly, daily, current})
    } catch(err) {
        res.status(500).json({
        error: err
        })
    }

}
