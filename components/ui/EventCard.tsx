import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from './Button';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    date: Date;
    image?: string | null;
    price: number;
  };
  onBookNow?: (eventId: string) => void;
  showBookButton?: boolean;
}

export function EventCard({ event, onBookNow, showBookButton = true }: EventCardProps) {
  const categoryColors = {
    MUSIC: 'bg-purple-100 text-purple-800',
    BUSINESS: 'bg-blue-100 text-blue-800',
    CULTURE: 'bg-green-100 text-green-800',
    FAITH: 'bg-yellow-100 text-yellow-800',
    FOOD: 'bg-red-100 text-red-800',
    SPORTS: 'bg-orange-100 text-orange-800',
    TECHNOLOGY: 'bg-indigo-100 text-indigo-800',
    EDUCATION: 'bg-teal-100 text-teal-800',
    ENTERTAINMENT: 'bg-pink-100 text-pink-800',
    OTHER: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span>No Image</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[event.category as keyof typeof categoryColors] || categoryColors.OTHER}`}>
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{event.price === 0 ? 'Free' : `$${event.price}`}</span>
          </div>
        </div>
        
        {showBookButton && onBookNow && (
          <Button
            onClick={() => onBookNow(event.id)}
            className="w-full"
            size="sm"
          >
            Book Now
          </Button>
        )}
      </div>
    </div>
  );
} 