/*import basic de motion/react */
import { motion } from 'motion/react'
import { useViewport } from '@/hooks/useViewport'
import { useUserStore } from '@/stores/UserStore'
import { useDateTimeStore } from '@/stores/DateTimeStore'
import { useEffect, useRef } from 'react'
import './Header.css'

const MotionHeader = ({title, baseline}) => {
    const { width, isMobile, isTablet, isDesktop } = useViewport();
    const { user, initializeUser } = useUserStore();
    const { currentDateTime, initializeDateTime } = useDateTimeStore();
    const lastDeviceType = useRef(null);
    
    // Initialiser l'utilisateur au montage du composant
    useEffect(() => {
        // Ne charger que si l'utilisateur n'est pas déjà chargé
        if (!user.isLoaded) {
            initializeUser().then((userData) => {
                if (userData) {
                    console.log('✅ Utilisateur chargé depuis JSON:', userData);
                }
            });
        }
    }, []); // Tableau vide pour éviter les re-renders
    
    // Initialiser la date/heure au montage du composant
    useEffect(() => {
        const cleanup = initializeDateTime();
        return cleanup; // Cleanup du timer
    }, []);
    
    // Log uniquement quand le type d'appareil change
    useEffect(() => {
        const currentDeviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
        
        if (lastDeviceType.current !== currentDeviceType) {
            console.log(`📱 Device changed: ${lastDeviceType.current || 'Unknown'} → ${currentDeviceType} (${width}px)`);
            lastDeviceType.current = currentDeviceType;
        }
    }, [isMobile, isTablet, isDesktop, width]);
    
    return (
        <motion.header 
            className="header__container"
            initial={{ scale: 1.0, opacity: 1.0, x: -width}}
            animate={{ scale: 1.0, opacity: 1.0, x: 0}}
            transition={{
                duration: 0.25,
                delay: 0.4,
                ease: "easeOut"
            }}
        >
            <div className="header__logo">
                {title && <h1> Hey, {user.name} !</h1>}
                {currentDateTime.isLoaded && 
                    ( <h2> {currentDateTime.date} - {currentDateTime.time} </h2>)
                }
            </div>


        </motion.header>
    )
}

export default MotionHeader

