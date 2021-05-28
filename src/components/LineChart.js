import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { curveNatural, line } from "d3-shape";
import { timeFormat } from "d3-time-format";
import { useLineChart } from "../hooks/useLineChart"

import './../lineChart.css'

const dataURL = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/week_temperature_sf.csv'


function LineChart() {

    const data = useLineChart(dataURL);

    if (!data) {
        return (
            <div>loading...</div>
        )
    }
    console.log(data);

    const width = 960;
    const height = 500;
    const margins = { top: 20, bottom: 50, left: 70, right: 10 };
    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;

    const xValue = d => d.timestamp;
    const xAxisLabel = 'time';
    const xAxisLabelOffset = 40

    const yValue = d => d.temperature;
    const yAxisLabel = 'temp';
    const yAxisLabelOffset = -40

    const xAxisTickFormat = timeFormat('%a')

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice()


    return (
        <svg height={height} width={width} style={{ border: "2px dashed orange" }}>
            <g transform={`translate(${margins.left}, ${margins.top})`}>

                {xScale.ticks().map(ti => (
                    <g className="tick" transform={`translate(${xScale(ti)}, 0)`}>
                        <line y2={innerHeight}></line>
                        <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 5}>
                            {xAxisTickFormat(ti)}
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

                <g className="marks">
                    <path
                        d={line()
                            .x(d => xScale(xValue(d)))
                            .y(d => yScale(yValue(d)))
                            .curve(curveNatural)(data)}

                    />
                    {data.map((d) => (
                        <circle
                            r={3}
                            cx={xScale(xValue(d))}
                            cy={yScale(yValue(d))}>
                            <title>x</title>
                        </circle>))}
                </g>
            </g>
        </svg>
    )
}

export default LineChart