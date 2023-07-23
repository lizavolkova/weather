import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js";
import {getDate} from "../../utils/getDate";

const range = (start, stop) => {
    const arr = [parseFloat(start)];

    for (let i = Math.floor(start) + 1; i < Math.floor(stop); i++) {
        arr.push(i)
    }
    arr.push(parseFloat(stop));
    return arr;
}

const minuteConverter = time => {
    const [h, m] = time.split(':');
    return (+h + (+m/60)).toFixed(2);
};

const getTime = (time) => {
    return time.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
}

export default function CelestialDoughnutChart({riseTime, setTime, celestialIcon, riseText, setText, highlightColor}) {
    const [visible, setVisible] = useState(true);
    const grey = '#e1e1e1';

    const currentTime = new Date();
    const currentHours = currentTime.getHours();

    const setHM = getTime(setTime);
    const riseHM = getTime(riseTime)

    const start = minuteConverter(riseHM);
    const stop = minuteConverter(setHM);


    const dataArray = range(start, stop);

    const chartColors = dataArray.map(hour => {
        return hour <= currentHours + 1 ? highlightColor : grey;
    })

    const oneAngle = 180/dataArray.length +1;
    const angles = dataArray.map((hour,i) => (oneAngle * i)).reverse();

    const currentAngle = angles[currentHours - riseTime.getHours()];

    if (currentAngle > 180) {
        setVisible(false)
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            datalabels: false
        },
        scales: {
            x: {
                display: false
            }
        },
        layout: {
            padding: {
                bottom: 3
            }
        },
        rotation: -90,
        circumference: 180,
        tooltip: {
            enabled: false
        },
        cutout: '98%',
        segmentShowStroke: false
    };

    const celestialData = {
        labels: dataArray,
        datasets: [
            {
                label: '',
                data: dataArray,
                backgroundColor: chartColors,
                borderWidth: 0,
                weight: 0.05,
                celestial: true
            },
        ],
    };

    const celestialPlugin = {
        id: `celestial-chart-${riseText}`,
        afterUpdate: function(chart) {
            const arcs = chart.getDatasetMeta(0).data;

            arcs.forEach(function(arc) {
                arc.round = {
                    x: (chart.chartArea.left + chart.chartArea.right) / 2,
                    y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                    radius: (arc.outerRadius + arc.innerRadius) / 2,
                    thickness: (arc.outerRadius - arc.innerRadius) / 2,
                    backgroundColor: arc.options.backgroundColor
                }
            });
        },
        afterDraw: (chart, args, options) => {
            const dataSet =chart.config._config.data.datasets[0];

            if (dataSet.celestial) {
                const arcs = chart.getDatasetMeta(0).data;
                const radius = arcs[0].outerRadius + 20;

                // const angle = Math.PI + (1 / dataTotal) * value * Math.PI;
                const ctx = chart.ctx;
                const cw = chart.canvas.offsetWidth;
                const ch = chart.canvas.offsetHeight;
                const cx = cw / 2;
                const cy = ch - 140;

                const angle = currentAngle;

                const x = cx + radius * Math.cos(-angle*Math.PI/180);
                const y = cy + radius * Math.sin(-angle*Math.PI/180);

                const icon = new Image();
                icon.src = celestialIcon;
                icon.width = 35;
                icon.height = 35;

                icon.onload = function() {
                    ctx.drawImage(icon, x - icon.width/2,y + icon.height, icon.width, icon.height);
                }

                const fontSize = (ch / 500).toFixed(2);
                ctx.font = "1rem Verdana";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = "#94a3b8";
                const textY = ch - 80;
                ctx.fillText(setText, cw - (riseText.length + riseText.length/3 + 50), textY - 20);
                ctx.fillText(riseText, setText.length + setText.length/2 + 50, textY - 20);

                ctx.font = "1.125rem Verdana";
                ctx.fillStyle = 'white';

                ctx.fillText(getTime(setTime), cw - (riseText.length + riseText.length/3 + 50), textY);
                ctx.fillText(getTime(riseTime), setText.length + setText.length/2 + 50, textY);

                // inner circle to create border
                // ctx.beginPath();
                // ctx.arc(x, y, 15, 0, 2 * Math.PI);
                // ctx.fillStyle = '#fff';
                // ctx.fill();
            }

        },
    }

    return (
        <div>
            <div id={`celestial-chart-${riseText}`}  width="300" height="300" className={`max-h-[400px] mx-auto doughnut-chart ${visible ? 'opacity-100' : 'opacity-25'}`}>
                <Doughnut id={`celestial-chart-${riseText}`} type="doughnut" data={celestialData} options={options} plugins={[celestialPlugin]}/>
            </div>
        </div>


    )
}
