const Marks = ({ xScale, yScale, data, xValue, yValue, tooltipFormat }) => {
    return data.map((d) => (
        <rect
            className="mark"
            key={xValue(d)}
            y={yScale(yValue(d))}
            width={xScale(xValue(d))}
            height={yScale.bandwidth()}
        >

            <title>{tooltipFormat(xValue(d))}</title>

        </rect>
    ))
}

export default Marks