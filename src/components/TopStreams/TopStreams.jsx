import { useEffect, useState } from 'react';
import { getTopStreams } from '../../services/streams.service';
import { Link } from 'react-router-dom';

export default function TopStreams() {

    const [topStreams, setTopStreams] = useState([])
    const fetchData = async () => {
        try {
            const topStreamsData = await getTopStreams();
            setTopStreams(topStreamsData)
        } catch(error) {
            console.error('Error fetching top streams:', error);
        }
    }

    useEffect( () => {
        fetchData();
    }, [])

    return (
        <div className="top-streams">
            <div className="top-streams__container">
                <div className="top-streams__wrapper">
                    { topStreams?.map( (stream, index) => (
                        <Link to="/" key={index} className="preview">
                            <figure className="preview__stream">
                                <img 
                                    src={ stream.thumbnail_url } 
                                    alt="" 
                                />
                            </figure>
                            <div className="preview__info-box">
                                <img src={ stream.box_art_url } className="preview__game" alt="" />
                                <div className="preview__infos">
                                    <figure className="preview__streamer">
                                        <img src={ stream.truePic } className="streamer__pic" alt="" />
                                        <figcaption className="streamer__name">{stream.user_name}</figcaption>
                                    </figure>
                                    <p className="preview__name">{stream.game_name}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
            </div>
        </div>
    )
}