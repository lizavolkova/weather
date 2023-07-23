import queryString from "query-string";
import tomorrowDailyJson from "./tomorrowDaily.json";
import tomorrowCurrent from "./tomorrowCurrent.json";
import {Observer, SearchRiseSet} from "astronomy-engine";
import weatherCodes from "./tomorrow-weather-codes.json";
import makeEnumerableCopy from './utils/makeEnum';
import isNight from './utils/isNight';
import getRiseSet from "./utils/getRiseSet";

const fetchData = async (lat, long, real) => {
    if (real == 'true') {
        console.log('Fetching real Tomorrow.io data')
        try {
            const apikey = process.env.TOMORROW_API_KEY;
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


            console.log('Got daily and hourly data from Tomorrow.io')
            const dailyHourly = await weatherDailyForecastRes.json();

            if (dailyHourly.code) {
                const { code, type } = dailyHourly;

                throw new Error(JSON.stringify(dailyHourly));
            }


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

            console.log('Got current data from Tomorrow.io')
            const current = await weatherCurrentForecastRes.json();

            if (current.code) {
                throw new Error({error: makeEnumerableCopy(current)});
            }


            return {
                dailyHourly,
                current
            }


        } catch (error) {
            const { code, type } = error;
            console.error('THROWING ERROR FROM TOMORROW CALL',error);
            throw new Error(makeEnumerableCopy(error));
        }
    } else {
        return {
            dailyHourly: tomorrowDailyJson,
            current: tomorrowCurrent
        }
    }
}
const getImage = (number) => {
    const code = parseInt(number);
    const clearCodes = [1000, 1100];
    const cloudsPart = [1101];
    const cloudy = [1102, 1001];
    const mist = [2000, 2100];
    const drizzle = [4000, 4200];
    const rain = [4001, 4201];
    const thunderstorm = [8000];
    const snow = [5000, 5001, 5100, 5101]

    switch(true) {
        case clearCodes.indexOf(code) >= 0:
            return 'clear'
        case cloudsPart.indexOf(code) >= 0:
            return 'clouds-part'
        case cloudy.indexOf(code) >= 0:
            return 'clouds'
        case mist.indexOf(code) >= 0:
            return 'mist'
        case drizzle.indexOf(code) >= 0:
            return 'drizzle'
        case rain.indexOf(code) >= 0:
            return 'rain'
        case thunderstorm.indexOf(code) >= 0:
            return 'thunderstorm'
        case snow.indexOf(code) >= 0:
            return 'snow'
    }
}

const getIcon = (iconCode, description) => {
    return `/icons/tomorrow/${iconCode}_${description.toLowerCase().replace(',', '').replace(/ /g,"_")}_large@2x.png`;
}

const parseData = async (tomorrowWeather, lat, long) => {
    const tomorrowHourly = tomorrowWeather.dailyHourly.timelines.hourly.slice(0,24);

    // Get Today's date
    const date = new Date()
    const dt = Math.floor(date.getTime() / 1000);


    // Get sunrise/set time

    const { weatherCodeFullDay, weatherCodeNight } = weatherCodes;

    const dateCurrent = new Date(tomorrowWeather.current.data.time)
    const dateCurrentUnix = Math.floor(dateCurrent.getTime() / 1000);
    const {rise, set } = getRiseSet('Sun', lat, long, dateCurrent);

    const daily =  tomorrowWeather.dailyHourly.timelines.daily.map(weather => {
        const { values } = weather;
        const date = new Date(weather.time);
        const dt = Math.floor(date.getTime() / 1000);

        const moonriseDate = new Date (values.moonriseTime);
        const moonsetDate = new Date (values.moonsetTime);

        const moonrise = Math.floor(moonriseDate.getTime() / 1000);
        const moonset = Math.floor(moonsetDate.getTime() / 1000);

        const iconCode = values.weatherCodeMax + '0';
        const description = weatherCodeFullDay[values.weatherCodeMax];

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
            icon: getIcon(iconCode, description),
            isNight: isNight(date, rise, set),
            uvi: values.uvIndexMax,
            weather: [
                {
                    id: 123,
                    main: 'rain',
                    icon: '10d',
                    description,
                    iconCode
                }
            ],
            moonrise,
            moonset,
            moon_phase: ''
        }
    })


    const { values } = tomorrowWeather.current.data;

    const iconCode = isNight(date, rise, set) ? values.weatherCode + '1' : values.weatherCode + '0';
    const description = isNight(date, rise, set) ? weatherCodeNight[values.weatherCode + '1'] : weatherCodeFullDay[values.weatherCode];

    const current = {
        dt: dateCurrentUnix,
        feels_like: values.temperatureApparent,
        temp: values.temperature,
        uvi: values.uvIndex,
        pop: values.precipitationProbability / 100,
        clouds: values.cloudCover,
        humidity: values.humidity,
        pressure: values.pressureSurfaceLevel,
        wind_speed: values.windSpeed,
        isNight: isNight(date, rise, set),
        image: getImage(values.weatherCode),
        icon: getIcon(iconCode, description),
        weather: [
            {
                description,
                icon: '10d',
                id: tomorrowCurrent.id,
                main: 'clouds',
                iconCode
            }
        ],
    };

    const hourly = tomorrowHourly.map(weather => {
        const date = new Date(weather.startTime)
        const timestamp = Math.floor(date.getTime() / 1000);
        const iconCode = weather.values.weatherCode + '0';
        const description = weatherCodeFullDay[weather.values.weatherCode];

        return {
            dt: timestamp,
            feels_like: weather.values.temperatureApparent,
            temp: weather.values.temperature,
            uvi:weather.values.uvIndex,
            pop: weather.values.precipitationProbability / 100,
            clouds: weather.values.cloudCover,
            humidity: weather.values.humidity,
            isNight: isNight(date, rise, set),
            icon: getIcon(iconCode, description),
            weather: [
                {
                    description,
                    icon: '10d',
                    id: weather.id,
                    main: weather.main,
                    iconCode
                }
            ],
        }
    })

    return ({hourly, daily, current})
}

export const getTomorrowData = async (lat, long, real) => {

    console.log('Fetching Tomorrow.io data...')
    const tomorrowWeather = await fetchData(lat, long, real);
    console.log('Got Tomorrow.io data!')

    console.log('TOMORROW WEATHER RECEIVED:', tomorrowWeather);
    console.log('Parsing tomorrow data')
    return await parseData(tomorrowWeather, lat, long)
}