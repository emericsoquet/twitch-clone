import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getGameStreams } from '../../services/streams.service';
import { getStreamedGame } from '../../services/live.service';
import { Link } from 'react-router-dom';


export default function GameStreams() {

    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);
    const [gameData, setGameData] = useState([]);

    let location  = useLocation();
    let { slug }  = useParams();

    useEffect( () => {
        const fetchData = async () => {
            try {
                const gameStreamsData = await getGameStreams(location.state.gameId);

                let totalViewers = gameStreamsData.reduce( (acc, val) => {
                    return acc + val.viewer_count;
                }, 0)

                const game = await getStreamedGame(location.state.gameId);

                setViewers(totalViewers);
                setStreamData(gameStreamsData);
                setGameData(game[0]);

            } catch(error) {
                console.error('Error fetching game streams:', error);
            }
        }
        fetchData();
    }, [location.state.gameId])

    console.log(streamData);


    return (
        <>
            { streamData && viewers && gameData && (
                <div className="game-streams">

                    <div className="game-streams__container">


                        <div className="game-streams__wrapper">
                            <div className="game-streams__heading">
                                <figure>
                                    <img src={ gameData.box_art_url } alt={`Couverture pour ${gameData.name}`} />
                                </figure>
                                <h1>{ slug }</h1>
                                <p>{ viewers }</p>
                            </div>
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
                                        <span className="game-streams__viewers">{ stream.viewer_count }</span>
                                    </figure>
                                    <figcaption>
                                        <img src={ stream.avatar } alt="" />
                                        <div className="game-streams__data">
                                            <h2>{stream.user_name}</h2>
                                            <p>{stream.title}</p>
                                        </div>
                                    </figcaption>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}