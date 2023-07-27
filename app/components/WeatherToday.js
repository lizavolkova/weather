const Details = ({icon, title, longPhrase, temp}) => {
    return (
        <div className="w-1/2 p-6">
            <div className="uppercase text-slate-400 text-xl">{title}</div>
            <div className="flex py-4 items-center">
                <div className="text-5xl pr-4">{Math.floor(temp)}°</div>
                <img className="w-[60px]" src={icon} />
            </div>
            <div className="text-sm text-slate-200">{longPhrase}</div>
        </div>
    )
}

export default function WeatherToday({daily}) {
    const {day, night, temp } = daily[0];
    return (
        <div className="flex flex col w-full">
            <Details icon={day.icon} title="Today" longPhrase={day.longPhrase} temp={temp.max}/>
            <Details icon={night.icon} title="Overnight" longPhrase={night.longPhrase} temp={temp.min}/>
        </div>
    )
}