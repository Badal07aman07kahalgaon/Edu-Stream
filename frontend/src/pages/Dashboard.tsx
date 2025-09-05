import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpenIcon, 
  PlayIcon,
  ClockIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_courses: 0,
    enrolled_courses: 0,
    completed_lessons: 0,
    total_lessons: 0,
    completion_percentage: 0
  });
  const [progress, setProgress] = useState<Array<{
    id: number;
    title: string;
    thumbnail: string;
    completed_lessons: number;
    total_lessons: number;
  }>>([]);
  const [loading, setLoading] = useState(true);


  const chartData = [
    { name: 'Week 1', completed: 4 },
    { name: 'Week 2', completed: 6 },
    { name: 'Week 3', completed: 8 },
    { name: 'Week 4', completed: 12 },
    { name: 'Week 5', completed: 10 },
    { name: 'Week 6', completed: 15 },
    { name: 'Week 7', completed: 18 }
  ];

  const categoryData = [
    { name: 'Web Dev', value: 35 },
    { name: 'Data Science', value: 25 },
    { name: 'Mobile', value: 20 },
    { name: 'Design', value: 20 }
  ];

  useEffect(() => {
    // Mock data for demonstration
    const mockStats = {
      total_courses: 150,
      enrolled_courses: 8,
      completed_lessons: 45,
      total_lessons: 120,
      completion_percentage: 37.5
    };

    const mockProgress = [
      { id: 1, title: 'Complete Web Development Bootcamp', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=60&fit=crop', completed_lessons: 12, total_lessons: 30 },
      { id: 2, title: 'Data Science with Python', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=60&fit=crop', completed_lessons: 8, total_lessons: 25 },
      { id: 3, title: 'Mobile App Development', thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=60&fit=crop', completed_lessons: 15, total_lessons: 40 },
      { id: 4, title: 'UI/UX Design Masterclass', thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=60&fit=crop', completed_lessons: 10, total_lessons: 25 }
    ];

    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setProgress(mockProgress);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's your learning progress and statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
            <div className="flex items-center">
              <div className="p-3 bg-mint-100 rounded-lg">
                <BookOpenIcon className="w-6 h-6 text-mint-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.enrolled_courses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
            <div className="flex items-center">
              <div className="p-3 bg-teal-100 rounded-lg">
                <PlayIcon className="w-6 h-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed_lessons}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrophyIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completion_percentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">24h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Chart */}
          <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Courses</h3>
          <div className="space-y-4">
            {progress.map((course) => (
              <div key={course.id} className="flex items-center p-4 bg-gradient-to-r from-mint-50 to-teal-50 rounded-lg">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-16 h-12 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.completed_lessons}/{course.total_lessons} lessons</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-mint-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(course.completed_lessons / course.total_lessons) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button className="ml-4 bg-mint-500 hover:bg-mint-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
