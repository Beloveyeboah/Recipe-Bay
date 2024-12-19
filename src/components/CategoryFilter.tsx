import React from 'react';

const categories = [
  'All',
  'Italian',
  'Japanese',
  'Mexican',
  'Indian',
  'Thai',
  'Mediterranean',
  'American',
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
            ${category === selectedCategory 
              ? 'bg-primary-500 text-white' 
              : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}