import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const AgeBasedSuggestions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (ageKey, e) => {
    // Stop event propagation to prevent any parent handlers from firing
    if (e) e.stopPropagation();
    
    // Use functional update to ensure we're working with the latest state
    setExpandedCards(prev => ({
      ...prev,
      [ageKey]: !prev[ageKey]
    }));
  };

  const openModal = (ageKey, e) => {
    // Stop event propagation
    if (e) e.stopPropagation();
    setSelectedAge(ageKey);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  const ageGroups = {
    children: {
      title: "Children (0-12)",
      icon: "👶",
      color: "var(--children-color)",
      quickSuggestions: [
        "Educational STEM toys",
        "Age-appropriate books",
        "Creative arts and crafts kits"
      ],
      suggestions: [
        "Educational toys that combine learning with fun",
        "Age-appropriate books to foster reading habits",
        "Creative arts and crafts kits to develop fine motor skills",
        "Outdoor play equipment to encourage physical activity",
        "Board games that the whole family can enjoy together",
        "STEM toys that introduce science and technology concepts",
        "Musical instruments designed for beginners",
        "Dress-up costumes and role-play sets",
        "Building blocks and construction sets",
        "Interactive learning tablets with parental controls"
      ],
      description: "Children are naturally curious and love to explore. Gifts that combine play with learning opportunities are ideal for this age group. Consider the child's developmental stage and interests when selecting a gift. For younger children (0-5), focus on sensory toys and simple games. For older children (6-12), more complex building sets, books, and games that challenge their growing minds are appropriate.",
      considerations: [
        "Safety is paramount - ensure age-appropriate toys without small parts for young children",
        "Durability matters as children can be rough with their belongings",
        "Consider noise levels and space requirements, especially for larger toys",
        "Educational value adds long-term benefits to playtime",
        "Look for toys that grow with the child to extend their usefulness"
      ]
    },
    teenagers: {
      title: "Teenagers (13-19)",
      icon: "🎧",
      color: "var(--teenagers-color)",
      quickSuggestions: [
        "Tech gadgets & accessories",
        "Gift cards for clothing stores",
        "Experience gifts like concert tickets"
      ],
      suggestions: [
        "Tech gadgets like wireless earbuds or portable speakers",
        "Gift cards for their favorite clothing stores",
        "Personalized accessories that match their style",
        "Experience gifts like concert tickets or adventure activities",
        "Gaming accessories or subscriptions to popular platforms",
        "Room décor items that reflect their personality",
        "Trendy sneakers or fashion items",
        "DIY hobby kits based on their interests",
        "Bluetooth-enabled devices for music and connectivity",
        "Subscription boxes tailored to their specific interests"
      ],
      description: "Teenagers are developing their identity and independence. They appreciate gifts that acknowledge their maturity and personal tastes. Technology, fashion, and experiences tend to be highly valued by this age group. Teens also appreciate having control over their choices, so gift cards and customizable items are often well-received.",
      considerations: [
        "Trends change rapidly - research what's currently popular",
        "Respect their developing personal style and preferences",
        "Consider gifts that help them connect with peers",
        "Balance fun with practicality for everyday use",
        "Look for items that help them express their individuality"
      ]
    },
    youngAdults: {
      title: "Young Adults (20-35)",
      icon: "🏠",
      color: "var(--young-adults-color)",
      quickSuggestions: [
        "Home decor & kitchen gadgets",
        "Subscription services",
        "Fitness & wellness products"
      ],
      suggestions: [
        "Home decor items for their living space",
        "Subscription boxes tailored to their interests",
        "Quality kitchen gadgets for cooking enthusiasts",
        "Fitness equipment or wellness products",
        "Professional development tools or courses",
        "Travel accessories for weekend getaways",
        "Smart home devices to automate daily tasks",
        "Specialty coffee or cocktail making kits",
        "Sustainable and eco-friendly lifestyle products",
        "Experience gifts like cooking classes or wine tastings"
      ],
      description: "Young adults are often establishing their careers, homes, and lifestyles. They appreciate practical gifts that enhance their daily lives while also enjoying indulgences they might not purchase for themselves. This age group often values experiences and items that align with their personal values and aspirations.",
      considerations: [
        "Consider their living situation (apartment, house, with roommates)",
        "Think about their career stage and professional needs",
        "Many young adults appreciate sustainable and ethical products",
        "Time-saving devices are valuable for busy professionals",
        "Experiences often create more lasting happiness than physical items"
      ]
    },
    adults: {
      title: "Adults (36-60)",
      icon: "🧘",
      color: "var(--adults-color)",
      quickSuggestions: [
        "Premium everyday items",
        "Self-care & relaxation products",
        "Hobby-related equipment"
      ],
      suggestions: [
        "Premium versions of everyday items they use",
        "Experience gifts like wine tastings or cooking classes",
        "Self-care and relaxation products",
        "Hobby-related tools or equipment",
        "Smart home devices to simplify daily routines",
        "Luxury versions of practical items they wouldn't buy themselves",
        "Subscription services for entertainment or hobbies",
        "Health and wellness technology",
        "Weekend getaways or travel experiences",
        "High-quality accessories like watches, bags, or wallets"
      ],
      description: "Adults in this age range often have established homes and careers. They typically appreciate quality over quantity and value gifts that enhance their existing lifestyle. Many are juggling multiple responsibilities and appreciate items that provide convenience, relaxation, or meaningful experiences with loved ones.",
      considerations: [
        "Focus on quality and durability rather than trendy items",
        "Consider their established hobbies and interests",
        "Many appreciate gifts that create family experiences",
        "Time-saving and stress-reducing items are often valued",
        "Upgrades to items they already use can be thoughtful choices"
      ]
    },
    seniors: {
      title: "Seniors (60+)",
      icon: "👵",
      color: "var(--seniors-color)",
      quickSuggestions: [
        "Comfort items & ergonomic products",
        "Photo frames & memory keepsakes",
        "Easy-to-use technology"
      ],
      suggestions: [
        "Comfort items like plush throws or ergonomic pillows",
        "Photo frames or albums to display cherished memories",
        "Subscription services that deliver regular joy",
        "Practical items that make daily tasks easier",
        "Technology that helps them stay connected with loved ones",
        "Audiobooks or e-readers with adjustable text size",
        "Hobby supplies for crafting, gardening, or other interests",
        "Personalized items featuring family photos or memories",
        "Wellness products for relaxation and self-care",
        "Experience gifts like theater tickets or restaurant gift cards"
      ],
      description: "Seniors often value gifts that enhance comfort, maintain independence, and facilitate connection with loved ones. Many appreciate practical items that solve everyday challenges while also enjoying sentimental gifts that celebrate relationships and memories. Quality time and experiences with family members are often the most treasured gifts of all.",
      considerations: [
        "Prioritize ease of use and accessibility in all gift choices",
        "Consider physical limitations when selecting items",
        "Many seniors are downsizing and may prefer consumable gifts",
        "Technology gifts should be intuitive with good customer support",
        "Gifts that facilitate social connection are particularly valuable"
      ]
    }
  };

  return (
    <section className="age-suggestions-section">
      <Container>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Gift Suggestions by Age
        </motion.h2>
        
        <motion.p 
          className="section-intro"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Finding the perfect gift often depends on the recipient's age and stage of life. 
          Browse our age-specific recommendations to inspire your next gift choice.
        </motion.p>
        
        {/* Horizontal scrolling cards */}
        <div className="age-cards-scroll">
          <Row className="flex-nowrap">
            {Object.keys(ageGroups).map((ageKey, index) => (
              <Col key={ageKey} xs={10} sm={6} md={4} lg={4} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={`age-card ${expandedCards[ageKey] ? 'expanded' : ''}`}
                    style={{ borderColor: ageGroups[ageKey].color }}
                  >
                    <Card.Header 
                      className="age-card-header"
                      style={{ backgroundColor: ageGroups[ageKey].color }}
                      onClick={(e) => toggleExpand(ageKey, e)}
                    >
                      <span className="age-icon">{ageGroups[ageKey].icon}</span>
                      <h3>{ageGroups[ageKey].title}</h3>
                      <span className="expand-icon">
                        {expandedCards[ageKey] ? '−' : '+'}
                      </span>
                    </Card.Header>
                    
                    <Card.Body>
                      <ul className="quick-suggestions">
                        {ageGroups[ageKey].quickSuggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                      
                      <AnimatePresence>
                        {expandedCards[ageKey] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="expanded-content"
                          >
                            <p className="age-description">{ageGroups[ageKey].description}</p>
                            <Button 
                              variant="outline-light" 
                              className="view-more-btn"
                              onClick={(e) => openModal(ageKey, e)}
                              style={{ borderColor: ageGroups[ageKey].color, color: ageGroups[ageKey].color }}
                            >
                              View All Suggestions
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
        
        {/* Modal for detailed view */}
        <Modal 
          show={showModal} 
          onHide={closeModal} 
          centered
          size="lg"
          className="age-modal"
        >
          {selectedAge && (
            <>
              <Modal.Header 
                closeButton
                style={{ backgroundColor: ageGroups[selectedAge].color }}
              >
                <Modal.Title>
                  <span className="modal-icon">{ageGroups[selectedAge].icon}</span>
                  {ageGroups[selectedAge].title} - Gift Guide
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>About This Age Group</h4>
                <p>{ageGroups[selectedAge].description}</p>
                
                <h4>Recommended Gifts</h4>
                <ul className="modal-suggestion-list">
                  {ageGroups[selectedAge].suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
                
                <h4>Key Considerations</h4>
                <ul className="modal-considerations-list">
                  {ageGroups[selectedAge].considerations.map((consideration, index) => (
                    <li key={index}>{consideration}</li>
                  ))}
                </ul>
                
                <div className="modal-tip">
                  <strong>Pro Tip:</strong> When choosing gifts for {ageGroups[selectedAge].title.toLowerCase()}, 
                  consider their specific interests and hobbies for a more personalized touch.
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </section>
  );
};

export default AgeBasedSuggestions;