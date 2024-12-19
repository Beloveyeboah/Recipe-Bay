import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-primary-500 p-2 rounded-lg">
        <UtensilsCrossed className="h-6 w-6 text-white" />
      </div>
      <span className="text-2xl font-bold text-primary-600">Recipe Bay</span>
    </div>
  );
}