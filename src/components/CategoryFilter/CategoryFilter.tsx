import React from 'react';
import { CUISINE_CATEGORIES, type CuisineCategory } from '../../constants/categories';

interface CategoryFilterProps {
  selectedCategory: CuisineCategory;
  onSelectCategory: (category: CuisineCategory) => void;
  isLoading?: boolean;
  className?: string;
}

export function CategoryFilter({ 
  selectedCategory, 
  onSelectCategory, 
  isLoading = false,
  className = ''
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="Recipe categories"
      className={`flex space-x-2 overflow-x-auto pb-2 hide-scrollbar ${className}`}
    >
      {CUISINE_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          disabled={isLoading}
          aria-current={category === selectedCategory ? 'page' : undefined}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            ${category === selectedCategory 
              ? 'bg-primary-500 text-white' 
              : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
            }`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}