import { useEffect, useState } from 'react'
import { csv, scaleBand, scaleLinear, max } from 'd3'

const dataURL = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 20 }

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = (d) => {
            d.Population = +d['2020'];
            return d;
        };
        csv(dataURL, row).then((respData) => {
            setData(respData.slice(0, 10));
        });
    }, []);

    if (!data) {
        return <div>loading...</div>;
    }

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right


    const yScale = scaleBand()
        .domain(data.map(d => d.Country))
        .range([0, innerHeight]);

    const xScale = scaleLinear()
        .domain([0, max(data, d => d.Population)])
        .range([0, innerWidth]);

    return (
        <svg width={width} height={height} style={{ border: "2px dashed green" }}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {data.map((d) => (
                    <rect
                        key={d.Country}
                        y={yScale(d.Country)}
                        width={xScale(d.Population)}
                        height={yScale.bandwidth()}
                    />
                ))}
            </g>
        </svg>
    );
}

export default App;
