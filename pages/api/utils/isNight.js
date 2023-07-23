
export default function isNight (date, rise, set) {
    console.log('From isNight() function:')
    console.log('Date', date)
    console.log('Rise', date)
    console.log('Set', date)
    console.log('Date hours:', date.get())
    console.log('Set hours:', set.get())
    console.log('Rise hours:', rise.get())
    console.log('date.getHours() > set.getHours()',date.getHours() > set.getHours())
    console.log('date.getHours() < rise.getHours()',date.getHours() < rise.getHours())

    return date.getHours() > set.getHours() || date.getHours() < rise.getHours()
}