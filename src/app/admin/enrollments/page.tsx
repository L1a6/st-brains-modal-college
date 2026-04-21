'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { safeJsonFetch } from '@/lib/safeJsonFetch';

interface Enrollment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  message?: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'rejected';
  notes?: string;
  created_at: string;
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const data = await safeJsonFetch<{ enrollments?: Enrollment[] }>('/api/admin/enrollments');
      setEnrollments(data.enrollments || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Enrollment['status']) => {
    try {
      await fetch('/api/admin/enrollments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchEnrollments();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteEnrollment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enrollment?')) return;
    
    try {
      await fetch(`/api/admin/enrollments?id=${id}`, {
        method: 'DELETE',
      });
      fetchEnrollments();
    } catch (error) {
      console.error('Error deleting enrollment:', error);
    }
  };

  const filteredEnrollments = filter === 'all'
    ? enrollments
    : enrollments.filter(e => e.status === filter);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    contacted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    enrolled: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const filterCount = (status: string) => {
    if (status === 'all') return enrollments.length;
    return enrollments.filter(e => e.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#E62A2A] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading enrollments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="font-outfit text-2xl sm:text-4xl font-light text-gray-900 dark:text-white">
            Enrollments
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredEnrollments.length} {filteredEnrollments.length === 1 ? 'result' : 'results'}
          </div>
        </div>

        {/* Filter Buttons - Responsive Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6 sm:mb-8">
          {['all', 'pending', 'contacted', 'enrolled', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`relative px-3 py-2.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-[#0A1236] text-white dark:bg-white dark:text-[#0A1236] shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="block truncate">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
              <span className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full text-xs font-bold ${
                filter === status
                  ? 'bg-[#E62A2A] text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {filterCount(status)}
              </span>
            </button>
          ))}
        </div>

        {filteredEnrollments.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
            <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">No enrollments found.</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredEnrollments.map((enrollment, index) => (
                <motion.div
                  key={enrollment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-4 sm:p-5">
                    {/* Top Row - Name and Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white text-lg truncate">
                          {enrollment.full_name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(enrollment.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <select
                        value={enrollment.status}
                        onChange={(e) => updateStatus(enrollment.id, e.target.value as Enrollment['status'])}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColors[enrollment.status]} border-0 cursor-pointer flex-shrink-0`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      <a 
                        href={`mailto:${enrollment.email}`}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E62A2A] dark:hover:text-[#E62A2A] transition-colors"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{enrollment.email}</span>
                      </a>
                      <a 
                        href={`tel:${enrollment.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E62A2A] dark:hover:text-[#E62A2A] transition-colors"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{enrollment.phone}</span>
                      </a>
                    </div>

                    {/* Message */}
                    {enrollment.message && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {enrollment.message}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end pt-3 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => deleteEnrollment(enrollment.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {enrollment.full_name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <div>{enrollment.email}</div>
                            <div>{enrollment.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {enrollment.message || 'No message'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={enrollment.status}
                            onChange={(e) => updateStatus(enrollment.id, e.target.value as Enrollment['status'])}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[enrollment.status]} border-0 cursor-pointer`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => deleteEnrollment(enrollment.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
