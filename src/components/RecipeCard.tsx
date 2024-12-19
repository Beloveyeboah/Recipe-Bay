import React from 'react';
import { Clock, Users, Heart } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            recipe.difficulty === 'Medium' ? 'bg-primary-100 text-primary-800' :
            'bg-red-100 text-red-800'
          }`}>
            {recipe.difficulty}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{recipe.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-primary-500" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-primary-500" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-500">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{recipe.likes}</span>
          </button>
        </div>
        
        <div className="mt-4 flex items-center">
          <img
            src={recipe.author.avatar}
            alt={recipe.author.name}
            className="h-6 w-6 rounded-full ring-2 ring-primary-100"
          />
          <span className="ml-2 text-sm text-gray-600">{recipe.author.name}</span>
        </div>
      </div>
    </div>
  );
}