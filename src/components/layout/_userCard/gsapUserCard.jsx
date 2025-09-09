import React, { useRef } from "react";
import './UserCard.css';

const GsapUserCard = ({userName, userSurname, userClass, userAge, className=""}) => {
    const cardRef = useRef(null);

    return (
        <div 
            ref={cardRef}
            className={`user-card ${className}`}
        >
            <h3>{userName} {userSurname}</h3>
            {userAge && <p>Âge: {userAge} ans</p>}
            {userClass && <p>Classe: {userClass}</p>}
        </div>
    );
};

export default GsapUserCard;
