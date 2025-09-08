import React from "react";
import './UserCard.css';

const UserCard = ({userName, userSurname, userClass, userAge, className=""}) => {
    return (
        <div className={`user-card ${className}`}>
            <h3>{userName} {userSurname}</h3>
            {userAge && <p>Âge: {userAge} ans</p>}
            {userClass && <p>Classe: {userClass}</p>}
        </div>
    );
};

export default UserCard;