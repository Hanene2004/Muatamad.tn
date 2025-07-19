import { motion } from 'framer-motion';
import React from 'react';

const AnimatedCard = ({ children, className = '', ...props }) => (
  <motion.div
    whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
    className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export default AnimatedCard; 