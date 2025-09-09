import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

// Enregistrer le plugin Flip
gsap.registerPlugin(Flip);
import GsapUserCard from "@/components/layout/_userCard/gsapUserCard";
import UsersData from "@/data/UsersData.json";
import './UserTable.css';

const GsapUserTable = () => {
    const tableRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        if (tableRef.current && gridRef.current) {
            const cards = gridRef.current.children;
            
            // 1. D'abord, cacher les cartes
            gsap.set(cards, { scale: 1.0, opacity: 0.0, x: 256 });
            
            // 2. Animation du tableau (titre + grille)
            gsap.fromTo(tableRef.current, { opacity: 0, y: -20 }, {
                opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
                onComplete: () => {
                    // 3. Puis animation des cartes avec stagger
                    gsap.to(cards, { scale: 1.0, opacity: 1.0, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.15 });
                }
            });
        }
    }, []);

    // Animation de repositionnement avec GSAP Flip (documentation officielle)
    useEffect(() => {
        let timeoutId;
        
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (gridRef.current) {
                    const cards = gridRef.current.children;
                    
                    // 1. Capturer l'état actuel (selon la doc)
                    const state = Flip.getState(cards);
                    
                    // 2. Faire les changements (le DOM se met à jour automatiquement)
                    // Le reflow se fait automatiquement avec le redimensionnement
                    
                    // 3. Animer depuis l'état précédent (selon la doc)
                    Flip.from(state, {
                        duration: 0.5,
                        ease: "power2.out",
                        stagger: 0.1,
                        absolute: true // Important pour les positions absolues
                    });
                }
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div ref={tableRef} className="user-table">
            <h2 className="user-table__title">Liste des Utilisateurs</h2>
            <div ref={gridRef} className="user-table__grid">
                {UsersData.map((user) => (
                    <GsapUserCard
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

export default GsapUserTable;
