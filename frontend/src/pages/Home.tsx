import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, StarIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/solid';

const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of experience'
    },
    {
      icon: <PlayIcon className="w-8 h-8" />,
      title: 'Interactive Learning',
      description: 'Engage with video lessons, quizzes, and hands-on projects'
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Connect with fellow learners and get help when you need it'
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: 'Certificates',
      description: 'Earn certificates to showcase your new skills'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'John Doe',
      price: 99,
      rating: 4.8,
      students: 1250,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Jane Smith',
      price: 149,
      rating: 4.9,
      students: 890,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      instructor: 'Mike Johnson',
      price: 199,
      rating: 4.7,
      students: 650,
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'UI/UX Design Masterclass',
      instructor: 'Sarah Wilson',
      price: 129,
      rating: 4.9,
      students: 1100,
      thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mint-500 via-teal-500 to-mint-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-mint-100 max-w-3xl mx-auto">
              Discover thousands of courses, learn new skills, and advance your career with our premium online learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-white text-mint-600 hover:bg-mint-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Browse Courses
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white hover:bg-white hover:text-mint-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduStream?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-mint-50 to-teal-50 hover:shadow-mint-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-mint-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-gradient-to-br from-mint-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of students learning these trending skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-mint-lg transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-mint-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    ${course.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {course.instructor}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="text-gray-700 font-medium">{course.rating}</span>
                    </div>
                    <span className="text-gray-500">{course.students} students</span>
                  </div>
                  <Link
                    to="/courses"
                    className="w-full bg-mint-500 hover:bg-mint-600 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="bg-mint-500 hover:bg-mint-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-mint hover:shadow-mint-lg"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mint-500 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-mint-100">
            Join over 100,000 students who are already advancing their careers with EduStream
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-mint-600 hover:bg-mint-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/courses"
              className="border-2 border-white text-white hover:bg-white hover:text-mint-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
