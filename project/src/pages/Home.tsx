import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedMerchants from '../components/home/FeaturedMerchants';
import Features from '../components/home/Features';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CitiesSection from '../components/home/CitiesSection';
import CTASection from '../components/home/CTASection';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string, category: string, location: string) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (location) params.append('location', location);
    
    navigate(`/merchants?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <Hero onSearch={handleSearch} />
      <StatsSection />
      <Categories />
      <FeaturedMerchants />
      <CitiesSection />
      <TestimonialsSection />
      <Features />
      <CTASection />
    </div>
  );
};

export default Home;