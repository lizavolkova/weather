import {getDate} from "./getDate";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getDay = (date) => {
    const day = getDate(date);

    return `${dayNames[day.getDay()]}`;
};