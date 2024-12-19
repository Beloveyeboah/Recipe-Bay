import React from 'react';
import { CategoryFilter } from '../CategoryFilter';
import { RecipeGrid } from '../RecipeGrid';

export function DiscoverSection() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Discover Recipes</h2>
          <p className="text-gray-600 mb-6">
            Explore our collection of delicious recipes from various cuisines around the world.
          </p>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <RecipeGrid category={selectedCategory} />
      </div>
    </section>
  );
}