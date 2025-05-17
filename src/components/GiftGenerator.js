import React from 'react';
import { motion } from 'framer-motion';
import { Form, Button, Row, Col } from 'react-bootstrap';

const GiftGenerator = ({ 
  occasions, 
  tags, 
  selectedOccasion, 
  setSelectedOccasion, 
  selectedTags, 
  setSelectedTags, 
  handleSearch 
}) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <motion.div 
      className="generator-section"
      id="generator"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">Find Your Perfect Gift</h2>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Occasion</Form.Label>
              <Form.Select 
                value={selectedOccasion} 
                onChange={(e) => setSelectedOccasion(e.target.value)}
              >
                <option value="">Any Occasion</option>
                {occasions.map((occasion, index) => (
                  <option key={index} value={occasion}>{occasion}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Tags (Optional)</Form.Label>
              <div className="tag-selector">
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    className={`tag-chip ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => toggleTag(tag)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="search-btn" onClick={handleSearch}>
              Find Gifts
            </Button>
          </motion.div>
        </div>
      </Form>
    </motion.div>
  );
};

export default GiftGenerator;