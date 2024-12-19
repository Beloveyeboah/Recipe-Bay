import React from 'react';
import { ChefHat, Users, Utensils } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover & Share Amazing Recipes
            </h1>
            <p className="text-lg mb-8 text-primary-100">
              Join our community of food enthusiasts. Find inspiration, share your culinary creations, and explore dishes from around the world.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center bg-primary-500/20 px-4 py-2 rounded-full">
                <ChefHat className="h-6 w-6 mr-2" />
                <span>10,000+ Recipes</span>
              </div>
              <div className="flex items-center bg-primary-500/20 px-4 py-2 rounded-full">
                <Users className="h-6 w-6 mr-2" />
                <span>Active Community</span>
              </div>
              <div className="flex items-center bg-primary-500/20 px-4 py-2 rounded-full">
                <Utensils className="h-6 w-6 mr-2" />
                <span>All Cuisines</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
              alt="Cooking"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary-500/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}