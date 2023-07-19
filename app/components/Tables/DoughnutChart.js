import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js";

export default function DoughnutChart({val, colors, chartId, rot, circum, diagnosis, ranges}) {
    const grey = '#e1e1e1';
    let found = false;

    const chartColors = [];

    ranges.reduce((accumulator, currentValue, index) => {
        if (val > accumulator + currentValue && !found) {
            chartColors.push(colors[index]);
            return accumulator + currentValue;
        } else if (!found) {

            chartColors.push(colors[index]);
            found = true;
            return ranges[index];
        } else {
            chartColors.push(grey);

            return accumulator + currentValue;
        }

    }, 0)

    const dataArray = colors.map(color => 50);

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
        rotation: rot,
        circumference: circum,
        tooltip: {
            enabled: false
        },
        cutout: "90%"
    };

    const uviData = {
        labels: dataArray,
        datasets: [
            {
                label: '# of Votes',
                data: dataArray,
                backgroundColor: chartColors,
                borderWidth: 0,
                value: val,
            },
        ],
    };

    ChartJS.register({
        id: 'doughnut-plugin',
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
            const value = dataSet.value;

            if (value) {
                const dataTotal = dataSet.data.reduce(
                    (a, b) => a + b,
                    0
                );
                const angle = Math.PI + (1 / dataTotal) * value * Math.PI;
                const ctx = chart.ctx;
                const cw = chart.canvas.offsetWidth;
                const ch = chart.canvas.offsetHeight;
                const cx = cw / 2;
                const cy = ch - 70;

                // Add text to center
                const fontSize = (ch / 70).toFixed(2);
                ctx.font = fontSize + "em Verdana";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                ctx.fillStyle = "white";

                const textY = ch - 100;

                ctx.fillText(value, cx, textY - 50);

                ctx.fillStyle = "#aaaaaa";
                ctx.font = fontSize / 3 + "em Verdana";
                if (diagnosis) {
                    ctx.fillText(diagnosis, cx, textY + 20);
                }
            }

        }
    })

    return (
        <div>
            <div id={chartId} width="200" height="200" className="max-h-[400px] mx-auto doughnut-chart">
                <Doughnut type="doughnut" data={uviData} options={options}/>
            </div>
        </div>


    )
}
