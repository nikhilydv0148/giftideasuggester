import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="footer-text">
            Made with <span className="heart">❤️</span> by Nikhil Yadav
          </p>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;