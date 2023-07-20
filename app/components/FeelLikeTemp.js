import InfoCard from "./Atoms/InfoCard";
import Temperature from "./Atoms/Temperature";
import RangeBar from "./Atoms/RangeBar";

const getColor = (temp) => {
    switch(true) {
        case temp <= 0:
            return 'bg-blue-700'
        case temp > 0 && temp <=15:
            return 'bg-sky-300'
        case temp > 15 && temp <= 20:
            return 'bg-green-600'
        case temp > 20 && temp <= 25:
            return 'bg-yellow-400'
        case temp > 25 && temp <= 30:
            return 'bg-orange-600'
        case temp > 30:
            return 'bg-red-600'
    }
}

export default function FeelLikeTemp({temp}) {
    const tempRange = [-50, 50];
    const total = Math.abs(tempRange[0]) + tempRange[1];
    const percent = ((Math.abs(tempRange[0]) + temp)/total) *100;
    const steps = 4;
    const color = getColor(temp);

    return  (
        <>
            <div className="flex flex-col space-y-2 w-full">
                <RangeBar percent={percent} color={color}/>
                <ul className="flex justify-between w-full px-[10px] pb-10">
                    {[...Array(steps + 1)].map((val, step) => {
                        return <li key={step} className="flex justify-center relative">
                            <span className="absolute">{Math.floor(tempRange[0] + ((total / steps) * step))}</span>
                        </li>
                    })}
                </ul>
            </div>
        </>
    )
}
