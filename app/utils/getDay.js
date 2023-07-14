const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getDay = (date) => {
    const day = new Date(date * 1000);

    return `${dayNames[day.getDay()]}`;
};