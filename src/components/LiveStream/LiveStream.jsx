import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLiveStream, getStreamedGame, getUserByLogin } from '../../services/live.service';

export default function LiveStream() {

    let { slug } = useParams();

    let [infoStream, setInfoStream] = useState([]);
    let [streamer, setStreamer] = useState([]);
    let [infoGame, setInfoGame] = useState([]);

    const fetchStreamData = async () => {
        try {
            const liveStreamData = await getLiveStream(slug);

            if(liveStreamData.length === 0) {
                setInfoStream({
                    status: false
                })
            } else {
                let streamStatus = liveStreamData.map( stream => ({...stream, status: true}));

                let gameId = liveStreamData.map( stream => (stream.game_id));

                const streamedGameData = await getStreamedGame(gameId);
                let gameName = streamedGameData.map( game => game.name);
    
                const streamerData = await getUserByLogin(slug);
    
                setStreamer(streamerData[0]);
                setInfoStream(streamStatus[0]);
                setInfoGame(gameName);
            }

        } catch(error) {
            console.error('Error fetching live stream:', error);
        }
    }

    useEffect( () => {
        fetchStreamData();
    }, [slug]);

    return (

            <div className="live">
                <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}></ReactTwitchEmbedVideo>
                <div className="live__wrapper">
                    <div className="live__profile">

                        {   infoStream.status === true ? 

                            <>
                                <figure className={ infoStream.type === 'live' ? 'is-streaming' : ''}>
                                    <img src={ streamer.profile_image_url } alt="" />
                                </figure>
                                <figcaption>
                                    <div className="live__name">{ infoStream.user_name }</div>
                                    <h2 className="live__title">{ infoStream.title }</h2>
                                    <div className="live__game">{ infoGame } <span>{ infoStream.language }</span></div>
                                </figcaption>
                            </>

                            : 

                            ``

                        }
                        
                    </div>
                </div>
            </div>


    )
}