import queryString from 'query-string';
import tomorrowDailyJson from './tomorrowDaily.json';
import tomorrowCurrent from './tomorrowCurrent.json';
import weatherCodes from './tomorrow-weather-codes.json';
import { SearchRiseSet, Observer } from 'astronomy-engine';
const lat = 41.18856;
const long = -73.83745;


const fetchOpenWeatherData = async (real) => {
    if(real == 'true' ) {
        console.log('Fetching real weather data')
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${process.env.API_KEY}`)
            console.log('Real weather data fetched succesfully')
            return await res.json();
        } catch (err) {
            console.error('Error fetching real weather data: ', err)
            return err;
        }

    } else {
        const data = await fetch("http://localhost:3000/api/data")
        return await data.json();
    }
}

const fetchAirDate = async (real) => {
    if (real == 'true') {
        console.log('Fetching real air data')
        try {
            const air = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.AIR_VISUAL_API_KEY}`);
            console.log('Real air data fetched succesfully')
            return await air.json();
        }catch (err) {
            console.error('Error fetching real air data: ', err)
            return err;
        }


    } else {
        const air = await fetch('http://localhost:3000/api/pollution');
        return await air.json();
    }
}


const fetchTomorrowWeather = async(real) => {
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

const isNight = (date, rise, set) => {
    return date.getHours() > set.getHours() || date.getHours() < rise.getHours()
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

export default async function handler(req, res) {
    try {
        console.log('Begin fetch of data...')
        const fetchRealData = req.query.real;
       // const dataJson = await fetchOpenWeatherData(fetchRealData);
        console.log('Got weather data!')

        console.log('Fething Air data...')
        const air = await fetchAirDate(fetchRealData);
        console.log('Got air data!')
        console.log('Fetching Tomorrow.io data...')
        const tomorrowWeather = await fetchTomorrowWeather(fetchRealData);
        console.log('Got Tomrrow.io data!')

        console.log('TOMORROW WEATHER RECEIVED:', tomorrowWeather);

        const tomorrowHourly = tomorrowWeather.dailyHourly.timelines.hourly.slice(0,24);

        // Get Today's date
        const date = new Date()
        const dt = Math.floor(date.getTime() / 1000);

        // Get sunrise/set time
        const observer = new Observer(lat, long, 1);
        const set  = new Date(SearchRiseSet('Sun',  observer, -1, date, 300).date);
        const rise  = new Date(SearchRiseSet('Sun',  observer, +1, date, 300).date);
        const { weatherCodeFullDay, weatherCodeNight } = weatherCodes;

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
                isNight: isNight(date, rise, set),
                uvi: values.uvIndexMax,
                weather: [
                    {
                        id: 123,
                        main: 'rain',
                        icon: '10d',
                        description: weatherCodeFullDay[values.weatherCodeMax],
                        iconCode: values.weatherCodeMax + '0'
                    }
                ],
                moonrise,
                moonset,
                moon_phase: ''
            }
        })


        const { values } = tomorrowWeather.current.data;

        const dateCurrent = new Date(tomorrowWeather.current.data.time)
        const dateCurrentUnix = Math.floor(dateCurrent.getTime() / 1000);

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
            weather: [
                {
                    description: isNight(date, rise, set) ? weatherCodeNight[values.weatherCode + '1'] : weatherCodeFullDay[values.weatherCode],
                    icon: '10d',
                    id: tomorrowCurrent.id,
                    main: 'clouds',
                    iconCode: isNight(date, rise, set) ? values.weatherCode + '1' : values.weatherCode + '0'
                }
            ],
        };

        const hourly = tomorrowHourly.map(weather => {
            const date = new Date(weather.startTime)
            const timestamp = Math.floor(date.getTime() / 1000);

            return {
                dt: timestamp,
                feels_like: weather.values.temperatureApparent,
                temp: weather.values.temperature,
                uvi:weather.values.uvIndex,
                pop: weather.values.precipitationProbability / 100,
                clouds: weather.values.cloudCover,
                humidity: weather.values.humidity,
                isNight: isNight(date, rise, set),
                weather: [
                    {
                        description: weatherCodeFullDay[weather.values.weatherCode],
                        icon: '10d',
                        id: weather.id,
                        main: weather.main,
                        iconCode: weather.values.weatherCode + '0'
                    }
                ],
            }
        })


        // PARSE OLD DATA
        // const hourly = dataJson.hourly;
        // const daily = dataJson.daily;
        // const current = dataJson.current;

        res.status(200).json({air, hourly, daily, current})
    } catch(err) {
        console.error({serverError: makeEnumerableCopy(err)})
        res.status(500).json({serverError: makeEnumerableCopy(err)})
    }

}

function makeEnumerableCopy(err) {
    let descriptor = Object.getOwnPropertyDescriptors(err);
    // set all properties in the descriptor to be enumerable
    for (let key of Object.keys(descriptor)) {
        descriptor[key].enumerable = true;
    }
    return Object.defineProperties({}, descriptor);
}
