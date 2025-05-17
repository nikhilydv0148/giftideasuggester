import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import GiftGrid from './components/GiftGrid';
import GiftImportance from './components/GiftImportance';
import AgeBasedSuggestions from './components/AgeBasedSuggestions';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import giftData from './data/gifts.json';
import './App.css';

function App() {
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredGifts, setFilteredGifts] = useState(giftData);

  // Filter gifts based on selected occasion and tags
  useEffect(() => {
    let filtered = giftData;
    
    if (selectedOccasion) {
      filtered = filtered.filter(gift => 
        gift.occasion.includes(selectedOccasion)
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(gift => 
        selectedTags.every(tag => gift.tags.includes(tag))
      );
    }
    
    setFilteredGifts(filtered);
  }, [selectedOccasion, selectedTags]);

  return (
    <div className="app">
      <ThemeToggle />
      <HeroSection />
      <Container>
        <FilterSection 
          selectedOccasion={selectedOccasion}
          setSelectedOccasion={setSelectedOccasion}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <GiftGrid gifts={filteredGifts} />
        <GiftImportance />
        <AgeBasedSuggestions />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
