/*import basic de gsap */
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import './Header.css'

const GsapHeader = ({title, baseline}) => {
    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            // Reproduire les animations Motion exactement
            gsap.fromTo(
                headerRef.current, 
                    { scale: 1.0, opacity: 0.0, y: -64}, 
                    { scale: 1.0, opacity: 1.0, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
            );
        }
    }, );

    return (
        <header 
            ref={headerRef}
            className="header__container"
        >
            <div className="header__logo">
                <h1> {title} </h1>
                {baseline &&<h2> {baseline} </h2>}
            </div>
        </header>
    )
}

export default GsapHeader
