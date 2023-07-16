const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getDay = (date) => {
    return `${dayNames[date.getDay()]}`;
};