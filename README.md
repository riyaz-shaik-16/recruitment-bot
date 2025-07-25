# Recruitment Bot

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://recruitment-bot-alpha.vercel.app)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

An AI-powered recruitment assistant that conducts dynamic interviews, evaluates candidates, and adapts its questioning based on their responses. This project is built with a modern MERN stack and integrates with Google's Gemini API for intelligent conversation.

## 🌐 Live Demo

Check out the live version of the application: **[recruitment-bot-alpha.vercel.app](https://recruitment-bot-alpha.vercel.app)**

## ✨ Features

-   **AI-Powered Interviews**: Utilizes Google's Gemini API to conduct natural and intelligent interviews.
-   **Dynamic Q&A**: The bot adapts its questions based on the candidate's previous answers and the job description.
-   **Secure Authentication**: Google OAuth 2.0 and JWT for robust and secure user login.
-   **Session Management**: Full support for chat history and session persistence.
-   **Responsive UI**: A clean and modern user interface built with React, Vite, and Tailwind CSS.
-   **State Management**: Centralized state management using Redux Toolkit.
-   **RESTful API**: A backend built with Node.js and Express.js to handle all business logic.

## 🛠️ Tech Stack

| Frontend                                                              | Backend                                                              |
| --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)             | [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) |
| [Tailwind CSS](https://tailwindcss.com/)                              | [MongoDB](https://www.mongodb.com/)                                  |
| [Redux Toolkit](https://redux-toolkit.js.org/)                        | [Google Gemini API](https://ai.google.dev/)                          |
| [Google OAuth](https://developers.google.com/identity/protocols/oauth2) | [JWT](https://jwt.io/)                                               |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   MongoDB instance (local or cloud-based like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/RiyazShaik-05/recruitment-bot.git
cd recruitment-bot
```

### 2. Set Up Environment Variables

Create a `.env` file in the `/backend` directory and populate it with your credentials.

**File: `/backend/.env`**

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Application URIs
CLIENT_URI=http://localhost:5173

# JWT
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Install Dependencies

Install the required packages for both the frontend and backend.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Run the Application

You will need two separate terminals to run the backend and frontend servers concurrently.

**Terminal 1: Start the Backend Server**

```bash
cd backend
npm run dev
```

The backend will be running on `http://localhost:5000`.

**Terminal 2: Start the Frontend Development Server**

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

Authored by [Riyaz Shaik](https://github.com/RiyazShaik-05).
