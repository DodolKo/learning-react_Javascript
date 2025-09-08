/* Version 1.0 du header de base*/
import './Header.css'

const Header = ({title, baseline}) => {
    return (
        <header className="header__container">
            <div className="header__logo">
                <h1> {title} </h1>
                <h2> {baseline} </h2>
            </div>
        </header>
    )
}

export default Header