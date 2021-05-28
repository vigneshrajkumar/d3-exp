import { csv } from 'd3'
import { useEffect, useState } from "react";

export const useScatterPlotData = (url) =>{
    const [data, setData] = useState(null)

    useEffect(() => {

        const row = d => {
            d.sepal_length = +d.sepal_length
            d.sepal_width = +d.sepal_width
            d.petal_length = +d.petal_length
            d.petal_width = +d.petal_width
            return d
        }

        csv(url, row).then(csvResp => {
            setData(csvResp)
        });
    }, []);

    return data
}
