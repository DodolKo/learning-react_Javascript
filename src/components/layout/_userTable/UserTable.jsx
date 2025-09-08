import React from "react";
import UserCard from "@/components/layout/_userCard/UserCard";
import UsersData from "@/data/UsersData.json";
import './UserTable.css';

const UserTable = () => {
    return (
        <div className="user-table">
            <h2 className="user-table__title">Liste des Utilisateurs</h2>
            <div className="user-table__grid">
                {UsersData.map((user) => (
                    <UserCard
                        key={user.id}
                        userName={user.userName}
                        userSurname={user.userSurname}
                        userClass={user.userClass}
                        userAge={user.userAge}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserTable;