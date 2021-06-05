
import { extent, scaleLinear, max, scaleTime, timeFormat, bin, timeMonths, sum, brushX, select } from 'd3'
import { useEffect, useMemo, useRef } from 'react'

import "./../missing-migrants-histogram.css"

const margin = { top: 0, right: 50, bottom: 30, left: 50 }


const xAxisLabel = 'time';
const xAxisLabelOffset = 54;
const xAxisTickFormat = v => timeFormat('%m/%d/%Y')(v);


const yValue = d => d['Total Dead and Missing'];
const yAxisLabel = 'Total Dead and Missing';
const yAxisLabelOffset = 50;

function MigrantsHistogram({ migrantsData, height, width, setBrushExtent, xValue }) {

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const xScale = useMemo(
        () => {
            return scaleTime()
            .domain(extent(migrantsData, xValue))
            .range([0, innerWidth])
            .nice()
        },
        [migrantsData, xValue, innerWidth]
    );

    const binnedData = useMemo(
        ()=>{
            const [start, end] = xScale.domain();
            return bin()
            .value(xValue)
            .domain(xScale.domain())
            .thresholds(timeMonths(start, end))(migrantsData)
            .map(array => ({
                y: sum(array, yValue),
                x0: array.x0,
                x1: array.x1,
            }));
        },
        [xValue, yValue, xScale, migrantsData]
    )

    const yScale = useMemo(
        () => scaleLinear()
        .domain([0, max(binnedData, d => d.y)])
        .range([innerHeight, 0])
        .nice(),
        [binnedData, innerHeight]
    );

    const brushRef = useRef();

    useEffect(() => {
        const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]]);
        brush(select(brushRef.current));
        brush.on('brush end', (ev) => {
            setBrushExtent(ev.selection && ev.selection.map(xScale.invert));
        })
    }, [innerWidth, innerHeight])

    return (
        <>
            <rect className="hist-bg" width={width} height={height} />
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
                            dy=".32em">
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
                        height={innerHeight - yScale(d.y)} >
                        <title>{xAxisTickFormat(d.y)}</title>
                    </rect>
                ))}

                <g ref={brushRef} />
            </g>
        </>
    );
}

export default MigrantsHistogram