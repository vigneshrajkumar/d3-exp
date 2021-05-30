import { useScatterPlotData } from './../hooks/useScatterPlotData'
import { scaleLinear, extent } from 'd3'
import { useState } from 'react'
import Dropdown from 'react-dropdown'

import './../scatterChart.css'
import 'react-dropdown/style.css';

const dataURL = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv';

const width = 960;
const height = 500;
const margin = { top: 20, bottom: 50, left: 80, right: 20 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

function ScatterPlot() {

    const options = [
        { value: "sepal_length", label: "Sepal Length" },
        { value: "sepal_width", label: "Sepal Width" },
        { value: "petal_length", label: "Petal Length" },
        { value: "petal_width", label: "Petal Width" }
    ];

    const initXAttribute = 'petal_length';
    const [xAttribute, setXAttribute] = useState(initXAttribute);
    const xValue = d => d[xAttribute];
    const xAxisLabel = options.filter(op => op.value === xAttribute)[0].label;
    const xAxisLabelOffset = 30;

    const initYAttribute = 'sepal_width';
    const [yAttribute, setYAttribute] = useState(initYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = options.filter(op => op.value === yAttribute)[0].label;
    const yAxisLabelOffset = -40;


    const data = useScatterPlotData(dataURL)

    if (!data) {
        return (
            <div>loading...</div>
        )
    }

    // extent gives min and max of the given value range
    // nice gives space between starting value of tick and axis
    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight])
        .nice()

    return (
        <>
            <div className="menus-container">
                <span className="dropdown-label">X</span>
                <Dropdown options={options} value={xAttribute} onChange={({ value }) => setXAttribute(value)} />

                <span className="dropdown-label">Y</span>
                <Dropdown options={options} value={yAttribute} onChange={({ value }) => setYAttribute(value)} />
            </div>

            <svg width={width} height={height}>

                <g transform={`translate(${margin.left}, ${margin.top})`}>

                    {xScale.ticks().map(ti => (
                        <g className="tick" transform={`translate(${xScale(ti)}, 0)`}>
                            <line y2={innerHeight}></line>
                            <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 5}>
                                {ti}
                            </text>
                        </g>
                    ))}


                    <text
                        className="xAxis-label"
                        x={innerWidth / 2}
                        y={innerHeight + xAxisLabelOffset}
                        textAnchor="middle"
                    >{xAxisLabel}</text>

                    {yScale.ticks().map(ti => (
                        <g className="tick" transform={`translate(0, ${yScale(ti)})`}>
                            <line x2={innerWidth}></line>
                            <text style={{ textAnchor: "end" }} x={-3} y={yScale(ti)} dy=".71em">
                                {ti}
                            </text>
                        </g>
                    ))}

                    <text
                        className="yAxis-label"
                        textAnchor="middle"
                        transform={`translate(${yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
                    >{yAxisLabel}</text>


                    {data.map((d) => (
                        <circle className="mark"
                            r={7}
                            cx={xScale(xValue(d))}
                            cy={yScale(yValue(d))}>
                            <title>{xValue(d)}</title>
                        </circle>))}

                </g>

            </svg>
        </>
    )
}

export default ScatterPlot