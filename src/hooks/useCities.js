import { useEffect, useState } from 'react'
import { csv } from 'd3'

export function useCities(dataURL) {
    const [data, setData] = useState(null)
    
    const tras = d => {
        d.lat = +d.lat
        d.lng = +d.lng
        return d
    }

    useEffect(() => {
        csv(dataURL, tras)
        .then( d => setData(d))
    }, [])
    return data
}