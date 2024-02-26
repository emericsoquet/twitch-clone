import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { getLiveStream, getUserByLogin } from '../../services/live.service';
import Error from '../Error/Error'

export default function Results() {

    let { slug } = useParams();

    const [result, setResult] = useState(true);
    const [streamer, setStreamer] = useState([]);

    let cleanSearch = slug.replace(/ /g, '');

    useEffect( () => {
        const fetchData = async () => {
            const streamerData = await getUserByLogin(cleanSearch);

            if(streamerData.length === 0) {
                setResult(false);
            } else {
                setResult(true);

                let streamerLogin = streamerData[0].login;
                const streamerStatus = await getLiveStream(streamerLogin);

                console.log(streamerStatus)

                if(streamerStatus.length === 0) {
                    setStreamer(streamerData.map( streamer => ({...streamer, status: false})))
                } else {
                    setStreamer(streamerData.map( streamer => ({...streamer, status: true})))
                }
                

            }
        } 
        fetchData();
    }, [cleanSearch])

    return (

        result ? 
            <>
                <div className="results">
                    <div className="results__container">
                        <div className="results__wrapper">
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

                                    { streamer.status ?  <span className="results__status">Live</span> : '' }
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        : 
            <Error></Error>
    )
}