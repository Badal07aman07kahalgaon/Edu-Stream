# EduStream - Online Learning Platform

A modern, responsive fullstack web application for online learning with a beautiful mint theme.

## 🌈 Features

- **Modern UI**: Beautiful mint-themed design with gradients and hover effects
- **Authentication**: Secure login/register with Laravel Sanctum
- **Course Management**: Browse, enroll, and track course progress
- **Shopping Cart**: Add courses to cart and checkout
- **Dashboard**: Track learning progress with charts and statistics
- **Real-time Chat**: Community chat for learners
- **Responsive Design**: Works perfectly on all devices

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Headless UI for components
- Recharts for data visualization
- Axios for API calls
- React Router for navigation

### Backend
- Laravel 11 (PHP)
- MySQL/SQLite database
- Laravel Sanctum for authentication
- Laravel WebSockets for real-time chat
- RESTful API endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PHP 8.1 or higher
- Composer
- MySQL or SQLite

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Run migrations:
```bash
php artisan migrate
```

6. Seed the database:
```bash
php artisan db:seed
```

7. Start the Laravel server:
```bash
php artisan serve
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env.local
```

4. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
/project-root
├── /backend          # Laravel API
│   ├── /app
│   │   ├── /Http/Controllers
│   │   ├── /Models
│   │   └── /Events
│   ├── /database
│   │   ├── /migrations
│   │   └── /seeders
│   └── /routes
└── /frontend         # React App
    ├── /src
    │   ├── /components
    │   ├── /pages
    │   ├── /contexts
    │   ├── /services
    │   └── /types
    └── /public
```

## 🎨 Design System

### Colors
- **Primary Mint**: #10B981
- **Secondary Mint**: #34D399
- **Background**: #ECFDF5
- **Dark Mode**: Deep teal with glowing mint highlights

### Components
- Rounded cards with hover glow effects
- Gradient backgrounds
- Premium shadows and animations
- Responsive grid layouts

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/profile` - Get user profile

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get course details
- `POST /api/courses/{id}/enroll` - Enroll in course

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/{id}` - Remove item from cart
- `POST /api/cart/checkout` - Checkout

### Chat
- `GET /api/chat/messages` - Get chat messages
- `POST /api/chat/messages` - Send message

### Dashboard
- `GET /api/dashboard/stats` - Get user statistics
- `GET /api/dashboard/courses` - Get user courses
- `GET /api/dashboard/progress` - Get learning progress

## 🚀 Deployment

### Backend Deployment
1. Set up your production database
2. Update `.env` with production settings
3. Run `php artisan migrate --force`
4. Deploy to your preferred hosting platform

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `build` folder to your hosting platform
3. Update `REACT_APP_API_URL` to your production API URL

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@edustream.com or join our community chat.
