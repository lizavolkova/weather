export default function WeatherDescription({text, classes}) {
    return (
        <span className={`text-sm text-slate-300 capitalize ${classes}`}>{text}</span>
    )
}