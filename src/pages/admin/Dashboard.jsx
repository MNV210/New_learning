import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  UsersIcon, 
  BookOpenIcon, 
  ChartBarIcon, 
  BellIcon, 
  Cog6ToothIcon, 
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Cog6ToothIcon className="w-6 h-6" />, path: '/admin' },
    { id: 'users', name: 'User Management', icon: <UsersIcon className="w-6 h-6" />, path: '/admin/users' },
    { id: 'courses', name: 'Course Management', icon: <BookOpenIcon className="w-6 h-6" />, path: '/admin/courses' },
    { id: 'analytics', name: 'Reports & Analytics', icon: <ChartBarIcon className="w-6 h-6" />, path: '/admin/analytics' },
    { id: 'notifications', name: 'Notifications', icon: <BellIcon className="w-6 h-6" />, path: '/admin/notifications' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">E-Learning Admin</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.id} className="px-2 py-1">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 rounded-lg ${
                    activePage === item.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActivePage(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button 
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {sidebarItems.find(item => item.id === activePage)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <BellIcon className="w-6 h-6 text-gray-600" />
              </button>
              <div className="ml-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="ml-2 text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard; 