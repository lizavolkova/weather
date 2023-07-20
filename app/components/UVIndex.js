import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js";
import DoughnutChart from "./Tables/DoughnutChart";
import CardStyle from "./Atoms/CardStyle";
import IconClockFill from "./icons/IconClockFill";

export default function UVIndex({uvi}) {
    let diagnosis;
    let note ='';
    let tts;
    let spf;

    switch(true) {
        case uvi <= 2:
            diagnosis = 'Low';
            tts = 60;
            spf = 10;
            break;
        case uvi > 3 && uvi <= 5:
            diagnosis = 'Moderate';
            note = 'Some protetion required';
            tts = 40;
            spf = 20;
            break;
        case uvi >= 6 && uvi <= 7:
            note = 'Protection essential';
            diagnosis = 'High';
            tts = 20;
            spf = 30;
            break;
        case uvi >= 8 && uvi <= 10:
            note = 'Extra protection is needed';
            diagnosis = 'Very High';
            tts = 15;
            spf = 40;
            break;
        case uvi >= 11:
            note = 'Stay inside';
            diagnosis = 'Extreme';
            tts = '< 10>';
            spf = 50;
            break;
    }


    const allColors = ['#8ec641', '#fcd822', '#ff7701', '#fe0002', '#530315'];
    const ranges = [2, 5, 7, 10, 11];


    return (
        <div className="flex flex-col w-full">
            <DoughnutChart val={uvi} colors={allColors} chartId="uvi-chart" rot={-90} circum={180} diagnosis={diagnosis} ranges={ranges}/>
            <div className="text-center">{note}</div>
            <div className="flex w-full">
                <CardStyle classes="w-1/2 flex-col">
                    <div className="flex"><IconClockFill /><span className="pl-3">{tts} min</span></div>
                    <div className="text-slate-400">Time to sunburn</div>
                </CardStyle>
                <CardStyle classes="w-1/2 text-xl">{spf} SPF</CardStyle>
            </div>

        </div>


    )
}
