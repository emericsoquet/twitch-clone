import Logo from '../../assets/media/logoTwitch.svg'
import SearchButton from '../../assets/media/iconSearch.svg'
import iconBrowse from '../../assets/media/iconBrowse.svg'

export default function Header() {
    return(
        <header className="header">
            <nav className="header__nav">

                <div className="header__menu">
                    <a href="" className="header__logo">
                        <img src={Logo} alt="Logo Twitch"  />
                    </a>

                    <a href="" className="header__browse-link">
                        <img src={iconBrowse} alt="Browse" />
                        Browse
                    </a>

                    <div className="header__list">
                        <button className="header__toggle">
                            <span></span><span></span><span></span>
                        </button>
                        <ul>
                            <li><a href="">Top Games</a></li>
                            <li><a href="">Top Streams</a></li>
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