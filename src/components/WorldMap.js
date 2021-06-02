import { geoGraticule, geoNaturalEarth1, geoPath } from "d3-geo";
import {scaleSqrt, max} from 'd3';
import { useCities } from "../hooks/useCities";
import { useWorldMap } from "../hooks/useWorldMap"

import './../world-map.css'

const atlasURL = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

const citiesURL = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

function WorldMap() {

    const atlasData = useWorldMap(atlasURL);
    const citiesData = useCities(citiesURL);

    if (!atlasData || !citiesData) {
        return (
            <div>loading...</div>
        )
    }

    const width = 960;
    const height = 500;

    const projection = geoNaturalEarth1();
    const path = geoPath(projection);
    const graticule = geoGraticule();

    const sizeValue = d => d.population;
    const maxRadius = 20;
    
    const sizeScale = scaleSqrt()
        .domain([0, max(citiesData, sizeValue)])
        .range([0, maxRadius]);
   

    return (
        <svg height={height} width={width} style={{ border: "2px dashed orange" }}>
            <g className="marks">

                <path className="sphere" d={path({ type: 'Sphere' })}> </path>
                
                <path className="graticules" d={path(graticule())} />

                {atlasData.countries.features.map(feature => (
                    <path className="country" d={path(feature)} />
                ))}

                <path className="interiors" d={path(atlasData.interiors)} />

                {citiesData.map(cit => {
                    const [x, y] = projection([cit.lng, cit.lat]);
                    return <circle trans cx={x} cy={y} r={sizeScale(sizeValue(cit))}/>
                })}

            </g>
        </svg>
    )
}

export default WorldMap