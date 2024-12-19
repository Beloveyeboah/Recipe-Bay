import React from 'react';
import { RecipeCard } from './RecipeCard';
import { useRecipes } from '../hooks/useRecipes';
import { Loader } from 'lucide-react';

interface RecipeGridProps {
  category?: string;
}

export function RecipeGrid({ category }: RecipeGridProps) {
  const { recipes, loading, error } = useRecipes(category);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}