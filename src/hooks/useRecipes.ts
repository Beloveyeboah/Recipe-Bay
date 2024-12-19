import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/api';
import type { Recipe } from '../types';

export function useRecipes(category?: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipes(category);
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [category]);

  return { recipes, loading, error };
}