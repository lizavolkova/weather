export default function TimeWeatherDetails({icon, title, longPhrase, temp}) {
    return (
        <div className="w-1/2 p-2 md:p-6">
            <div className="uppercase text-slate-400 text-xl">{title}</div>
            <div className="flex py-4 md:items-center  md:flex-row">
                <div className="text-4xl md:text-5xl pr-0 md:pr-4 text-white">{Math.floor(temp)}°</div>
                <img className="w-[60px]" src={icon} />
            </div>
            <div className="text-sm text-slate-200">{longPhrase}</div>
        </div>
    )
}