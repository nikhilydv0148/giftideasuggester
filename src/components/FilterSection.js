import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const FilterSection = ({ selectedOccasion, setSelectedOccasion, selectedTags, setSelectedTags }) => {
  const [searchInput, setSearchInput] = useState('');
  
  const occasions = [
    'Birthday', 'Anniversary', 'Wedding', 'Graduation', 
    'Christmas', 'Valentine\'s Day', 'Housewarming', 'Baby Shower'
  ];
  
  const availableTags = [
    'Tech', 'Cute', 'Handmade', 'Budget-Friendly', 'Luxury', 
    'Practical', 'Personalized', 'Eco-Friendly', 'Unique', 'Trendy'
  ];
  
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() && !selectedTags.includes(searchInput.trim())) {
      setSelectedTags([...selectedTags, searchInput.trim()]);
      setSearchInput('');
    }
  };
  
  const clearFilters = () => {
    setSelectedOccasion('');
    setSelectedTags([]);
  };
  
  return (
    <motion.div 
      className="filter-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Find Your Perfect Gift</h2>
      
      <Form>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Select Occasion</Form.Label>
              <Form.Control 
                as="select" 
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
              >
                <option value="">All Occasions</option>
                {occasions.map((occasion, index) => (
                  <option key={index} value={occasion}>{occasion}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Search Tags</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Search or add a tag"
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <div className="tag-container mb-4">
          <p className="mb-2">Popular Tags:</p>
          <div className="tags-grid">
            {availableTags.map((tag, index) => (
              <motion.button
                key={index}
                type="button"
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagToggle(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
        
        {selectedTags.length > 0 && (
          <div className="selected-tags mb-3">
            <p>Selected Tags:</p>
            <div className="tags-list">
              {selectedTags.map((tag, index) => (
                <motion.span 
                  key={index} 
                  className="selected-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {tag}
                  <button 
                    type="button" 
                    className="remove-tag"
                    onClick={() => handleTagToggle(tag)}
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          </div>
        )}
        
        <div className="filter-actions">
          <Button 
            variant="outline-secondary" 
            onClick={clearFilters}
            disabled={!selectedOccasion && selectedTags.length === 0}
          >
            Clear Filters
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default FilterSection;