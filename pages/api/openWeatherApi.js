import isNight from "./utils/isNight";
import getRiseSet from './utils/getRiseSet';

const fetchOpenData = async (lat, long, real) => {
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

const getIcon = (weather) =>{
    const icon = weather.weather[0].icon;
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

const getImage = (number) => {
    const code = parseInt(number);

    const clearCodes = [800];
    const cloudsPart = [801,802];
    const cloudy = [803,804];
    const mist = [701,702,711,721,731,741,751,761,762,771,781];
    const drizzle = [300,301,302,310,311,312,313,314,321];
    const rain = [500,501,502,503,504,511,520,521,522,531];
    const thunderstorm = [200, 201,202,210,211,212,221,230,231,232];
    const snow = [5000, 5001, 5100, 5101];

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
    const today = new Date();
    const {rise, set } = getRiseSet('Sun', lat, long, today);


    const hourly = data.hourly.map(weather => {
        return {...weather,
            isNight: isNight(today, rise, set),
            icon: getIcon(weather)
        }
    })

    const current = {
        ...data.current,
        pop: data.current.pop || 0,
        icon: getIcon(data.current),
        isNight: isNight(today, rise, set),
        image: getImage(data.current.weather[0].id)
    }

    const daily = data.daily.map(weather => {
        return {
            ...weather,
            icon: getIcon(weather)
        }
    });


    return {daily, hourly, current}
}
export const getOpenWeatherData = async (lat, long, real) => {
    const data = await fetchOpenData(lat, long, real);
    const {daily, hourly, current} = await parseOpenData(data, lat, long)

    return {daily, hourly, current};

}

