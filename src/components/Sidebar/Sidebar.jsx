import { useState, useEffect } from 'react'
import api from '../../api'

export default function Sidebar() {

    const [topStreams, setTopStreams] = useState([])

    useEffect( () => {
        const fetchData = async () => {
            const res = await api.get('https://api.twitch.tv/helix/streams');
            let resData = res.data.data;

            setTopStreams(resData);

            let gamesId = resData.map( stream => (stream.game_id));
            let usersId = resData.map( stream => (stream.user_id));

            // Création des URLs personnalités
            let baseGameURL = 'https://api.twitch.tv/helix/games?';
            let baseUserURL = 'https://api.twitch.tv/helix/users?';

            let queryParamsGame = '';
            let queryParamsUser = '';

            const requestElementById = async (arr, req, baseUrl) => {

                arr.map( id => (req = req + `id=${id}&`) );
                let url = baseUrl + req;
                
                let res = await api.get(url);
                let resData = res.data.data;

                return resData
            }

            Promise.all([
                requestElementById(gamesId, queryParamsGame, baseGameURL),
                requestElementById(usersId, queryParamsUser, baseUserURL)
            ]).then(([games, users]) => {
                let listTopStreams = resData.map( stream => {

                    stream.gameName = '';
                    stream.truePic = '';
                    stream.login = '';

                    games.forEach(game => {
                        users.forEach(user => {
                            if(stream.user_id === user.id && stream.game_id === game.id) {
                                stream.truePic = user.profile_image_url;
                                stream.gameName = game.name;
                                stream.login = user.login;
                            }
                        })
                    })

                    return stream
                })
                
                setTopStreams(listTopStreams.slice(0,10))
            })
            
            
        }
        fetchData();
    }, [])

    console.log(topStreams)

    return (
        <div className="sidebar">
            <h2 className="sidebar__title">
                Chaînes recommandées
            </h2>
            <ul className="sidebar__list">
                { topStreams?.map( (stream, index) => (
                    <li className="stream" key={index}>

                        <img src={ stream.truePic } alt={ `Profile picture for ${ stream.user_name}` } className="stream__profile-pic" />

                        <div className="stream__infos">
                            <div className="stream__user">{ stream.user_name }</div>
                            <div className="stream__game">{ stream.game_name }</div>
                        </div>

                        <div className="stream__viewers">
                            {stream.viewer_count}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}