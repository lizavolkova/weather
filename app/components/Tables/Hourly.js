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
    const hourlyHalf = hourly.slice(0, 24);

    const temp = hourlyHalf.map(weather => Math.floor(weather.temp));
    const pop = hourlyHalf.map(weather => Math.floor(weather.pop*100));
    const time = hourlyHalf.map(weather => getTime(getDate(weather.dt)));
    const icons = hourlyHalf.map(weather => getIcon(weather.weather))
    console.log(icons[0])

    const max = Math.max(...temp);


    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                    display: false,
                    color: '#cbd5e1',
                    font: {
                        size: 16
                    },
                    padding: -50,
                    z: 5
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

    const customPlugin = {
        id: 'custom_canvas_background_color',
        afterDraw: chart => {
            const ctx = chart.ctx;
            const xAxis = chart.scales['x3'];
            const xAxisTwo = chart.scales['x3'];
            const yAxis = chart.scales['y'];
            xAxis.ticks.forEach((value, index) => {
                //const img = getImage(iconUrl[index]);
                const sun = new Image();
                sun.src = icons[index];
                const x = xAxis.getPixelForTick(index);

                sun.onload = function() {
                    ctx.drawImage(sun, x - 50, yAxis.top - 10);
                }

            });

            xAxisTwo.ticks.forEach((value, index) => {
                //const img = getImage(iconUrl[index]);
                const drop = new Image();
                drop.src = '/icons/drop.png'
                drop.width = 15;
                drop.height = 15;

                const x = xAxis.getPixelForTick(index);
                drop.onload = function() {
                    ctx.drawImage(drop, x - 30, yAxis.bottom - 25, drop.width, drop.height);
                    ctx.font = "15px Arial";
                    ctx.fillStyle = "white";
                    ctx.fillText(`${pop[index]}%`, x - 12, yAxis.bottom - 12)
                }

            });
            ctx.restore()
        },
        afterInit(chart, args, options) {
            //  chart.zoom(.5);
        }
    }
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
        customPlugin
    )

    return (

        <div id="chart" className="chartWrapper overflow-x-scroll">
            <div className="chartAreaWrapper ">
                <Line options={options} data={data} />
            </div>

        </div>
    )
}