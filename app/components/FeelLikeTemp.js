import InfoCard from "./Atoms/InfoCard";
import Temperature from "./Atoms/Temperature";
import RangeBar from "./Atoms/RangeBar";

export default function FeelLikeTemp({temp}) {
    const tempRange = [-30, 50];
    const total = Math.abs(tempRange[0]) + tempRange[1];
    const percent = ((Math.abs(tempRange[0]) + temp)/total) *100;
    const steps = [0,1,2,3,4,5];

    return  (
        <>
            <div className="mb-4">
                <Temperature temp={temp} />
            </div>
            <div className="flex flex-col space-y-2 w-full">
                <RangeBar percent={percent} />
                <ul className="flex justify-between w-full px-[10px] pb-10">
                    {steps.map(step => {
                        return <li key={step}  className="flex justify-center relative"><span className="absolute">{Math.floor(tempRange[0] + ((total/5) * step))}</span></li>
                    })}
                </ul>
            </div>
        </>
    )
}