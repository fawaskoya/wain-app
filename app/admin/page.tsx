'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Check, X, Eye, User, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock data for pending events
const mockPendingEvents = [
  {
    id: '1',
    title: 'Doha Jazz Night',
    description: 'An evening of smooth jazz music featuring local and international artists.',
    category: 'MUSIC',
    location: 'The Pearl, Doha',
    date: new Date('2024-03-20T20:00:00'),
    price: 75,
    host: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    createdAt: new Date('2024-02-15T10:30:00'),
  },
  {
    id: '2',
    title: 'Qatar Tech Meetup',
    description: 'Monthly meetup for tech enthusiasts and professionals.',
    category: 'TECHNOLOGY',
    location: 'Qatar Science & Technology Park',
    date: new Date('2024-03-25T18:00:00'),
    price: 0,
    host: {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
    },
    createdAt: new Date('2024-02-16T14:20:00'),
  },
  {
    id: '3',
    title: 'Arabic Poetry Night',
    description: 'Celebrate Arabic literature with poetry readings and discussions.',
    category: 'CULTURE',
    location: 'Souq Waqif Art Center',
    date: new Date('2024-03-28T19:00:00'),
    price: 25,
    host: {
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@example.com',
    },
    createdAt: new Date('2024-02-17T09:15:00'),
  },
];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState(mockPendingEvents);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session && session.user?.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  const handleApprove = async (eventId: string) => {
    setIsProcessing(eventId);
    try {
      // TODO: Implement API call to approve event
      console.log('Approving event:', eventId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error approving event:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleReject = async (eventId: string) => {
    setIsProcessing(eventId);
    try {
      // TODO: Implement API call to reject event
      console.log('Rejecting event:', eventId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error rejecting event:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
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
    return colors[category as keyof typeof colors] || colors.OTHER;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-lg text-gray-600">
              Moderate and manage events in the platform
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected Today</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Events Pending Approval ({events.length})
            </h2>
          </div>

          {events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Host
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                              {event.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {event.price === 0 ? 'Free' : `$${event.price}`}
                            </span>
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{format(event.date, 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {event.host.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {event.host.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {format(event.createdAt, 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/events/${event.id}`, '_blank')}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(event.id)}
                            disabled={isProcessing === event.id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {isProcessing === event.id ? (
                              'Processing...'
                            ) : (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(event.id)}
                            disabled={isProcessing === event.id}
                            className="text-red-600 hover:text-red-700 border-red-300"
                          >
                            {isProcessing === event.id ? (
                              'Processing...'
                            ) : (
                              <>
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </>
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Check className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">
                No events are currently pending approval.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 