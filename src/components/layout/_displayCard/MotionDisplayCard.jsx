import React, { useState } from "react";
import { motion } from "motion/react";

import './DisplayCard.css'


const card = {
    title: "card_title",
    subtitle: "card_subtitle",
        
    text: "card_text"
}

const DisplayCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div 
            className="displaycard-container"
            whileHover="hover"
            initial="initial"
            animate={isExpanded ? "expanded" : "normal"}
            variants={{
                normal: {
                    position: "relative",
                    scale: 1,
                    zIndex: 1
                },
                expanded: {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    scale: 1.2,
                    zIndex: 1000,
                    width: "auto",
                    height: "auto",
                    transition: { duration: 0.3, ease: "easeOut" }
                }
            }}
            onClick={handleClick}
        >
            {/* Image en arrière-plan */}
            <div className="displaycard-image">
                <img src="/placeholder.png" alt="placeholder_img" />
            </div>

            {/* Contenu par-dessus */}
            <motion.div 
                className="displaycard-header"
                variants={{
                    initial: { opacity: 0, y: -20, },
                    hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" }}
                }}
            >
                <h1> {card.title} </h1>
                <h2> {card.subtitle} </h2>
            </motion.div>

            <motion.div 
                className="displaycard-information"
                variants={{
                    initial: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" }}
                }}
            >
                <p> {card.text} </p>
            </motion.div>
        </motion.div>
    ) 
}

export default DisplayCard