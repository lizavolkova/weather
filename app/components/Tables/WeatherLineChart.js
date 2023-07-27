"use client"
import React, {useRef, useEffect, useState} from 'react';

import { Line, getElementsAtEvent } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js";


function WeatherLineChart({temp, pop, time, icons, minTemp, clickedEl, id, descriptions}) {
    const chartRef = useRef();

    const customPlugin = {
        id: `weather-line-chart-${id}`,
        afterDraw: chart => {
            const ctx = chart.ctx;
            const xAxis = chart.scales['x3'];
            const xAxisTwo = chart.scales['x3'];
            const xAxisTemp = chart.scales['x-temp'];
            const xAxisDesc = chart.scales['xDesc'];

            const yAxis = chart.scales['y'];

            if (xAxis) {
                xAxis.ticks.forEach((value, index) => {
                    const icon = new Image();
                    icon.src = icons[index];

                    const x = xAxis.getPixelForTick(index);

                    icon.onload = function() {
                        const scale = 0.175;
                        const scaledWidth = icon.width * scale;
                        const scaledHeight = icon.height * scale;
                        ctx.drawImage(icon, x - scaledWidth/2, yAxis.top +scaledHeight/2, scaledWidth, scaledHeight);
                    }

                });
            }

            if (xAxisDesc && descriptions) {
                xAxis.ticks.forEach((value, index) => {
                    const desc = descriptions[index];
                    const x = xAxis.getPixelForTick(index);
                    ctx.textAlign = "center";
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "white";
                    ctx.fillText(desc, x, yAxis.top + 80);
                    ctx.textAlign = "start";

                });
            }

            if (xAxisTwo) {
                xAxisTwo.ticks.forEach((value, index) => {

                    const drop = new Image();
                    drop.src = '/icons/drop.png'
                    drop.width = 15;
                    drop.height = 15;

                    const x = xAxis.getPixelForTick(index);
                    drop.onload = function() {
                        // Dim rain % if it's low
                        if (pop[index] <= 10) {
                            ctx.globalAlpha = 0.4;
                        }

                        ctx.drawImage(drop, x - 30, yAxis.bottom - 25, drop.width, drop.height);
                        ctx.font = "16px Arial";
                        ctx.fillStyle = "white";
                        ctx.fillText(`${pop[index]}%`, x - 12, yAxis.bottom - 12);
                        ctx.globalAlpha = 1;
                    }

                });
            }
            ctx.restore()
        }
    }



    const max = Math.max(...temp);
    const min = Math.max(...temp);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 55,
                right: 55
            }
        },
        plugins: {
            datalabels: {
                display: true,
                color: '#fff',
                align: 'top',
                textAlign: 'center',
                font: {
                    size: minTemp ? 18 : 28
                },
                formatter: function(value, context) {
                    return `${minTemp ? `${value}° | ${minTemp[context.dataIndex]}°` : `${value}°`}`
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
                min: min/5,
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
                    color: '#363636',
                    offset: true,
                    align: 'end',
                },
                border: {
                    display: false
                },
                position: 'top',
                ticks: {
                    color: '#aeaeae',
                    font: {
                        size: 14
                    }
                }
            },
            xDesc: {
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    offset: true,
                },
                position: 'top',
                ticks: {
                    display: false
                }
            }
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
                borderColor: '#fb923c',
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
            },
            {
                fill: false,
                label: 'Descriptions Data',
                data: descriptions,
                xAxisID: 'xDesc',
                hidden: true
            }
        ]
    };


    const onClick = (event) => {
        if (clickedEl && chartRef.current) {
            let value = chartRef.current.scales.x.getValueForPixel(event.nativeEvent.layerX);
            const el = Math.round(Math.abs(value));
            clickedEl(el)
        }

    }

    return (
        <Line options={options} data={data} ref={chartRef} onClick={onClick} plugins={[customPlugin]}/>
    )
}

function arePropsEqual(oldProps, newProps) {

    return oldProps.clickedEl?.length === newProps.clickedEl?.length
}

export default React.memo(WeatherLineChart, arePropsEqual);