import { useMigrantsData } from '../hooks/useMigrantsData'
import { extent, scaleLinear, max, format, scaleTime, timeFormat, bin, timeMonths, sum } from 'd3'

import "./../missing-migrants-histogram.css"

const width = 960;
const height = 500;
const margin = { top: 20, right: 50, bottom: 65, left: 90 }

function MissingMigrantsHistogram() {
    const data = useMigrantsData()

    if (!data) {
        return <div>loading...</div>;
    }

    console.log(data.length);

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const xValue = d => d['Reported Date'];
    const xAxisLabel = 'time';
    const xAxisLabelOffset = 54;
    const xAxisTickFormat = v => timeFormat('%m/%d/%Y')(v);

    const yValue = d => d['Total Dead and Missing'];
    const yAxisLabel = 'Total Dead and Missing';
    const yAxisLabelOffset = 50;


    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const [start, end] = xScale.domain();

    const binnedData = bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, end))(data)
        .map(array => ({
            y: sum(array, yValue),
            x0: array.x0,
            x1: array.x1,
        }));

    const yScale = scaleLinear()
        .domain([0, max(binnedData, d => d.y)])
        .range([innerHeight, 0]);

    return (
        <svg width={width} height={height} style={{ border: "2px dashed green" }}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>

                {xScale.ticks().map(tickValue => (
                    <g className="tick" key={tickValue}
                        transform={`translate(${xScale(tickValue)},0)`} >

                        <line y2={innerHeight} />
                        <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + 8}>
                            {xAxisTickFormat(tickValue)}
                        </text>

                    </g>))}

                {yScale.ticks().map(tickValue => (
                    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
                        <line x2={innerWidth} />
                        <text
                            key={tickValue}
                            style={{ textAnchor: 'end' }}
                            x={-5}
                            dy=".32em"
                        >
                            {tickValue}
                        </text>
                    </g>
                ))}

              
                <text
                    className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle" > {xAxisLabel}
                </text>

                {binnedData.map(d => (
                    <rect
                        className="mark"
                        x={xScale(d.x0)}
                        y={yScale(d.y)}
                        width={xScale(d.x1) - xScale(d.x0)}
                        height={innerHeight - yScale(d.y)}
                    >
                        <title>{xAxisTickFormat(d.y)}</title>
                    </rect>
                ))}
            </g>
        </svg>
    );
}

export default MissingMigrantsHistogram