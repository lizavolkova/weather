
export default function isNight (date, rise, set, fromCurrent = false) {
    if (fromCurrent) {
        console.log('From isNight() function:')
        console.log('Date', date)
        console.log('Rise', rise)
        console.log('Set', set)
        console.log('Date hours:', date.getHours())
        console.log('Set hours:', set.getHours())
        console.log('Rise hours:', rise.getHours())
        console.log('date.getHours() > set.getHours()',date.getHours() > set.getHours())
        console.log('date.getHours() < rise.getHours()',date.getHours() < rise.getHours())
    }


    return date.getHours() > set.getHours() && date.getHours() < rise.getHours()
}