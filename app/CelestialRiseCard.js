import CelestialDoughnutChart from "./components/Tables/CelestialDoughnutChart";
import {getTime} from "./utils/getTime";

const CelestialTimeCard = ({text, time, icon}) => {

    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-slate-400">{text}</div>
            <div className="text-xl">{time}</div>
            {icon && <img src={icon} alt="moon-phase" className="max-w-[50px]"/>}
        </div>
    )
}

export default function CelestialRiseCard({rise, set, params, celestialIcon, highlightColor, riseText, setText}) {
    return (
        <>
            <div className="w-full">
                <CelestialDoughnutChart riseTime={rise} setTime={set} celestialIcon={celestialIcon} riseText={riseText} setText={setText} highlightColor={highlightColor}/>
                <div className="flex justify-evenly text-center px-6">
                    {params && params.map(param => {
                        return <CelestialTimeCard key={param.name} text={param.name} time={param.val} icon={param.icon}/>
                    })}
                </div>
            </div>
        </>
    )
}