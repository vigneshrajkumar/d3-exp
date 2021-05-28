import { useEffect, useState } from 'react'
import { csv } from 'd3'

export function useLineChart(dataURL) {
    const [data, setData] = useState(null)

    useEffect(() => {
        const row = d => {
            d.temperature = +d.temperature;
            d.timestamp = new Date(d.timestamp);
            return d
        };
        csv(dataURL, row)
            .then(resp => {
                setData(resp)
            })
    }, [])

    return data
}