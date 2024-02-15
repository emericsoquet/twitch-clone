import { useState, useEffect } from 'react'
import api from '../../services/api.service';
import { Link } from 'react-router-dom';

export default function Games() {

    const [games, setGames] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            const res = await api.get('https://api.twitch.tv/helix/games/top');

            let resArray = res.data.data;
            let dataArray = resArray.map( game => {
                let url = game.box_art_url
                .replace("{width}", "370")
                .replace("{height}", "538")

                game.box_art_url = url;
                return game;
            });

            setGames(dataArray);
        }
        fetchData();
    }, []);

    console.log(games);

    return (
        <section className="games">
            
            
            <div className="games__container">
                <div className="games__wrapper">
                    {games?.map((game, index) => (
                        <Link 
                        to={{ 
                            pathname: '/game/' + game.name,
                        }}
                        state={{gameId: game.id }}
                        key={index} className="game">
                            <img src={game.box_art_url} className="game__cover" alt={ 'Couverture de ' + game.name } />
                        </Link>
                        
                    ))}
                </div>
            </div>
            
        </section>
    )
}