import React from 'react';
import { Globe } from 'lucide-react';

const cuisines = [
  {
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b',
    description: 'From pasta to pizza, explore authentic Italian recipes.'
  },
  {
    name: 'Japanese',
    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10',
    description: 'Discover the art of Japanese cooking and sushi making.'
  },
  {
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
    description: 'Spice up your kitchen with traditional Mexican dishes.'
  }
];

export function FeaturedSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Global Cuisines
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a culinary journey around the world with our diverse collection of authentic recipes from different cultures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cuisines.map((cuisine) => (
            <div key={cuisine.name} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
              <img
                src={cuisine.image}
                alt={cuisine.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Globe className="h-5 w-5 text-emerald-600 mr-2" />
                  <h3 className="text-xl font-semibold">{cuisine.name} Cuisine</h3>
                </div>
                <p className="text-gray-600">{cuisine.description}</p>
                <button className="mt-4 text-emerald-600 font-medium hover:text-emerald-700">
                  Explore recipes →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}