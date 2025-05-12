# Rush Tickets

A modern ticket booking platform built with Next.js and Node.js.

## Features

- User authentication and authorization
- Event creation and management
- Ticket purchasing system
- Image upload functionality
- Responsive design
- Real-time ticket availability

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Local storage with multer

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rush-tickets.git
cd rush-tickets
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/rush-tickets
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

4. Start the development servers:
```bash
# Start backend server (from backend directory)
node server.js

# Start frontend server (from root directory)
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Events
- GET /api/events - Get all events
- POST /api/events - Create a new event
- GET /api/events/:id - Get event details
- PUT /api/events/:id - Update event
- DELETE /api/events/:id - Delete event

### Tickets
- POST /api/tickets/:eventId - Create a new ticket
- GET /api/tickets/event/:eventId - Get all tickets for an event
- GET /api/tickets/:id - Get ticket details
- PUT /api/tickets/:id - Update ticket
- DELETE /api/tickets/:id - Delete ticket
- PATCH /api/tickets/:id/purchase - Purchase a ticket
- GET /api/tickets/user/purchases - Get user's purchased tickets

### Upload
- POST /api/upload/image - Upload an image

## License

MIT 