# Recruitment Bot


![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

An AI-powered recruitment assistant that conducts dynamic interviews, evaluates candidates, and adapts its questioning based on their responses. This project is built with a modern MERN stack, integrates with Google's Gemini API for intelligent conversation, and is deployed on a scalable cloud infrastructure.


##  Features

-   **AI-Powered Interviews**: Utilizes Google's Gemini API to conduct natural and intelligent interviews.
-   **Dynamic Q&A**: The bot adapts its questions based on the candidate's previous answers and the job description.
-   **Secure Authentication**: Google OAuth 2.0 and JWT for robust and secure user login.
-   **Session Management**: Full support for chat history and session persistence.
-   **Responsive UI**: A clean and modern user interface built with React, Vite, and Tailwind CSS.
-   **State Management**: Centralized state management using Redux Toolkit.
-   **RESTful API**: A backend built with Node.js and Express.js to handle all business logic.
-   **Scalable Deployment**: Frontend on Vercel for performance and backend on AWS EC2 for reliability.

##  Tech Stack & Architecture

The application is designed with a decoupled frontend and backend architecture, ensuring scalability and maintainability.

| Category         | Technology                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **Frontend**     | [React](https://reactjs.org/) + [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Redux Toolkit](https://redux-toolkit.js.org/) |
| **Backend**      | [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/), [Google Gemini API](https://ai.google.dev/) |
| **Database**     | [MongoDB](https://www.mongodb.com/) (via MongoDB Atlas)                                                     |
| **Authentication** | [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2), [JWT](https://jwt.io/)         |
| **Deployment**   | [Vercel](https://vercel.com/) (Frontend), [AWS EC2](https://aws.amazon.com/ec2/) (Backend)                    |

```
[ User ] <--> [ Vercel (React Frontend) ] <--> [ AWS EC2 (Node.js API) ] <--> [ MongoDB Atlas ]
                                                               |
                                                               +-----> [ Google Gemini API ]
```

##  Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   MongoDB instance (local or cloud-based like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/riyaz-shaik-16/recruitment-bot.git
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
# This should be your backend's Google OAuth callback URL (e.g., http://localhost:5000/api/auth/google/callback)
GOOGLE_REDIRECT_URI=your_google_callback_url_for_backend

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

Authored by [Riyaz Shaik](https://github.com/riyaz-shaik-16).


