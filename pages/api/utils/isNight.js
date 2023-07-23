
export default function isNight (date, rise, set) {
    return date.getHours() > set.getHours() || date.getHours() < rise.getHours()
}