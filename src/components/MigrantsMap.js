import { geoGraticule, geoNaturalEarth1, geoPath } from "d3-geo";
import { scaleSqrt, max } from 'd3';

import './../migrant-map.css'
import { useMemo } from "react";

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 20;

function MigrantsMap({ migrantsData, filteredData, atlasData }) {

    const projection = geoNaturalEarth1();
    const path = geoPath(projection);
    const graticule = geoGraticule();

    const sizeScale = useMemo(
        () => scaleSqrt()
            .domain([0, max(migrantsData, sizeValue)])
            .range([0, maxRadius]),
        [migrantsData, sizeValue, maxRadius]
    );

    return (
        <g >
            {useMemo(
                    () =>
                        <>
                            <path className="sphere" d={path({ type: 'Sphere' })} />
                            <path className="graticules" d={path(graticule())} />

                            {atlasData.countries.features.map(feature => (
                                <path className="country" d={path(feature)} />
                            ))}
                            <path className="interiors" d={path(atlasData.interiors)} />
                        </>,
                    [path, graticule, atlasData]
                )}

            {filteredData.map(cit => {
                const [x, y] = projection(cit.loc);
                return <circle trans cx={x} cy={y} r={sizeScale(sizeValue(cit))} />
            })}
        </g >
    )
}

export default MigrantsMap;