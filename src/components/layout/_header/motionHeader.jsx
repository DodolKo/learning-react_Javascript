/*import basic de motion/react */
import { motion } from 'motion/react'
import { useViewport } from '@/hooks/useViewport'
import { useUserStore } from '@/stores/UserStore'
import { useDateTime } from '@/hooks/useDateTime'
import { useEffect, useRef } from 'react'
import './Header.css'

/**
 * Composant MotionHeader - Header animé avec gestion responsive
 * Responsabilité : Affichage uniquement (logique d'initialisation externalisée)
 * 
 * @param {string} title - Titre à afficher
 */
const MotionHeader = ({title}) => {
    // === HOOKS ===
    // Gestion responsive (viewport)
    const { width, isMobile, isTablet, isDesktop } = useViewport();
    
    // Données utilisateur (statiques)
    const { user } = useUserStore();
    
    // Données date/heure (dynamiques, auto-initialisées)
    const { currentDateTime, isLoaded: isDateTimeLoaded } = useDateTime();
    
    // === REFS ===
    // Tracking des changements d'appareil pour les logs
    const lastDeviceType = useRef(null);
    
    // === EFFECTS ===
    // Log des changements de type d'appareil (debug uniquement)
    useEffect(() => {
        const currentDeviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
        
        if (lastDeviceType.current !== currentDeviceType) {
            console.log(`📱 Device changed: ${lastDeviceType.current || 'Unknown'} → ${currentDeviceType} (${width}px)`);
            lastDeviceType.current = currentDeviceType;
        }
    }, [isMobile, isTablet, isDesktop, width]);
    
    // === RENDER ===
    return (
        <motion.header 
            className="header__container"
            initial={{ scale: 1.0, opacity: 1.0, x: -width}}
            animate={{ scale: 1.0, opacity: 1.0, x: 0}}
            transition={{
                duration: 0.50,
                delay: 0.25,
                ease: "backInOut",
            }}
        >
            <motion.div 
                className="header__logo"
            >
                {/* Titre avec nom utilisateur */}
                {title && <h1> Hey,<span className='userName'> {user.name} </span>!</h1>}
                
                {/* Date et heure en temps réel */}
                {isDateTimeLoaded && (
                    <motion.h2
                        initial={{ x: -width/2 }}
                        animate={{ x: 0 }}
                        transition={{
                            duration: 0.50,
                            delay: 0.50,
                            ease: "backInOut"
                        }}
                    > 
                        {currentDateTime.date} - {currentDateTime.time} 
                    </motion.h2>
                )}
            </motion.div>
        </motion.header>
    )
}

export default MotionHeader

