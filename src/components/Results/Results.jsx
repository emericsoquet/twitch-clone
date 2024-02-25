import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { getUserByLogin } from '../../services/live.service';

export default function Results() {

    let { slug } = useParams();

    const [result, setResult] = useState(true);
    const [streamer, setStreamer] = useState([]);

    let cleanSearch = slug.replace(/ /g, '');

    useEffect( () => {
        const fetchData = async () => {
            const data = await getUserByLogin(cleanSearch);
            setStreamer(data);
        } 
        fetchData();
    }, [slug])

    console.log(streamer);

    return (
        <>
            <div className="results">
                { streamer.map( (streamer, index) => (
                    <Link className="results__card" key={index}
                        to={{
                            pathname: `/live/${streamer.login}`
                        }}
                    >
                        <figure>
                            <img src={streamer.profile_image_url} alt="" />
                        </figure>
                        <figcaption>
                            <h3>{streamer.display_name}</h3>
                            <p>{streamer.description}</p>
                        </figcaption>
                    </Link>
                ))}
            </div>
        </>
    )
}