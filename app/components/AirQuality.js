import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js";

export default function AirQuality({air}) {
    const aqi = air.current.pollution.aqius;

    let diagnosis;

    switch(true) {
        case aqi <= 50:
            console.log('here!')
            diagnosis = 'Good';
            break;
        case aqi > 50 && aqi <= 100:
            diagnosis = 'Moderate';
            break;
        case aqi >= 101 && aqi <= 150:
            diagnosis = 'Unhealthy';
            break;
        case aqi > 151 && aqi <= 200:
            diagnosis = 'Unhealthy';
            break;
        case aqi >= 201 && aqi <= 300:
            diagnosis = 'Very Unhealthy';
            break;
        case aqi >= 301:
            diagnosis = 'Hazerdous';
            break;
    }

    const ranges = [50, 50, 50, 50, 100, 200];
    const allColors = ['#8ec641', '#fcd822', '#ff7701', '#fe0002', '#a8004d', '#530315'];
    const grey = '#e1e1e1';
    let test = [];
    const testColor = [];
    let found = false;

    ranges.reduce((accumulator, currentValue, index) => {
        if (aqi > accumulator + currentValue && !found) {
            test.push(currentValue);
            testColor.push(allColors[index]);
            return accumulator + currentValue;
        } else if (!found) {
            test.push(aqi - accumulator);
            testColor.push(allColors[index]);
            found = true;
            return ranges[index];
        } else {
            testColor.push(grey);
            test.push(currentValue);
            return accumulator + currentValue;
        }

    }, 0)
    console.log(test)
    console.log(testColor)


    test = [50,50,50,50,50,50]


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
        rotation: -135,
        circumference: 270,
        tooltip: {
            enabled: false
        },
        cutout: "90%"
    };

    const aqiData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: test,
                backgroundColor: testColor,
                borderWidth: 0,
                needleValue: 100,

            },
        ],
    };

    ChartJS.register({
        id: 'aqi-needle',
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
        afterDraw: (chart) => {
            const dataSet  =chart.config._config.data.datasets[0];
            const needleValue = dataSet.needleValue;

            if (needleValue) {

                const dataTotal = dataSet.data.reduce(
                    (a, b) => a + b,
                    0
                );
                const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
                const ctx = chart.ctx;
                const cw = chart.canvas.offsetWidth;
                const ch = chart.canvas.offsetHeight;
                const cx = cw / 2;
                const cy = ch - 70;

                // CODE BELOW RENDERS NEEDLE
                // ctx.translate(cx, cy);
                // ctx.rotate(angle);
                // ctx.beginPath();
                // ctx.moveTo(0, -3);
                // ctx.lineTo(ch - 200, 0);
                // ctx.lineTo(0, 0);
                // ctx.fillStyle = "rgb(0, 0, 0)";
                // ctx.fill();
                // ctx.rotate(-angle);
                // ctx.translate(-cx, -cy);
                // ctx.beginPath();
                // ctx.arc(cx, cy, 5, 0, Math.PI * 2);
                // ctx.fill();


                // Add text to center
                const fontSize = (ch / 70).toFixed(2);
                ctx.font = fontSize + "em Verdana";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                ctx.fillStyle = "white";

                const textY = ch - 100;

                ctx.fillText(aqi, cx, textY - 50);

                ctx.fillStyle = "#aaaaaa";
                ctx.font = fontSize / 3 + "em Verdana";
                ctx.fillText(diagnosis, cx, textY + 20);

                //round corners
                // chart.getDatasetMeta(0).data.forEach((arc, i) => {
                //     const startAngle = Math.PI / 2 - arc.startAngle;
                //     const endAngle = Math.PI / 2 - arc.endAngle;
                //
                //     ctx.save();
                //     ctx.translate(arc.round.x, arc.round.y +23);
                //     ctx.fillStyle = arc.options.backgroundColor;
                //     ctx.beginPath();
                //     ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
                //     ctx.closePath();
                //     ctx.fill();
                //     ctx.restore();
                //
                // })
            }

        }
    })

    return (
        <div id="chart-aqi" width="200" height="200">
            <Doughnut type="doughnut" data={aqiData} options={options}/>
        </div>

    )
}
