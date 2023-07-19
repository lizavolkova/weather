"use client"
import React, {useRef, useEffect, useState} from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {getTime} from "../../utils/getTime";
import {getDate} from "../../utils/getDate";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getIcon} from "../../utils/getIcon";

export default function Hourly({current, hourly}) {
    const [load, setLoad] = useState(false);
    const chartRef = useRef();
    const hourlyHalf = hourly.slice(0, 12);

    const temp = hourlyHalf.map(weather => Math.floor(weather.temp));
    const pop = hourlyHalf.map(weather => Math.floor(weather.pop*100));
    const time = hourlyHalf.map(weather => getTime(getDate(weather.dt)));
    const icons = hourlyHalf.map(weather => getIcon(weather.weather))

    const max = Math.max(...temp);


    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            datalabels: {
                display: true,
                color: '#fff',
                align: 'top',
                font: {
                    size: 28
                },
                formatter: function(value, context) {
                    return `${value}°`
                }
            },
            legend: {
                display: false
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                    onZoomComplete({chart}) {
                        // This update is needed to display up to date zoom level in the title.
                        // Without this, previous zoom level is displayed.
                        // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
                        chart.update('none');
                    },
                    onZoomRejected({chart}) {
                        console.log('test')
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutCubic'
                    },

                },
                pan: {
                    enabled: true,
                    mode: 'x',
                    speed: 100
                }
            }
        },
        scales: {
            y: {
                display: false,
                min: 0,
                max: max * 2
            },
            x2: {
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    offset: true,
                },
                ticks: {
                    callback: function(val, index) {
                        return `${pop[val]}%`
                    },
                    color: '#cbd5e1',
                    font: {
                        size: 16
                    }
                }
            },
            x3: {
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    offset: true,
                },
                position: 'top',
                ticks: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: true,
                    color: '#fff',
                    offset: true,
                    align: 'end'
                },
                position: 'top',
                ticks: {
                    color: '#fff',
                    font: {
                        size: 18
                    }
                }
            },
        }

    };


    const labels = time;
    const data = {
        labels,
        datasets: [
            {
                fill: false,
                label: 'Dataset 2',
                data: temp,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.5,

            },
            {
                fill: false,
                label: 'Dataset 2',
                data: pop,
                xAxisID: 'x2',
                hidden: true
            },
            {
                fill: false,
                label: 'Dataset 3',
                data: icons,
                xAxisID: 'x3',
                hidden: true
            }
        ]
    };




    useEffect(() => {
        const sun = new Image();
        sun.src = 'https://i.imgur.com/yDYW1I7.png';


        const customPlugin = {
            id: 'custom_canvas_background_color',
            afterDraw: chart => {
                const ctx = chart.ctx;
                const xAxis = chart.scales['x3'];
                const yAxis = chart.scales['y'];
                xAxis.ticks.forEach((value, index) => {
                    //const img = getImage(iconUrl[index]);
                    const x = xAxis.getPixelForTick(index);
                    ctx.drawImage(sun, x - 12, yAxis.top - 10);
                });
                ctx.restore()
            },
            afterInit(chart, args, options) {
                //  chart.zoom(.5);
            }
        }

        if (typeof window !== "undefined")
            import('chartjs-plugin-zoom').then((plugin) => {
                ChartJS.register(
                    CategoryScale,
                    LinearScale,
                    PointElement,
                    LineElement,
                    Title,
                    Tooltip,
                    Filler,
                    Legend,
                    ChartDataLabels,
                    plugin,
                    customPlugin
                )
                console.log(ChartJS)
                setLoad(true);
            });



    },[] );

    useEffect(() => {
        if (load && chartRef && chartRef.current) {
            console.log(chartRef)
            // console.log(chartRef.current)
            setTimeout(() => {
               // zoomIn();

            }, 1500);
        }
    }, [load]);

    const zoomIn = () => {
        const steps = 4;

        if (chartRef && chartRef.current) {
            console.log(chartRef)

            chartRef.current.zoomScale('x', {min: 0, max: steps}, 'easeOutCubic');
            chartRef.current.zoomScale('x2', {min: 0, max: steps}, 'easeOutCubic');
            chartRef.current.zoomScale('x3', {min: 0, max: steps}, 'easeOutCubic');
            chartRef.current.zoomScale('y', {min: 0, max: max * 2}, 'easeOutCubic');
        }
    };

    return (

        <div id="chart" className="overflow-x-scroll chartWrapper ">
            <div className="chartAreaWrapper ">
                {load && <Line ref={chartRef} options={options} data={data} />}
            </div>

        </div>
    )
}