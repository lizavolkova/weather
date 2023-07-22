import tomorrowWeatherCodes from './tomorrow-weather-codes.json';

// export const getIcon = (weather) =>{
//     const icon = weather[0].icon;
//     return `http://openweathermap.org/img/wn/${icon}@2x.png`;
// }

export const getIcon = (weather) => {
    const iconCode = weather[0].iconCode;
    const description = weather[0].description
    return `/icons/tomorrow/${iconCode}_${description.toLowerCase().replace(',', '').replace(/ /g,"_")}_large@2x.png`
}