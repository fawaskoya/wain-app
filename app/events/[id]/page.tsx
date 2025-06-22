'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { MapPin, Calendar, DollarSign, User, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock event data
const mockEvent = {
  id: '1',
  title: 'Qatar International Food Festival',
  description: 'Experience the finest cuisines from around the world in the heart of Doha. This year\'s festival brings together over 50 international chefs, local culinary experts, and food enthusiasts for a week-long celebration of gastronomy. From traditional Qatari dishes to innovative fusion cuisine, there\'s something for every palate. The event includes cooking demonstrations, food tastings, cultural performances, and interactive workshops. Don\'t miss this opportunity to explore the diverse flavors that make Qatar a culinary destination.',
  category: 'FOOD',
  location: 'Katara Cultural Village, Doha',
  date: new Date('2024-03-15T18:00:00'),
  image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
  price: 50,
  host: {
    name: 'Qatar Tourism Authority',
    email: 'events@qatar-tourism.qa',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  capacity: 500,
  remainingTickets: 127,
  tags: ['Food', 'Culture', 'International', 'Family-Friendly'],
};

export default function EventDetailPage() {
  const params = useParams();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookNow = async () => {
    setIsBooking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    setBookingSuccess(true);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        {mockEvent.image && (
          <Image
            src={mockEvent.image}
            alt={mockEvent.title}
            fill
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[mockEvent.category as keyof typeof categoryColors] || categoryColors.OTHER}`}>
                {mockEvent.category}
              </span>
              <span className="text-white/80 text-sm">
                {mockEvent.remainingTickets} tickets remaining
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {mockEvent.title}
            </h1>
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{format(mockEvent.date, 'EEEE, MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{format(mockEvent.date, 'h:mm a')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{mockEvent.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {mockEvent.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mockEvent.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hosted By</h2>
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={mockEvent.host.image}
                    alt={mockEvent.host.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {mockEvent.host.name}
                  </h3>
                  <p className="text-gray-600">{mockEvent.host.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {mockEvent.price === 0 ? 'Free' : `$${mockEvent.price}`}
                </div>
                <div className="text-sm text-gray-600">
                  per ticket
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{mockEvent.capacity} people</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium text-green-600">
                    {mockEvent.remainingTickets} tickets
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {format(mockEvent.date, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">
                    {format(mockEvent.date, 'h:mm a')}
                  </span>
                </div>
              </div>

              {bookingSuccess ? (
                <div className="text-center">
                  <div className="text-green-600 mb-2">✓ Booking Successful!</div>
                  <p className="text-sm text-gray-600 mb-4">
                    Check your email for confirmation and QR code.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setBookingSuccess(false)}
                  >
                    Book Another Ticket
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleBookNow}
                  disabled={isBooking || mockEvent.remainingTickets === 0}
                  className="w-full"
                  size="lg"
                >
                  {isBooking ? 'Processing...' : mockEvent.remainingTickets === 0 ? 'Sold Out' : 'Book Now'}
                </Button>
              )}

              {mockEvent.remainingTickets <= 10 && mockEvent.remainingTickets > 0 && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
                  <p className="text-sm text-orange-800 text-center">
                    ⚠️ Only {mockEvent.remainingTickets} tickets left!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 