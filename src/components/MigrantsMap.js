import { geoGraticule, geoNaturalEarth1, geoPath } from "d3-geo";
import {scaleSqrt, max} from 'd3';
import { useMigrantsData } from "../hooks/useMigrantsData";
import { useWorldMap } from "../hooks/useWorldMap"

import './../migrant-map.css'

const atlasURL = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'


function WorldMap() {

    const atlasData = useWorldMap(atlasURL);
    const migrantsData = useMigrantsData();

    if (!atlasData || !migrantsData) {
        return (
            <div>loading...</div>
        )
    }

    console.log(migrantsData[0]);

    const width = 960;
    const height = 500;

    const projection = geoNaturalEarth1();
    const path = geoPath(projection);
    const graticule = geoGraticule();

    const sizeValue = d => d['Total Dead and Missing'];
    const maxRadius = 20;
    
    const sizeScale = scaleSqrt()
        .domain([0, max(migrantsData, sizeValue)])
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

                {migrantsData.map(cit => {
                    const [x, y] = projection(cit.loc);
                    return <circle trans cx={x} cy={y} r={sizeScale(sizeValue(cit))}/>
                })}

            </g>
        </svg>
    )
}

export default WorldMap