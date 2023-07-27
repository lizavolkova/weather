import queryString from "query-string";
import azureJson from './data/azuerData.json';
import tomorrowCurrent from "./data/tomorrowCurrent.json";
import {Observer, SearchRiseSet} from "astronomy-engine";
import weatherCodes from "./data/tomorrow-weather-codes.json";
import makeEnumerableCopy from './utils/makeEnum';
import isNight from './utils/isNight';
import getRiseSet from "./utils/getRiseSet";
import {JsConfigPathsPlugin} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";

const icons = [
    {
        id: 1,
        name: 'sunny',
        icon: 23
    },
    {
        id: 2,
        name: 'mostly sunny',
        icon: 37
    },
    {
        id: 3,
        name: 'partly sunny',
        icon: 22
    },
    {
        id: 4,
        name: 'intermit clouds',
        icon: 22
    },
    {
        id: 5,
        name: 'hazy sun',
        icon: 17
    },
    {
        id: 6,
        name: 'mostly cloudy',
        icon: 22
    },
    {
        id: 7,
        name: 'cloudy',
        icon: 14
    },
    {
        id: 8,
        name: 'dreary',
        icon: 14
    },
    {
        id: 11,
        name: 'fog',
        icon: 31
    },
    {
        id: 12,
        name: 'showers',
        icon: 1
    },
    {
        id: 13,
        name: 'mostly cloud with showers',
        icon: 32
    },
    {
        id: 14,
        name: 'partly sunny w/ showers',
        icon: 32
    },
    {
        id: 15,
        name: 'thunderstorm',
        icon: 26
    },
    {
        id: 16,
        name: 'mostly cloudy with t-storms',
        icon: 10
    },
    {
        id: 17,
        name: 'partly sunny w/ t storms',
        icon: 10
    },
    {
        id: 18,
        name: 'rain',
        icon: 8
    },
    {
        id: 19,
        name: 'flurries',
        icon: 20
    },
    {
        id: 20,
        name: 'mostly cloudy with flurries',
        icon: 20
    },
    {
        id: 21,
        name: 'partly sunny with flurries',
        icon: 20
    },
    {
        id: 22,
        name: 'snow',
        icon: 35
    },
    {
        id: 23,
        name: 'mostly cloudy with snow',
        icon: 35
    },
    {
        id: 24,
        name: 'ice',
        icon: 0
    },
    {
        id: 25,
        name: 'sleet',
        icon: 4
    },
    {
        id: 26,
        name: 'freezing rain',
        icon: 4
    },
    {
        id: 29,
        name: 'rain and snow',
        icon: 4
    },
    {
        id: 30,
        name: 'Hot',
        icon: 23
    },
    {
        id: 31,
        name: 'cold',
        icon: 0
    },
    {
        id: 32,
        name: 'windy',
        icon: 25
    },
    {
        id: 33,
        name: 'Clear N',
        icon: 13
    },
    {
        id: 34,
        name: 'Mostly clear',
        icon: 6
    },
    {
        id: 35,
        name: 'Partly cloud N ',
        icon: 27
    },
    {
        id: 36,
        name: 'Intermittent clouds N',
        icon: 27
    },
    {
        id: 37,
        name: 'Hazy Moonlight N',
        icon: 0
    },
    {
        id: 38,
        name: 'Mostly Cloudy N',
        icon: 27
    },
    {
        id: 39,
        name: 'Partly cloudy with showers N',
        icon: 36
    },
    {
        id: 40,
        name: 'Mostly cloudy with showers N',
        icon: 1
    },
    {
        id: 41,
        name: 'Partly clody with t-storms N',
        icon: 7
    },
    {
        id: 42,
        name: 'mostly cloudy with t-storms N',
        icon: 26
    },
    {
        id: 43,
        name: 'mostly clody with flurries N',
        icon: 16
    },
    {
        id: 44,
        name: 'mostly cloudy with snow N',
        icon: 19
    },
];

const fetchData = async (lat, long, real) => {


    if (real == 'true') {
        console.log('Fetching real Tomorrow.io data')
        try {
            const apiKey = process.env.AZURE_API_KEY;

            const currentData = await fetch (`https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.1&query=${lat},${long}&subscription-key=${apiKey}&duration=0&unit=metric&details=true`);
            const current = await currentData.json();

            const hourlyData = await fetch (`https://atlas.microsoft.com/weather/forecast/hourly/json?api-version=1.1&query=${lat},${long}&subscription-key=${apiKey}&duration=24&unit=metric`);
            const hourly = await hourlyData.json();

            const dailyData = await fetch (`https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.1&query=${lat},${long}&subscription-key=${apiKey}&duration=10&unit=metric&details=true`);
            const daily = await dailyData.json();

            if (current.code) {
                throw new Error({error: makeEnumerableCopy(current)});
            }

            return {
                daily,
                hourly,
                current
            }


        } catch (error) {
            const { code, type } = error;
            console.error('THROWING ERROR FROM TOMORROW CALL', error );
            throw new Error(makeEnumerableCopy(error));
        }
    } else {
        return azureJson;
    }
}
const getImage = (number) => {
    const code = parseInt(number);
    const clearCodes = [1, 2, 33, 34];
    const cloudsPart = [3, 4, 35, 36];
    const cloudy = [6, 7, 8, 38];
    const mist = [5,11, 37];
    const drizzle = [12, 13,14];
    const rain = [18, 39, 40];
    const thunderstorm = [15, 16, 17, 41, 42];
    const snow = [19, 20, 21, 22, 23, 43, 44]

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



const getIcon = (iconCode) => {
    const icon = icons.filter(icon => icon.id === iconCode)[0].icon;
    return `/icons/weather/${icon}.png`
}

const parseData = async (azureWeather, lat, long) => {
    const currentData = azureWeather.current.results[0];
    const dailyData = azureWeather.daily.forecasts;
    const houlryData = azureWeather.hourly.forecasts

    const currentDT = new Date(currentData.dateTime);
    const dt = Math.floor(currentDT.getTime() / 1000);

    const current = {
        dt,
        feels_like: currentData.apparentTemperature.value,
        temp: currentData.temperature.value,
        uvi: currentData.uvIndex,
        pop: dailyData[0].day.precipitationProbability / 100,
        clouds: currentData.cloudCover,
        humidity: currentData.relativeHumidity,
        pressure: currentData.pressure.value,
        wind_speed: currentData.wind.speed.value,
        isNight: !currentData.isDayTime,
        image: getImage(currentData.iconCode),
        icon:  getIcon(currentData.iconCode),
        weather: [
            {
                description: currentData.phrase,
                icon: '10d',
                id: tomorrowCurrent.id,
                main: 'clouds',
                iconCode: currentData.iconCode
            }
        ],
    };


    const daily =  dailyData.map(weather => {
        const date = new Date(weather.date);
        const dt = Math.floor(date.getTime() / 1000);
        const { day, night } = weather;

        return {
            dt,
            cloud: day.cloudCover,
            feels_like: {
                day: weather.realFeelTemperatureShade.maximum.value,
                night: weather.realFeelTemperatureShade.minimum.value,
                eve: weather.realFeelTemperatureShade.minimum.value,
                morn: weather.realFeelTemperatureShade.minimum.value,
            },
            humidity: 0,
            pop: day.precipitationProbability / 100,
            pressure: day.pressureSurfaceLevelAvg,
            temp: {
                day: '',
                min: weather.temperature.minimum.value,
                max: weather.temperature.maximum.value,
                night: '',
                eve: '',
                morn: '',
            },
            icon: getIcon(day.iconCode),
            //uvi: values.uvIndexMax,
            day: {
                icon: getIcon(day.iconCode),
                iconPhrase: day.iconPhrase,
                shortPhrase: day.shortPhrase,
                longPhrase: day.longPhrase,
            },
            night: {
                icon: getIcon(night.iconCode),
                iconPhrase: night.iconPhrase,
                shortPhrase: night.shortPhrase,
                longPhrase: night.longPhrase
            },
            weather: [
                {
                    id: 123,
                    main: 'rain',
                    icon: '10d',
                    description: day.shortPhrase,
                    iconCode: getIcon(day.iconCode)
                }
            ]
        }
    })

    const hourly = houlryData.map(weather => {
        const date = new Date(weather.date)
        const timestamp = Math.floor(date.getTime() / 1000);

        return {
            dt: timestamp,
            feels_like: weather.realFeelTemperature.value,
            temp: weather.temperature.value,
            uvi:weather.uvIndex,
            pop: weather.precipitationProbability / 100,
            clouds: weather.cloudCover,
            humidity: weather.relativeHumidity,
            isNight: !weather.isDaylight,
            icon: getIcon(weather.iconCode),
            weather: [
                {
                    description: weather.iconPhrase,
                    icon: '10d',
                    id: weather.id,
                    main: weather.main,
                    iconCode: getIcon(weather.iconCode)
                }
            ],
        }
    })

    return ({hourly, daily, current})
}

export const getAzureData = async (lat, long, real) => {

    console.log('Fetching Azure data...')
    const azureWeather = await fetchData(lat, long, real);
    console.log('Got Tomorrow.io data!')

    console.log('AZURE WEATHER RECEIVED:', azureWeather);
    console.log('Parsing Azure data')
    return await parseData(azureWeather, lat, long)
}