import { useEffect, useState } from 'react'
import { json } from 'd3'
import { feature } from 'topojson'

export function useChennaiMap(dataURL) {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        json(dataURL)
            .then(topology => {
                                                
                setData(topology)
            })
    }, [])

    // useEffect(() => {
    //     json(dataURL)
    //         .then(topology => {
    //             const {countries} = topology.objects;
    //             setData({
    //                 countries: feature(topology, countries),
    //                 interiors: mesh(topology, countries, (a, b) => a !== b)
    //             })
    //         })
    // }, [])

    return data
}