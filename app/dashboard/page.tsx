'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus, Calendar, MapPin, Users, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCard } from '@/components/ui/EventCard';

// Mock data for user's events
const mockHostedEvents = [
  {
    id: '1',
    title: 'Qatar International Food Festival',
    description: 'Experience the finest cuisines from around the world in the heart of Doha.',
    category: 'FOOD',
    location: 'Katara Cultural Village, Doha',
    date: new Date('2024-03-15T18:00:00'),
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    price: 50,
    status: 'APPROVED',
    attendees: 127,
    capacity: 500,
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
    status: 'PENDING',
    attendees: 0,
    capacity: 200,
  },
];

// Mock data for user's tickets
const mockTickets = [
  {
    id: '1',
    eventTitle: 'Tech Innovation Summit',
    eventDate: new Date('2024-03-25T09:00:00'),
    eventLocation: 'Qatar National Convention Centre',
    qrCode: 'QR123456789',
    status: 'CONFIRMED',
  },
  {
    id: '2',
    eventTitle: 'Traditional Qatari Art Exhibition',
    eventDate: new Date('2024-03-30T10:00:00'),
    eventLocation: 'Museum of Islamic Art, Doha',
    qrCode: 'QR987654321',
    status: 'CONFIRMED',
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'hosted' | 'tickets'>('hosted');

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-lg text-gray-600">
                Welcome back, {session.user?.name}
              </p>
            </div>
            <Link href="/host">
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Host New Event
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{mockHostedEvents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockHostedEvents.reduce((sum, event) => sum + event.attendees, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockHostedEvents.filter(event => event.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">My Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{mockTickets.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('hosted')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'hosted'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Hosted Events ({mockHostedEvents.length})
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tickets'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Tickets ({mockTickets.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'hosted' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Hosted Events</h2>
                </div>

                {mockHostedEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockHostedEvents.map((event) => (
                      <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative h-48 bg-gray-200">
                          {event.image && (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {event.title}
                          </h3>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{format(event.date, 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="w-4 h-4 mr-2" />
                              <span>{event.attendees} / {event.capacity} attendees</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Link href={`/events/${event.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Calendar className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events hosted yet</h3>
                    <p className="text-gray-500 mb-6">
                      Start by creating your first event and share it with the community.
                    </p>
                    <Link href="/host">
                      <Button size="lg">
                        <Plus className="w-5 h-5 mr-2" />
                        Host Your First Event
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Tickets</h2>
                </div>

                {mockTickets.length > 0 ? (
                  <div className="space-y-4">
                    {mockTickets.map((ticket) => (
                      <div key={ticket.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {ticket.eventTitle}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>{format(ticket.eventDate, 'MMM dd, yyyy • h:mm a')}</span>
                              <span>{ticket.eventLocation}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              QR: {ticket.qrCode}
                            </div>
                            <div className="text-sm text-green-600">
                              {ticket.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <MapPin className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
                    <p className="text-gray-500 mb-6">
                      Start exploring events and book your first ticket.
                    </p>
                    <Link href="/events">
                      <Button size="lg">
                        Browse Events
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 