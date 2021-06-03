import { useEffect, useState } from 'react'
import { csv } from 'd3'


const dataURL = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv'

export function useMigrantsData() {
    const [data, setData] = useState(null)
    const transform = d => {
        d['Reported Date'] = new Date(d['Reported Date']);
        d['Total Dead and Missing'] = +d['Total Dead and Missing'];
        return d;
    }
    useEffect(() => {
        csv(dataURL, transform)
        .then(setData)
    }, [])
    return data
}