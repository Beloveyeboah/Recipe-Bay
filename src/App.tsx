import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { DiscoverSection } from './components/DiscoverSection';
import { FeaturedSection } from './components/FeaturedSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <AboutSection />
      <DiscoverSection />
      <FeaturedSection />
    </div>
  );
}

export default App;