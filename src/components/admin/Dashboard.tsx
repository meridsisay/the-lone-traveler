'use client';

import { useState } from 'react';
import { FiHome, FiImage, FiMap, FiSettings, FiUser, FiCalendar } from 'react-icons/fi';
import DestinationManager from './DestinationManager';
import PhotoManager from './PhotoManager';

type Tab = 'overview' | 'photos' | 'destinations' | 'profile' | 'settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'photos':
        return <PhotoManager />;
      case 'destinations':
        return <DestinationManager />;
      case 'profile':
        return (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Profile management functionality will be implemented in a future update.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Site Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Site settings functionality will be implemented in a future update.</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats Card */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FiImage className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Total Photos
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              24
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FiMap className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Destinations
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              8
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FiCalendar className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            This Month
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              3 new posts
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            Added new photo "Northern Lights"
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            2 days ago
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            Updated destination "Kyoto, Japan"
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            5 days ago
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            Added new destination "Santorini, Greece"
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            1 week ago
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setActiveTab('photos')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiImage className="mr-2 -ml-1 h-5 w-5" />
                  Manage Photos
                </button>
                <button
                  onClick={() => setActiveTab('destinations')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FiMap className="mr-2 -ml-1 h-5 w-5" />
                  Manage Destinations
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as Tab)}
          >
            <option value="overview">Overview</option>
            <option value="photos">Photos</option>
            <option value="destinations">Destinations</option>
            <option value="profile">Profile</option>
            <option value="settings">Settings</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                <FiHome className="mr-2 h-5 w-5 inline" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`${
                  activeTab === 'photos'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                <FiImage className="mr-2 h-5 w-5 inline" />
                Photos
              </button>
              <button
                onClick={() => setActiveTab('destinations')}
                className={`${
                  activeTab === 'destinations'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                <FiMap className="mr-2 h-5 w-5 inline" />
                Destinations
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                <FiUser className="mr-2 h-5 w-5 inline" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                <FiSettings className="mr-2 h-5 w-5 inline" />
                Settings
              </button>
            </nav>
          </div>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Dashboard; 