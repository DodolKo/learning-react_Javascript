/*import basic de motion/react */
import { motion } from 'motion/react'
import './Header.css'

const appName = "Learning React"

const Header = ({title, baseline}) => {
    return (
        <motion.header 
            className="header__container"
            initial={{ scale: 0.1, opacity: 0.0 }}
            animate={{ scale: 1.0, opacity: 1.0 }}
            transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut"
                
            }}
        >
            <div className="header__logo">
                <h1> {title} </h1>
                {baseline &&<h2> {baseline} </h2>}
            </div>


        </motion.header>
    )
}

export default Header

