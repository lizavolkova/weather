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
        isNight: isNight(today, rise, set)
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

