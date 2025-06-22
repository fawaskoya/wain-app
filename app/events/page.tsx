'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCard } from '@/components/ui/EventCard';
import { CategoryFilter } from '@/components/ui/CategoryFilter';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Qatar International Food Festival',
    description: 'Experience the finest cuisines from around the world in the heart of Doha.',
    category: 'FOOD',
    location: 'Katara Cultural Village, Doha',
    date: new Date('2024-03-15T18:00:00'),
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    price: 50,
  },
  {
    id: '2',
    title: 'Doha Jazz Night',
    description: 'An evening of smooth jazz music featuring local and international artists.',
    category: 'MUSIC',
    location: 'The Pearl, Doha',
    date: new Date('2024-03-20T20:00:00'),
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    price: 75,
  },
  {
    id: '3',
    title: 'Tech Innovation Summit',
    description: 'Join industry leaders for discussions on the future of technology in Qatar.',
    category: 'TECHNOLOGY',
    location: 'Qatar National Convention Centre',
    date: new Date('2024-03-25T09:00:00'),
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    price: 200,
  },
  {
    id: '4',
    title: 'Traditional Qatari Art Exhibition',
    description: 'Discover the rich cultural heritage through contemporary Qatari art.',
    category: 'CULTURE',
    location: 'Museum of Islamic Art, Doha',
    date: new Date('2024-03-30T10:00:00'),
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    price: 0,
  },
  {
    id: '5',
    title: 'Qatar Business Forum 2024',
    description: 'Connect with business leaders and explore investment opportunities in Qatar.',
    category: 'BUSINESS',
    location: 'Sheraton Grand Doha Resort',
    date: new Date('2024-04-05T08:00:00'),
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    price: 150,
  },
  {
    id: '6',
    title: 'Islamic Finance Conference',
    description: 'Learn about the latest developments in Islamic finance and banking.',
    category: 'BUSINESS',
    location: 'Qatar Financial Centre',
    date: new Date('2024-04-10T09:00:00'),
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    price: 100,
  },
  {
    id: '7',
    title: 'Qatar Sports Day Celebration',
    description: 'Join the national celebration of sports and fitness activities.',
    category: 'SPORTS',
    location: 'Aspire Zone, Doha',
    date: new Date('2024-02-13T06:00:00'),
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    price: 0,
  },
  {
    id: '8',
    title: 'Arabic Calligraphy Workshop',
    description: 'Learn the art of Arabic calligraphy from master calligraphers.',
    category: 'CULTURE',
    location: 'Souq Waqif Art Center',
    date: new Date('2024-03-28T14:00:00'),
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    price: 25,
  },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('ALL');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter === 'FREE') {
      matchesPrice = event.price === 0;
    } else if (priceFilter === 'PAID') {
      matchesPrice = event.price > 0;
    } else if (priceFilter === 'UNDER_50') {
      matchesPrice = event.price > 0 && event.price <= 50;
    } else if (priceFilter === 'UNDER_100') {
      matchesPrice = event.price > 0 && event.price <= 100;
    }
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleBookNow = (eventId: string) => {
    // TODO: Implement booking functionality
    console.log('Booking event:', eventId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Events</h1>
          <p className="text-lg text-gray-600">
            Find amazing events happening in Qatar
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Prices</option>
                <option value="FREE">Free Events</option>
                <option value="PAID">Paid Events</option>
                <option value="UNDER_50">Under $50</option>
                <option value="UNDER_100">Under $100</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredEvents.length} Events Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              <span>Filtered Results</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all categories.
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 