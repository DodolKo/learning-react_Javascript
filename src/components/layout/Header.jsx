/* Version 1.0 du header de base*/

const appName = "Learning React"

const Header = ({title, baseline}) => {
    return (
        <header className="headerContainer">
            <div className="header__logo">
                <h1> {title} </h1>
                <h2> {baseline} </h2>
            </div>


        </header>
    )
}

export default Header