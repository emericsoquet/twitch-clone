import { useState, useEffect } from 'react'
import api from '../../api'

export default function Games() {

    const [games, setGames] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            const res = await api.get('https://api.twitch.tv/helix/games/top');

            let resArray = res.data.data;
            let dataArray = resArray.map( game => {
                let url = game.box_art_url
                .replace("{width}", "250")
                .replace("{height}", "300")

                game.box_art_url = url;
                return game;
            });

            setGames(dataArray);
        }
        fetchData();
    }, [])

    console.log(games)

    return (
        <section className="games">
            <h2 className="games__title">Most popular games</h2>
            
            <div className="games__wrapper">
                {games?.map((game, index) => (
                    <article key={index} className="game">
                        <img src={game.box_art_url} className="game__cover" alt={ 'Couverture de ' + game.name } />
                        <div className="game__card">
                            <h3 className="game__title">{game.name}</h3>
                            <button className="game__link">Regarder {game.name}</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}