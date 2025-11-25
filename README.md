# ShortFlix 🎬

ShortFlix is a modern, responsive web application for sharing and viewing short-form videos. Built with a premium Netflix-inspired aesthetic, it features a robust backend API and a dynamic frontend interface.

## ✨ Features

### 🎥 Content Viewing
- **Netflix-style Grid**: Responsive grid layout for browsing shorts.
- **Immersive Playback**: 
  - **Desktop**: Elegant modal video player.
  - **Mobile**: Full-screen, immersive video experience.
- **Smart Previews**: Auto-play video previews on hover.
- **Rich Metadata**: View view counts, upload dates, descriptions, and tags.

### 🔍 Search & Discovery
- **Advanced Search Bar**: Collapsible, space-saving design that expands on interaction.
- **Multi-filter Support**: Filter content by Title, Description, and Tags simultaneously.
- **Real-time Results**: Debounced search for optimal performance.

### 🔐 Authentication & User Management
- **Secure Auth**: Token-based authentication system.
- **Public Access**: Browse and watch content without logging in.
- **Creator Access**: Login required only for uploading content.
- **User Dashboard**: Profile management (Logout, etc.).

### 📤 Content Creation
- **Upload Studio**: dedicated page for uploading new shorts.
- **Drag & Drop**: Intuitive file upload for Videos and Thumbnails.
- **Tagging System**: Interactive tag management (add/remove tags easily).
- **Validation**: Client-side validation for required fields and file types.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Chakra UI v3 (with custom dark theme)
- **Routing**: React Router v6
- **State Management**: React Context API (Auth)
- **HTTP Client**: Axios (with interceptors)
- **Icons**: React Icons

### Backend
- **Framework**: Django
- **API**: Django REST Framework (DRF)
- **Authentication**: Djoser (Token Auth)
- **Database**: SQLite (Default) / PostgreSQL (Production ready)
- **Media Handling**: Django FileField (Local storage configured)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- pnpm (or npm/yarn)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the server
python manage.py runserver
```
The backend will run at `http://localhost:8000`.

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```
The frontend will run at `http://localhost:5173`.

## 🔑 Demo Credentials

For testing the upload functionality without creating a new account, you can use the pre-configured demo account:

- **Username**: `saminafis`
- **Password**: `admin123456`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shorts/` | List all shorts (supports filtering) |
| POST | `/api/shorts/` | Upload a new short (Auth required) |
| GET | `/api/shorts/{id}/` | Retrieve specific short details |
| POST | `/api/auth/users/` | Register new user |
| POST | `/api/auth/token/login/` | Login (Obtain token) |

## 📱 Mobile Optimization

ShortFlix is built with a "Mobile-First" approach:
- **Touch-friendly**: Large touch targets for interactive elements.
- **Responsive Layouts**: Grid adjusts from 1 column (mobile) to 5 columns (large screens).
- **Adaptive Player**: Video player switches modes based on device size.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
