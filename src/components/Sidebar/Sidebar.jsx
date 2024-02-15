import { useState, useEffect } from 'react';

import formatLongNumbers from '../../utils/formatLongNumbers';
import { getTopStreams } from '../../services/streams.service';

import { Link } from 'react-router-dom';

export default function Sidebar() {

    const [topStreams, setTopStreams] = useState([])
    const fetchData = async () => {
        try {
            const topStreamsData = await getTopStreams('fr');
            setTopStreams(topStreamsData)
        } catch(error) {
            console.error('Error fetching top streams:', error);
        }
    }

    useEffect( () => {
        fetchData();
    }, [])

    return (
        <div className="sidebar">
            <h2 className="sidebar__title">
                Chaînes recommandées
            </h2>
            <div className="sidebar__list">
                { topStreams?.map( (stream, index) => (
                    <Link 
                        to = {{ pathname: `/live/${ stream.user_login }`}}
                        className="stream" key={index}
                    >

                        <img src={ stream.truePic } alt={ `Profile picture for ${ stream.user_name}` } className="stream__profile-pic" />

                        <div className="stream__infos">
                            <div className="stream__user">{ stream.user_name }</div>
                            <div className="stream__game">{ stream.game_name }</div>
                        </div>

                        <div className="stream__viewers">
                            {formatLongNumbers(stream.viewer_count)}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}