export const getIcon = (weather) =>{
    const icon = weather[0].icon;
    return `http://openweathermap.org/img/w/${icon}.png`;
}