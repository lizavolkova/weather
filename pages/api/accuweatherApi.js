import accuweatherData from './accuweatherData.json';
import isNight from "./utils/isNight";
import tomorrowCurrent from "./tomorrowCurrent.json";
import getRiseSet from "./utils/getRiseSet";

const lat = 41.18856;
const long = -73.83745;

const fetchOpenData = async (lat, long, real) => {
    if(real == 'true' ) {
        console.log('Fetching real weather data')
        try {
            const key = 339728;
            const currentRes = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${process.env.ACCUWEATHER_API_KEY}&details=true`);
            const current = await currentRes.json();

            const hourlyRes = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=${process.env.ACCUWEATHER_API_KEY}&details=true&metric=true`);
            const hourly = await hourlyRes.json();

            const dailyRes = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.ACCUWEATHER_API_KEY}&details=true&metric=true`);
            const daily = await dailyRes.json();

            console.log('Real weather data fetched succesfully')
            return {
                current,
                hourly,
                daily
            }

        } catch (err) {
            console.error('Error fetching real weather data: ', err)
            return err;
        }

    } else {
        return accuweatherData;
    }
}

const getIcon = (weather) =>{
    const icon = weather.weather[0].icon;
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

const getImage = (number) => {
    const code = parseInt(number);

    const clearCodes = [1,2,3,4,5, 33,34];
    const cloudsPart = [35, 36];
    const cloudy = [6,7,8, 38];
    const mist = [5,11, 37];
    const drizzle = [12, 14, 39];
    const rain = [13,18, 40];
    const thunderstorm = [15,16,17, 41,42];
    const snow = [19,20,21,22,23, 43, 44];
    //ice/sleet: 24,25, 26, 27
    //hot 32
    //cold 31
    //32 windy

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

const parseOpenData = async (data, lat, long) => {
    const currentData = data;
    console.log('currentData,', currentData)
    const hourlyData = data.hourly;
    const dailyData = data.daily.DailyForecasts;
    const today = new Date(currentData.EpochTime * 1000);
    const { rise, set } = getRiseSet('Sun', lat, long, today);

    const current = {
        dt: currentData.EpochTime,
        feels_like: currentData.ApparentTemperature.Metric.Value,
        temp: currentData.Temperature.Metric.Value,
        uvi: currentData.UVIndex,
        pop: dailyData[0].Day.PrecipitationProbability / 100,
        clouds: currentData.CloudCover,
        humidity: currentData.RelativeHumidity,
        pressure: currentData.Pressure.Metric.Value,
        wind_speed: currentData.Wind.Speed.Metric.Value,
        isNight: isNight(today, rise, set,true),
        image: getImage(currentData.WeatherIcon),
        icon: `/icons/accuweather/${currentData.WeatherIcon}.png`,
        weather: [
            {
                description: currentData.WeatherText,
                main: 'clouds',
                iconCode: currentData.WeatherIcon
            }
        ],
    };

    const hourly = hourlyData.map(weather => {
        const date = new Date(weather.EpochDateTime * 1000);
        const { rise, set } = getRiseSet('Sun', lat, long, date);

        return {
            dt: weather.EpochDateTime,
            feels_like: weather.RealFeelTemperature.Value,
            temp: weather.Temperature.Value,
            uvi:weather.UVIndex,
            pop: weather.RainProbability / 100,
            clouds: weather.CloudCover,
            humidity: weather.RelativeHumidity,
            isNight: isNight(date, rise, set),
            icon: `/icons/accuweather/${weather.WeatherIcon}.png`,
            weather: [
                {
                    description: weather.IconPhrase,
                    main: weather.main,
                }
            ],
        }
    });

    const daily = dailyData.map(weather => {
        const { Day } = weather;

        return {
            dt: weather.EpochDate,
            cloud: Day.CloudCover,
            feels_like: {
                day: weather.RealFeelTemperature.Maximum.Value,
                night: weather.RealFeelTemperature.Minimum.Value,
                eve: weather.RealFeelTemperature.Minimum.Value,
                morn: weather.RealFeelTemperature.Minimum.Value,
            },
            humidity: 0,
            pop: Day.PrecipitationProbability / 100,
            pressure: 0,
            temp: {
                day: '',
                min: weather.Temperature.Minimum.Value,
                max: weather.Temperature.Maximum.Value,
                night: '',
                eve: '',
                morn: '',
            },
            icon: `/icons/accuweather/${Day.Icon}.png`,
            uvi: 0,
            weather: [
                {
                    main: Day.IconPhrase,
                    description: Day.IconPhrase,
                    iconCode: Day.Icon
                }
            ]
        }
    })

    return {daily, hourly, current};
}

export const getAccuweatherData = async (lat, long, real) => {
    const data = await fetchOpenData(lat, long, real);
    const {daily, hourly, current} = await parseOpenData(data, lat, long)

    return {daily, hourly, current};

}