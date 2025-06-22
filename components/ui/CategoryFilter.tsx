import React from 'react';
import { Button } from './Button';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'ALL', name: 'All Events' },
  { id: 'MUSIC', name: 'Music' },
  { id: 'BUSINESS', name: 'Business' },
  { id: 'CULTURE', name: 'Culture' },
  { id: 'FAITH', name: 'Faith' },
  { id: 'FOOD', name: 'Food' },
  { id: 'SPORTS', name: 'Sports' },
  { id: 'TECHNOLOGY', name: 'Technology' },
  { id: 'EDUCATION', name: 'Education' },
  { id: 'ENTERTAINMENT', name: 'Entertainment' },
  { id: 'OTHER', name: 'Other' },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="text-sm"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
} 