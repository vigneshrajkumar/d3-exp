const AxisBottom = ({xScale, innerHeight, tickFormat}) => {

    return xScale.ticks().map(tick => (
        <g className="tick" key={tick} transform={`translate(${xScale(tick)}, 0)`}>
            <line y2={innerHeight} />
            <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight  + 3}>
                {tickFormat(tick)}
            </text>
        </g>
    ))
}

export default AxisBottom;