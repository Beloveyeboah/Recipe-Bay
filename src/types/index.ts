export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  author: {
    name: string;
    avatar: string;
  };
  ingredients: string[];
  instructions: string[];
  likes: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}