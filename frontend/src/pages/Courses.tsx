import React, { useState, useEffect } from 'react';
import { StarIcon, UserGroupIcon, ClockIcon, PlayIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { Course } from '../types';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', color: '#10B981' },
    { id: 'web', name: 'Web Development', color: '#34D399' },
    { id: 'data', name: 'Data Science', color: '#059669' },
    { id: 'mobile', name: 'Mobile Development', color: '#047857' },
    { id: 'design', name: 'Design', color: '#065F46' }
  ];

  useEffect(() => {
    // Mock data
    const mockCourses: Course[] = [
      {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive course.',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
        price: 99,
        instructor_id: 1,
        category_id: 1,
        is_published: true,
        duration: 1200,
        difficulty_level: 'beginner',
        instructor: { id: 1, name: 'John Doe', email: 'john@example.com' },
        category: { id: 1, name: 'Web Development', color: '#10B981' }
      },
      {
        id: 2,
        title: 'Data Science with Python',
        description: 'Master data analysis, machine learning, and visualization with Python.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        price: 149,
        instructor_id: 2,
        category_id: 2,
        is_published: true,
        duration: 1800,
        difficulty_level: 'intermediate',
        instructor: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        category: { id: 2, name: 'Data Science', color: '#34D399' }
      },
      {
        id: 3,
        title: 'Mobile App Development',
        description: 'Build iOS and Android apps using React Native and Flutter.',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
        price: 199,
        instructor_id: 3,
        category_id: 3,
        is_published: true,
        duration: 2400,
        difficulty_level: 'advanced',
        instructor: { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
        category: { id: 3, name: 'Mobile Development', color: '#059669' }
      },
      {
        id: 4,
        title: 'UI/UX Design Masterclass',
        description: 'Learn design principles, prototyping, and user research methodologies.',
        thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop',
        price: 129,
        instructor_id: 4,
        category_id: 4,
        is_published: true,
        duration: 1500,
        difficulty_level: 'intermediate',
        instructor: { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
        category: { id: 4, name: 'Design', color: '#047857' }
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category?.name.toLowerCase().includes(selectedCategory);
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of courses and advance your skills with expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-mint-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-mint-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-mint-lg hover:shadow-mint-lg transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-mint-200"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-mint-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${course.price}
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty_level)}`}>
                    {course.difficulty_level}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: course.category?.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{course.category?.name}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center mr-4">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {formatDuration(course.duration)}
                  </span>
                  <span className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-1" />
                    {Math.floor(Math.random() * 1000) + 100} students
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">4.8</span>
                  </div>
                  <button className="bg-mint-500 hover:bg-mint-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    <PlayIcon className="w-4 h-4 mr-1" />
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpenIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
