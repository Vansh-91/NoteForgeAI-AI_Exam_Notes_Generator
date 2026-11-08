
# 📚 ExamNotes AI

### AI-Powered Exam-Oriented Notes & Revision Platform

ExamNotes AI is a MERN-stack application that uses Google's Gemini API to generate structured, exam-oriented study notes from a topic provided by the user. It helps students organize their preparation with priority-wise subtopics, revision points, important questions, and diagram-ready content.

## ✨ Features

- 🤖 **AI-Powered Notes Generation** — Generate topic-specific study notes using Gemini.
- 📌 **Priority-Wise Subtopics** — Organize subtopics by their assigned importance.
- 📝 **Exam-Oriented Questions** — Generate short-answer and long-answer questions.
- ⚡ **Revision Mode** — Focus on concise revision points for quick preparation.
- 📊 **Diagram and Chart Support** — Request diagrams and chart-ready content when needed.
- 🔐 **Authentication** — Authenticate users and protect backend routes using JWT.
- 💳 **Credit-Based Generation** — Manage usage through a credit balance.
- 💾 **Notes Storage** — Save generated notes in MongoDB for later retrieval.
- 🎨 **Responsive UI** — Modern interface built with React, Tailwind CSS, and Motion.
- ⏳ **Loading Feedback** — Animated loading indicators while notes are generated.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Motion (`motion/react`)
- React Markdown
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Google Gemini API

## 🏗️ Project Structure

```text
aiexamnotes/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── FinalResult.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopicForm.jsx
│   │   ├── Pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Notes.jsx
│   │   │   └── Pricing.jsx
│   │   ├── Services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Services/
│   ├── middleware/
│   ├── PromptBuilder.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

*Folder names may differ slightly depending on your implementation.*

## ⚙️ Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/)
- npm
- A MongoDB database, such as MongoDB Atlas
- A Google Gemini API key
- Firebase project credentials if using Firebase authentication

## 🚀 Getting Started

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server/` directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder values with your own credentials.

If your frontend uses Firebase Authentication, configure its Firebase project settings using the environment-variable names expected by your frontend code.

**Security:** Never commit `.env` files, API keys, database credentials, or JWT secrets to GitHub.

### 5. Start the backend

From the `server/` directory:

```bash
npm run dev
```

If your backend does not have a `dev` script, add one to `server/package.json`, for example:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Install Nodemon if required:

```bash
npm install --save-dev nodemon
```

The backend should start on `http://localhost:5000` if configured with the port above.

### 6. Start the frontend

From the `client/` directory:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal, typically `http://localhost:5173`.

## 🔌 API Overview

### Generate Notes

**Endpoint**

```http
POST /api/notes/generate
```

**Authentication:** Bearer JWT token required.

**Request body**

```json
{
  "topic": "React Hooks",
  "classLevel": "B.Tech CSE",
  "examType": "University Exam",
  "revisionMode": true,
  "includeDiagram": true,
  "includeChart": false
}
```

**Example success response**

```json
{
  "message": "Notes generated successfully",
  "data": {
    "subTopics": {
      "⭐": ["useState Hook", "useEffect Hook"],
      "⭐⭐": ["useContext Hook"],
      "⭐⭐⭐": ["useMemo Hook"]
    },
    "importance": "⭐⭐⭐",
    "notes": "Generated exam-oriented notes...",
    "revisionPoints": [
      "Hooks allow state management in functional components."
    ],
    "questions": {
      "short": ["What are React Hooks?"],
      "long": ["Explain the Rules of Hooks."]
    },
    "diagram": null,
    "charts": []
  },
  "notesId": "your_saved_note_id",
  "creditsLeft": 40
}
```

The example response is illustrative; the actual generated content depends on the topic and AI response.

## 🧠 How It Works

1. The user signs in and obtains an authentication token.
2. The user enters a topic, class level, and exam type.
3. The frontend sends the request to the Express backend using Axios.
4. JWT middleware verifies the user's authentication.
5. The backend checks the user's available credits.
6. A prompt is constructed and sent to the Gemini API.
7. The generated content is parsed into structured data.
8. The notes are saved in MongoDB.
9. Credits are deducted after successful generation and saving.
10. The frontend displays the notes, priority topics, and questions.

## 🔐 Security Considerations

- Keep Gemini and database credentials on the backend.
- Protect private API routes using JWT authentication.
- Validate request data on the server.
- Never trust credit balances supplied by the frontend.
- Apply rate limiting to prevent excessive API usage.
- Use HTTPS and secure deployment environment variables in production.

## 🗺️ Future Improvements

- [ ] Download notes as PDF.
- [ ] Search, filter, and reopen previously generated notes.
- [ ] Add a quiz and self-assessment mode.
- [ ] Render Mermaid diagrams visually.
- [ ] Display interactive charts where relevant.
- [ ] Add a reliable payment integration for purchasing credits.
- [ ] Add automated tests for API routes and credit handling.
- [ ] Deploy the frontend and backend.

## 👨‍💻 Author

**Vansh Garg**

Computer Science Engineering Student

- GitHub: [Vansh-91](https://github.com/Vansh-91)
- Portfolio: [View Portfolio](https://port-folio-delta-10.vercel.app/)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
