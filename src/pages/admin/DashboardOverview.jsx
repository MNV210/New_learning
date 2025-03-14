import React from 'react';
import { 
  UsersIcon, 
  BookOpenIcon, 
  AcademicCapIcon, 
  DocumentChartBarIcon 
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample data for charts
const userActivityData = [
  { name: 'Jan', activeUsers: 400 },
  { name: 'Feb', activeUsers: 550 },
  { name: 'Mar', activeUsers: 600 },
  { name: 'Apr', activeUsers: 750 },
  { name: 'May', activeUsers: 800 },
  { name: 'Jun', activeUsers: 950 },
];

const courseCompletionData = [
  { name: 'Course A', completed: 45, total: 80 },
  { name: 'Course B', completed: 65, total: 90 },
  { name: 'Course C', completed: 35, total: 70 },
  { name: 'Course D', completed: 55, total: 60 },
  { name: 'Course E', completed: 25, total: 50 },
];

function DashboardOverview() {
  const statCards = [
    {
      title: 'Total Users',
      value: '1,247',
      icon: <UsersIcon className="w-8 h-8 text-blue-600" />,
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Active Courses',
      value: '34',
      icon: <BookOpenIcon className="w-8 h-8 text-green-600" />,
      change: '+5%',
      changeType: 'positive',
    },
    {
      title: 'Course Completions',
      value: '156',
      icon: <AcademicCapIcon className="w-8 h-8 text-purple-600" />,
      change: '+18%',
      changeType: 'positive',
    },
    {
      title: 'Avg. Quiz Score',
      value: '78%',
      icon: <DocumentChartBarIcon className="w-8 h-8 text-yellow-600" />,
      change: '+3%',
      changeType: 'positive',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">{card.title}</p>
                <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
                <span className={`inline-block mt-2 text-sm font-medium ${
                  card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {card.change} from last month
                </span>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">User Activity (Last 6 Months)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Course Completion Rates</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#3b82f6" />
                <Bar dataKey="total" fill="#93c5fd" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {[
            { user: 'Sarah Chen', action: 'completed', item: 'JavaScript Fundamentals', time: '2 hours ago' },
            { user: 'James Wilson', action: 'enrolled in', item: 'React for Beginners', time: '5 hours ago' },
            { user: 'Maria Garcia', action: 'scored 95% on', item: 'CSS Grid Quiz', time: '1 day ago' },
            { user: 'Alex Johnson', action: 'submitted', item: 'Final Project', time: '2 days ago' },
            { user: 'Emma Williams', action: 'received certificate for', item: 'Web Development Course', time: '3 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center py-3 border-b border-gray-200 last:border-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold mr-4">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                  <span className="font-medium">{activity.item}</span>
                </p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview; 