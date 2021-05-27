import { csv } from 'd3'
import { useEffect, useState } from 'react'

const dataURL = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'

// this is a custom hook; being exported as a named export
// you'll be able to import this only by the name 'useData'
export const useData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = (d) => {
            d.Population = +d['2020'] * 1000;
            return d;
        };
        csv(dataURL, row).then((respData) => {
            setData(respData.slice(0, 10));
        });
    }, []);

    return data;
}