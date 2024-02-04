import Logo from '../../assets/media/logoTwitch.svg';
import SearchButton from '../../assets/media/iconSearch.svg';
import iconBrowse from '../../assets/media/iconBrowse.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {

    const [showNav, setShowNav] = useState(false);
    const expandMenu = () => {
        setShowNav(!showNav);
    }

    return(
        <header className="header">
            <nav className="header__nav">

                <div className="header__menu">
                    <Link to="/" className="header__link header__logo">
                        <img src={Logo} alt="Logo Twitch"  />
                    </Link>

                    <Link to="/" className="header__browse-link">
                        <img src={iconBrowse} alt="Browse" />
                        Browse
                    </Link>

                    <div className="header__list">
                        <button className="header__toggle" onClick={ expandMenu }>
                            <span></span><span></span><span></span>
                        </button>
                        <ul className={ showNav ? 'is-active' : ''}>
                            <li>
                                <Link to="/" className="header__link">Top Games</Link>
                            </li>
                            <li>
                                <Link to="/top-streams">Top Streams</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <form className="header__search">
                    <input type="text" className="search__input" placeholder="Rechercher" />
                    <button type="submit" className="search__submit">
                        <img src={SearchButton} alt="" />
                    </button>
                </form>

                

            </nav>
        </header>
    )
}