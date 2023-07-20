import {Doughnut, Line} from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js";
import {getDate} from "../../utils/getDate";

export default function CelestialAreaChart({val, colors, chartId, rot, circum, diagnosis, ranges}) {
    const grey = '#e1e1e1';
    let found = false;
    const sunriseTime = getDate(1689500158);

    const sunsetTime = getDate(1689553583)
    const currentTime = new Date();

    const test = [...Array(12).keys()];
    console.log(test)

    const chartColors = test.map(val => val < 15 ? '#d7b13e' : grey)
    const dataArray = test.map(val => val);

    const options = {
        responsive: true,
        scales: {
            y: {
                stacked: true
            }
        },
        plugins: {
            filler: {
                propagate: false
            },
            'samples-filler-analyser': {
                target: 'chart-analyser'
            }
        },
        interaction: {
            intersect: false,
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const uviData = {
        labels,
        datasets: [
            {
                label: '',
                data: dataArray,
                backgroundColor: chartColors,
                fill: {above: 'blue', below: 'red', target: {value: 5}}
            },
        ],
    };


    return (
        <div>
            <div id="sunrise-chart w-full"  height="200" className="max-h-[400px] mx-auto ">
                <Line type="line" data={uviData} options={options}/>
            </div>
        </div>


    )
}
