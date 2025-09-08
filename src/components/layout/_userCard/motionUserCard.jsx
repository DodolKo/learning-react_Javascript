import React from "react";
import { motion } from 'motion/react';
import './UserCard.css';

const UserCard = ({userName, userSurname, userClass, userAge, className=""}) => {
    return (
        <motion.div 
            className={`user-card ${className}`}
            initial={{ scale: 0.8, opacity: 0.0 }}
            animate={{ scale: 1.0, opacity: 1.0 }}
            transition={{
                duration: 0.4,
                ease: "easeOut"
            }}
        >
            <h3>{userName} {userSurname}</h3>
            {userAge && <p>Âge: {userAge} ans</p>}
            {userClass && <p>Classe: {userClass}</p>}
        </motion.div>
    );
};

export default UserCard;