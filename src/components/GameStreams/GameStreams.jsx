import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getGameStreams } from '../../services/streams.service';
import { Link } from 'react-router-dom';


export default function GameStreams() {

    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);

    let location  = useLocation();
    let { slug }  = useParams();

    useEffect( () => {
        const fetchData = async () => {
            try {
                const gameStreamsData = await getGameStreams(location.state.gameId);
                setStreamData(gameStreamsData);

                let totalViewers = gameStreamsData.reduce( (acc, val) => {
                    return acc + val.viewer_count;
                }, 0)

                console.log(gameStreamsData)

                setViewers(totalViewers);
                setStreamData(gameStreamsData);

            } catch(error) {
                console.error('Error fetching game streams:', error);
            }
        }
        fetchData();
    }, [])


    return (
        <div className="game-streams">
            <div className="game-streams__heading">
                <h1>{ slug }</h1>
                <span>{ viewers }</span>
            </div>

            <div className="game-streams__wrapper">
                { streamData?.map( (stream, i) => (
                    <Link 
                        to={{
                        pathname: `/live/${stream.login}`
                        }} 
                        key={i} 
                        className="game-streams__card"
                    >
                        <figure>
                            <img src={ stream.thumbnail_url } alt="" />
                        </figure>
                        <figcaption>
                            <h2>{stream.user_name}</h2>
                            <span className="game-streams__viewers">{ stream.viewer_count }</span>
                        </figcaption>
                    </Link>
                ))}
            </div>

        </div>
    )
}