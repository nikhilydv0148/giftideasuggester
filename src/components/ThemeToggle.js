import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      // Switch to light mode
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark mode
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <motion.div 
      className="theme-toggle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDarkMode ? (
        <span className="theme-icon">☀️</span>
      ) : (
        <span className="theme-icon">🌙</span>
      )}
    </motion.div>
  );
};

export default ThemeToggle;