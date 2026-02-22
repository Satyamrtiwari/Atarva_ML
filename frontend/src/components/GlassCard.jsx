import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = true }) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' } : {}}
            className={`glass-card p-6 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
