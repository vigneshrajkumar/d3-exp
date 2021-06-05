import MigrantsHistogram from './MigrantsHistogram'
import MigrantsMap from './MigrantsMap'
import { useMigrantsData } from '../hooks/useMigrantsData'
import { useWorldMap } from "../hooks/useWorldMap"
import { useState } from 'react';


const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

const xValue = d => d['Reported Date'];

function MigrantData() {
    
    const migrantsData = useMigrantsData();
    const atlasURL = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'
    const atlasData = useWorldMap(atlasURL);

    const [brushExtent, setBrushExtent] = useState();
    
    if (!atlasData || !migrantsData) {
        return (
            <div>loading...</div>
        )
    }
 
    const filteredData =  brushExtent ? migrantsData.filter(d => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
    }) : migrantsData;

    return (
        <svg height={height} width={width} style={{ border: "2px dashed orange" }}>
            <MigrantsMap  migrantsData={filteredData} atlasData={atlasData} />
            <g transform={`translate(0, ${height - (height * dateHistogramSize)})`}>
                <MigrantsHistogram migrantsData={migrantsData}  height={height * dateHistogramSize} width={width} setBrushExtent={setBrushExtent} xValue={xValue}/>
            </g>
        </svg>
    )
};

export default MigrantData;