import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { CartItem } from '../types';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        user_id: 1,
        course_id: 1,
        course: {
          id: 1,
          title: 'Complete Web Development Bootcamp',
          description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive course.',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop',
          price: 99,
          instructor_id: 1,
          category_id: 1,
          is_published: true,
          duration: 1200,
          difficulty_level: 'beginner'
        }
      },
      {
        id: 2,
        user_id: 1,
        course_id: 2,
        course: {
          id: 2,
          title: 'Data Science with Python',
          description: 'Master data analysis, machine learning, and visualization with Python.',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop',
          price: 149,
          instructor_id: 2,
          category_id: 2,
          is_published: true,
          duration: 1800,
          difficulty_level: 'intermediate'
        }
      },
      {
        id: 3,
        user_id: 1,
        course_id: 3,
        course: {
          id: 3,
          title: 'Mobile App Development',
          description: 'Build iOS and Android apps using React Native and Flutter.',
          thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=120&fit=crop',
          price: 199,
          instructor_id: 3,
          category_id: 3,
          is_published: true,
          duration: 2400,
          difficulty_level: 'advanced'
        }
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 1000);
  }, []);

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.course?.price || 0), 0);
  const discount = total > 200 ? total * 0.1 : 0;
  const finalTotal = total - discount;

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your selected courses and proceed to checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some courses to get started</p>
            <a
              href="/courses"
              className="bg-mint-500 hover:bg-mint-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.course?.thumbnail}
                        alt={item.course?.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.course?.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.course?.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-mint-600">
                            ${item.course?.price}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (10% off orders over $200)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-mint-600">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-mint-500 hover:bg-mint-600 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-mint mb-4">
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Secure checkout with</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      V
                    </div>
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      M
                    </div>
                    <div className="w-8 h-5 bg-yellow-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      A
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-mint-50 rounded-lg">
                  <h4 className="font-medium text-mint-800 mb-2">What's included:</h4>
                  <ul className="text-sm text-mint-700 space-y-1">
                    <li>• Lifetime access to all course materials</li>
                    <li>• Certificate of completion</li>
                    <li>• 30-day money-back guarantee</li>
                    <li>• Mobile and desktop access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
