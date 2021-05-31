import { geoPath, geoIdentity } from "d3-geo";
import { useState } from "react";
import { useChennaiMap } from "../hooks/useChennaiMap"

import './../chennai-map.css'

const dataURL = 'https://raw.githubusercontent.com/mickeykedia/India-Maps/master/Chennai/Chennai.geojson'


function WorldMap() {

    const data = useChennaiMap(dataURL);
    const [currentWard, setCurrentWard] = useState(null);

    if (!data) {
        return (
            <div>loading...</div>
        )
    }

    const updateCurrentWard = ward => {
        setCurrentWard(ward)
    }

    
    const width = 960;
    const height = 600;

    const projection = geoIdentity();
    projection.fitSize([width, height], data);
    const path = geoPath(projection);

    return (
        <g>
            <text>  {currentWard == null ? "hover over a ward" : currentWard.WARD_NO + ' ' + currentWard.ZONE_NAME} </text>
            <svg transform="scale(1, -1)" height={height} width={width} style={{ border: "2px dashed orange" }}>
                <g>
                    {data.features.map(feature => {
                        const { properties } = feature;
                        return <path d={path(feature)} stroke="red" fill="white" onMouseEnter={e => updateCurrentWard(properties)} onMouseLeave={ e => updateCurrentWard(null)} />
                    })}
                </g>
            </svg>
        </g>

    )
}

export default WorldMap