# BloomSwift POS Website

A full-stack web application for BloomSwift POS system with React frontend and Node.js/Express backend.

## Project Structure

```
BloomSwiftPOS/
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express backend API
└── Assets/            # Static assets and images
```

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- React Router
- Framer Motion
- Lucide React (icons)

### Backend
- Node.js
- Express
- PostgreSQL
- Nodemailer (email service)
- bcrypt (password hashing)

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bloomtechmain/BloomSwiftPOS_WEBSITE.git
   cd BloomSwiftPOS_WEBSITE
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your backend URL
   npm run dev
   ```

## Railway Deployment

This project is configured for deployment on Railway as separate services.

### Deployment Architecture

The application deploys as **3 separate Railway services**:

1. **PostgreSQL Database** - Railway PostgreSQL plugin
2. **Backend Service** - Node.js API server
3. **Frontend Service** - React static site

### Deployment Steps

#### 1. Deploy PostgreSQL Database
- Create a new PostgreSQL database in Railway
- Note down the connection credentials

#### 2. Deploy Backend Service
- Create a new service in Railway
- Connect to this GitHub repository
- Set root directory to `/backend`
- Configure environment variables:
  - `PORT` (Railway provides this automatically)
  - `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME` (from Railway PostgreSQL)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (your email config)
  - `FRONTEND_URL` (URL of your deployed frontend)
- Railway will automatically run `npm install` and `npm start`

#### 3. Deploy Frontend Service
- Create a new service in Railway
- Connect to this GitHub repository
- Set root directory to `/frontend`
- Configure environment variables:
  - `VITE_API_URL` (URL of your deployed backend service)
- Railway will automatically run `npm install` and `npm run build`
- Configure to serve the built static files from `/dist`

### Environment Variables Reference

**Backend (.env)**
```
PORT=5000
DB_USER=<railway_db_user>
DB_PASSWORD=<railway_db_password>
DB_HOST=<railway_db_host>
DB_PORT=5432
DB_NAME=<railway_db_name>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<your_email>
SMTP_PASS=<your_app_password>
FRONTEND_URL=<your_railway_frontend_url>
```

**Frontend (.env)**
```
VITE_API_URL=<your_railway_backend_url>
```

## Features

- User registration and authentication
- Service request management
- Support ticket system
- Hardware catalog
- Live chat functionality
- Email integration
- Multi-page marketing site
- Industry-specific solutions (Retail, Hospitality, etc.)

## License

Proprietary - BloomTech

## Contact

For support or inquiries, contact: admin@bloomtech.lk
