# ซอร์สโค้ดนี้ ใช้สำหรับเป็นตัวอย่างเท่านั้น ถ้านำไปใช้งานจริง ผู้ใช้ต้องจัดการเรื่องความปลอดภัย และ ประสิทธิภาพด้วยตัวเอง

# Minimal E-commerce

A modern, minimalist e-commerce web application built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Product catalog with detailed product views
- 🛒 Shopping cart functionality
- 📱 Responsive design for mobile and desktop
- ✨ Elegant animations and transitions
- 🎨 Premium UI components using shadcn/ui
- 📦 Checkout process with address management

## Tech Stack

### Frontend

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router
- Radix UI primitives

### Backend

- Go 1.21.4
- MongoDB
- RESTful API architecture
- CORS enabled
- Modular architecture

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Go 1.21.4 or higher
- MongoDB running locally on port 27017

### Installation

1. Clone the repository:

```bash
# Backend
git clone https://github.com/warathepj/go-ecommerce-backend.git
cd go-ecommerce-backend

# Frontend
git clone https://github.com/warathepj/go-ecommerce.git
cd go-ecommerce
```

2. Install dependencies:

```bash
# Frontend dependencies
cd go-ecommerce
npm install
# or
yarn install

# Backend dependencies
cd go-ecommerce-backend
go mod download
```

3. Start the servers:

```bash
# Start backend server (from go-ecommerce-backend directory)
go run .
# Server will start on http://localhost:8080

# Start frontend development server (from go-ecommerce directory)
npm run dev
# or
yarn dev
# Frontend will be available at http://localhost:3000
```

### Building for Production

```bash
# Frontend
npm run build
# or
yarn build

# Backend
go build
```

## Project Structure

```
Frontend (go-ecommerce/):
src/
├── components/     # Reusable UI components
│   ├── about/     # About page components
│   ├── home/      # Home page components
│   ├── layout/    # Layout components
│   └── ui/        # shadcn/ui components
├── pages/         # Page components
├── lib/          # Utility functions
├── hooks/        # Custom React hooks
└── types/        # TypeScript type definitions

Backend (go-ecommerce-backend/):
├── main.go        # Entry point and HTTP handlers
├── db.go         # MongoDB connection and operations
└── go.mod        # Go module dependencies
```

## Design Philosophy

The project follows these core principles:

1. **Simplicity**: Clean, minimalist aesthetic with careful attention to typography and spacing
2. **Functionality**: Intuitive user experience with purposeful interactions
3. **Attention to Detail**: Meticulous focus on visual hierarchy and transitions
4. **Innovation**: Modern development practices and forward-thinking design

## API Endpoints

- `GET /api/products` - Retrieve product catalog
- `POST /api/orders` - Create new order
- `GET /` - Health check endpoint

## License

This project is licensed under the MIT License - see the LICENSE file for details.
