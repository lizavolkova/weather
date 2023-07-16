import {getDate} from "./getDate";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getMonth = (date) => {
    const day = getDate(date);

    return `${monthNames[day.getMonth()]}`;
};