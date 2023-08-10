import TimeWeatherDetails from './Atoms/TimeWeatherDetails'

export default function WeatherToday({daily}) {
    const {day, night, temp } = daily[0];
    return (
        <div className="flex flex col w-full">
            <TimeWeatherDetails icon={day.icon} title="Today" longPhrase={day.longPhrase} temp={temp.max}/>
            <TimeWeatherDetails icon={night.icon} title="Overnight" longPhrase={night.longPhrase} temp={temp.min}/>
        </div>
    )
}