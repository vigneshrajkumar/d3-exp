import {geoPath } from "d3-geo";
import { useChennaiMap } from "../hooks/useChennaiMap"

import './../chennai-map.css'

const dataURL = 'https://raw.githubusercontent.com/mickeykedia/India-Maps/master/Chennai/Chennai.geojson'


function WorldMap() {

    const data = useChennaiMap(dataURL);

    if (!data) {
        return (
            <div>loading...</div>
        )
    }
    console.log("geojson", data);

    const width = 960;
    const height = 500;

    const path = geoPath();

    return (
        <svg height={height} width={width} style={{ border: "2px dashed orange" }}>
            <g className="marks">
                {data.features.map(feature => (
                    <path d={path(feature)} />
                ))}
            </g>
        </svg>
    )
}

export default WorldMap