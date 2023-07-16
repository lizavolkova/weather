export const getTime = (date) => {
    return date.toLocaleTimeString("en-GB", {timeStyle: 'short'});
};