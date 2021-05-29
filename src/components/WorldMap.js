import { geoGraticule, geoNaturalEarth1, geoPath } from "d3-geo";
import { useWorldMap } from "../hooks/useWorldMap"

import './../world-map.css'

const dataURL = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'


function WorldMap() {

    const data = useWorldMap(dataURL);

    if (!data) {
        return (
            <div>loading...</div>
        )
    }
    console.log(data);

    const width = 960;
    const height = 500;

    const projection = geoNaturalEarth1();
    const path = geoPath(projection);
    const graticule = geoGraticule();

    return (
        <svg height={height} width={width} style={{ border: "2px dashed orange" }}>
            <g className="marks">

                <path className="sphere" d={path({ type: 'Sphere' })}> </path>
                
                <path className="graticules" d={path(graticule())} />

                {data.countries.features.map(feature => (
                    <path className="country" d={path(feature)} />
                ))}

                <path className="interiors" d={path(data.interiors)} />

            </g>
        </svg>
    )
}

export default WorldMap