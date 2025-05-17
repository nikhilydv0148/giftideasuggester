import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const GiftImportance = () => {
  const reasons = [
    {
      title: "Strengthens Relationships",
      description: "Gift-giving is a powerful way to express love and appreciation, strengthening bonds between people.",
      icon: "❤️"
    },
    {
      title: "Creates Lasting Memories",
      description: "A thoughtful gift can create a memory that lasts a lifetime, far beyond the physical item itself.",
      icon: "✨"
    },
    {
      title: "Shows Thoughtfulness",
      description: "Taking time to select the perfect gift demonstrates that you value someone and pay attention to their interests.",
      icon: "🎁"
    },
    {
      title: "Brings Joy",
      description: "The act of giving creates happiness not just for the recipient, but also for the giver - a true win-win.",
      icon: "😊"
    }
  ];

  return (
    <section className="gift-importance-section">
      <Container>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Gift-Giving Matters
        </motion.h2>
        
        <Row>
          {reasons.map((reason, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <motion.div 
                className="importance-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(255, 77, 77, 0.3)' }}
              >
                <div className="importance-icon">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
        
        <motion.div 
          className="importance-quote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <blockquote>
            "The greatest gift is not found in a store nor under a tree, but in the hearts of true friends."
            <cite>— Cindy Lew</cite>
          </blockquote>
        </motion.div>
      </Container>
    </section>
  );
};

export default GiftImportance;