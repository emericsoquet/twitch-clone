import { useEffect, useState } from 'react';
import { getTopStreams } from '../../services/streams.service';

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
            { topStreams?.map( (stream, index) => (
                <a href="#" key={index} className="preview">
                    <img className="preview__stream"
                         src={ stream.thumbnail_url } 
                         alt="" 
                    />
                    <div className="preview__info-box">
                        <img src={ stream.box_art_url } className="preview__game" alt="" />
                        <figure className="preview__streamer">
                            <img src={ stream.truePic } className="streamer__pic" alt="" />
                            <figcaption className="streamer__name">{stream.user_name}</figcaption>
                        </figure>
                        <p className="preview__name">{stream.game_name}</p>
                    </div>
                </a>
            ))}
        </div>
    )
}