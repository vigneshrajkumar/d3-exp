import { useData } from './hooks/useData'
import { scaleBand, scaleLinear, max, format } from 'd3'

import AxisBottom from './components/AxisBottom'
import AxisLeft from './components/AxisLeft'
import Marks from './components/Marks'
import "./index.css"

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 220 }
const xAxisOffset = 50;

// accessor functions
const xValue = d => d.Population;
const yValue = d => d.Country;

function App() {

    const data = useData()

    if (!data) {
        return <div>loading...</div>;
    }

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .paddingInner(0.15);

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);

    console.log(xScale.ticks());

    return (
        <svg width={width} height={height} style={{ border: "2px dashed green" }}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>

                <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={format('.2s')} />

                <AxisLeft yScale={yScale} />

                <text className="axis-label" x={innerWidth / 2}
                    y={innerHeight + xAxisOffset}
                    textAnchor="middle"> Population </text>

                <Marks xScale={xScale}
                    yScale={yScale}
                    data={data}
                    xValue={xValue}
                    yValue={yValue}
                    tooltipFormat={format('.2s')} />
            </g>
        </svg>
    );
}

export default App;
