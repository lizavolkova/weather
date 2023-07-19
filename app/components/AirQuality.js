import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js";
import DoughnutChart from "./Tables/DoughnutChart";

export default function AirQuality({air}) {
    const aqi = air.current.pollution.aqius;
    const allColors = ['#8ec641', '#fcd822', '#ff7701', '#fe0002', '#a8004d', '#530315'];
    const ranges = [50, 100, 150, 200, 300, 500];
    let diagnosis;
    let note ='';

    switch(true) {
        case aqi <= 50:
            diagnosis = 'Good';
            break;
        case aqi > 50 && aqi <= 100:
            diagnosis = 'Moderate';
            note = 'Usually sensitive individuals should consider limiting prolonged outdoor exertion.';
            break;
        case aqi >= 101 && aqi <= 150:
            note = 'Children, active adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.';
            diagnosis = 'Unhealthy';
            break;
        case aqi > 151 && aqi <= 200:
            note = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid outdoor exertion; everyone else should limit prolonged outdoor exertion.';
            diagnosis = 'Unhealthy';
            break;
        case aqi >= 201 && aqi <= 300:
            note = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid outdoor exertion; everyone else should limit outdoor exertion.';
            diagnosis = 'Very Unhealthy';
            break;
        case aqi >= 301:
            note = 'Everyone should avoid all physical activity outdoors.';
            diagnosis = 'Hazerdous';
            break;
    }

    return (
        <div>
            <DoughnutChart val={aqi} colors={allColors} chartId="aqi-chart" rot={-135} circum={270} diagnosis={diagnosis} ranges={ranges}/>
            <div className="text-center">{note}</div>
        </div>


    )
}
