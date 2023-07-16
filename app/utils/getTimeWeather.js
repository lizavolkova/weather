import {getDate} from "./getDate";

export const getTimeWeather = (current, hourly) => {
    const date = getDate(current.dt);

    const now = hourly[0];
    const first = hourly[6];
    const second = hourly[12];

    const times = ["morning", "afternoon","evening","night","tomorrow morning","tomorrow afternoon"];
    const weather = [now, first, second];

    let isMorning   = date.getHours() > 5  && date.getHours() <= 12;
    let isAfternoon = date.getHours() > 12 && date.getHours() <= 18;
    let isEvening   = date.getHours() > 18 && date.getHours() <= 22;
    let isNight     = date.getHours() > 22 || date.getHours() <= 5;
    let count;


    if (isMorning) {
        count = [0,1,2];
    }

    if (isAfternoon) {
        count = [1,2,3];
    }

    if (isEvening) {
        count = [2,3,4];
    }

    if (isNight) {
        count = [3,4,5]
    }

    return count.map((num,i) => {
        return {
            time: times[num],
            weather: weather[i]
        }
    })
}