import { useScatterPlotData } from './../hooks/useScatterPlotData'
import { scaleLinear, extent } from 'd3'

import './../scatterChart.css'

const dataURL = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv';

const width = 960;
const height = 500;
const margin = { top: 50, bottom: 50, left: 80, right: 20 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;


const xValue = d => d.sepal_length;
const xAxisLabel = 'sepal length'
const xAxisLabelOffset = 30

const yValue = d => d.sepal_width;
const yAxisLabel = 'sepal width'
const yAxisLabelOffset = -40

function ScatterPlot() {
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

    console.log(data);
    console.log(xScale.ticks());

    return (
        <svg style={{ border: '2px dashed orange' }} width={width} height={height}>

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
    )
}

export default ScatterPlot