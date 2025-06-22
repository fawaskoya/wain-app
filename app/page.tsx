'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCard } from '@/components/ui/EventCard';
import { CategoryFilter } from '@/components/ui/CategoryFilter';

// Mock data for featured events
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
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (eventId: string) => {
    // TODO: Implement booking functionality
    console.log('Booking event:', eventId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Events in Qatar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            From cultural festivals to business conferences, find your next unforgettable experience
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, locations, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse All Events
              </Button>
            </Link>
            <Link href="/host">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Host an Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Events
            </h2>
            <p className="text-lg text-gray-600">
              Discover the most exciting upcoming events in Qatar
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/events">
              <Button size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">Events This Month</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Happy Attendees</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-300">Event Categories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
