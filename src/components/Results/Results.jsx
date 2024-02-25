import { useState } from 'react';
import {Link, useParams} from 'react-router-dom';

export default function Results() {

    let { slug } = useParams();

    const [result, setResult] = useState(true);


    return (
        <>
            <h1>bjr</h1>
        </>
    )
}