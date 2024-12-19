import React from 'react';
import { BookOpen, Share2, Heart, Users2 } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Recipe Collection',
    description: 'Access thousands of curated recipes from experienced home cooks and professional chefs worldwide.'
  },
  {
    icon: Share2,
    title: 'Share Your Creations',
    description: 'Upload and share your favorite recipes with our growing community of food enthusiasts.'
  },
  {
    icon: Heart,
    title: 'Save Favorites',
    description: 'Build your personal cookbook by saving recipes you love and want to try later.'
  },
  {
    icon: Users2,
    title: 'Community Driven',
    description: 'Connect with fellow food lovers, share cooking tips, and get inspired by others\' culinary adventures.'
  }
];

export function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Recipe Bay
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Recipe Bay is your ultimate destination for discovering, sharing, and celebrating the joy of cooking. 
            Whether you're a seasoned chef or just starting your culinary journey, our platform provides everything 
            you need to explore new flavors and share your kitchen adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
              alt="Cooking together"
              className="w-full max-w-4xl mx-auto rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary-500/20 to-transparent"></div>
          </div>
          <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of food enthusiasts who have already made Recipe Bay their go-to platform 
            for culinary inspiration and recipe sharing.
          </p>
        </div>
      </div>
    </section>
  );
}