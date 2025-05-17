import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Row, Col } from 'react-bootstrap';

const GiftGrid = ({ gifts }) => {
  return (
    <div>
      <h2 className="section-title">Gift Ideas</h2>
      
      {gifts.length === 0 ? (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>No gifts found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </motion.div>
      ) : (
        <Row>
          <AnimatePresence>
            {gifts.map((gift, index) => (
              <Col key={gift.id} lg={4} md={6} className="mb-4">
                <motion.div 
                  className="gift-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 15px 30px rgba(255, 77, 77, 0.3)',
                  }}
                >
                  <img src={gift.image} alt={gift.title} className="gift-image" />
                  <div className="gift-content">
                    <span className="occasion-badge">{gift.occasion[0]}</span>
                    <h3 className="gift-title">{gift.title}</h3>
                    <p className="gift-description">{gift.description}</p>
                    <div className="gift-tags">
                      {gift.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>
      )}
    </div>
  );
};

export default GiftGrid;