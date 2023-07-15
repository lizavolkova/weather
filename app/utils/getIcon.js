export const getIcon = (weather) =>{
    const icon = weather[0].icon;
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}