const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getMonth = (date) => {
    const day = new Date(date * 1000);

    return `${monthNames[day.getMonth()]}`;
};