import { RECIPES } from '../data/recipes';
import type { Recipe } from '../types';

export async function fetchRecipes(category?: string): Promise<Recipe[]> {
  // Simulated API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return RECIPES[category || 'All'] || [];
}