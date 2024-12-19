import React from 'react';
import { Search, PlusCircle, User } from 'lucide-react';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo />
            <div className="hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              <PlusCircle className="h-5 w-5" />
              <span>Add Recipe</span>
            </button>
            <button className="p-2 rounded-full hover:bg-primary-50">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}