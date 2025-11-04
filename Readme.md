# 💻 CodeQuest

**CodeQuest** is an AI-powered educational platform that makes learning Data Structures and coding more engaging and interactive. It offers personalized coding challenges based on your skill level, integrated voice coding, AI battles, and an inbuilt Gemini chatbot to help you whenever you get stuck.

![image](https://github.com/user-attachments/assets/f096df42-e012-49c8-9b05-fc5db4f60cb4)
![image](https://github.com/user-attachments/assets/0a8c800b-c0f7-4813-b9d3-ca96b02ec66c")
![image](https://github.com/user-attachments/assets/ed1165f5-e15e-474a-baa7-3684b815271b)
---

##  Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Setup and Installation](#-setup-and-installation)
- [Usage](#-usage)
- [Design Choices](#-design-choices)
- [Challenges and Solutions](#-challenges-and-solutions)
- [Future Improvements](#-future-improvements)
- [Deployment](#-deployment)
- [Personal Note](#-personal-note)

---

##  Introduction

Learning to code can feel overwhelming, especially when you're stuck on a problem with no one to turn to. That's where **CodeQuest** comes in.

I built CodeQuest to make learning Data Structures and Algorithms fun, interactive, and personalized. Instead of just reading theory or solving random problems, you get AI-generated challenges that match your skill level, real-time feedback to help you improve, and even a friendly AI opponent to compete against.

**What makes CodeQuest different:**

- Challenges adapt to your skill level (Easy, Medium, Hard) based on your performance
- Real-time analytics show you exactly where you're excelling and where you need practice
- Voice-based coding lets you solve problems hands-free
- Battle mode puts you head-to-head with an AI for some friendly competition
- Integrated Gemini chatbot gives you hints and explanations when you're stuck

Whether you're just starting out or preparing for technical interviews, CodeQuest meets you where you are and helps you level up.

---

##  Features

-  **AI-powered challenge generation** — Get problems tailored to your skill level (Easy, Medium, Hard)
-  **Gamified learning** — Earn badges, level up, and track your progress as you improve
-  **Voice-based coding** — Solve problems hands-free with voice input support
-  **Battle with AI** — Compete against an AI opponent in friendly coding challenges
-  **Real-time performance analytics** — See your strengths and areas for improvement at a glance
-  **Structured learning paths** — Follow guided paths to master Data Structures and Algorithms
-  **Integrated Gemini chatbot** — Get instant help, hints, and explanations when you're stuck
-  **User-friendly interface** — Clean design with smooth navigation and intuitive controls
-  **Firebase authentication** — Save your progress and pick up right where you left off
-  **Responsive design** — Works seamlessly on desktop, tablet, and mobile devices

---

##  Tech Stack

###  Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)

- **Python — Fast, modern backend API for handling requests and AI integration
- **Firebase** — User authentication and real-time cloud data storage
- **Gemini API** — Powers intelligent coding hints, explanations, and AI-generated challenges

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

- **Next.js** — Server-side rendering and dynamic, responsive UI
- **TypeScript** — Type-safe code that's easier to maintain and debug
- **Tailwind CSS + shadcn/ui** — Modern, customizable components and styling
- **Axios** — Clean and efficient API requests to the backend

---

##  Architecture

CodeQuest follows a **modular and scalable architecture** that keeps things organized and easy to extend:

1. **Frontend (Next.js)** — The user-facing interface where learners interact with challenges, track progress, and compete in AI battles
3. **Firebase** — Takes care of user authentication, leaderboard storage, and cloud data management
4. **AI Layer (Gemini API)** — Powers intelligent hints, real-time feedback, and adaptive challenge generation

---

##  Setup and Installation

###  Backend Setup

1. **Clone the repository:**
```bash
   git clone https://github.com/cking100/codequest.git
   cd codequest/backend
```

2. **Set up a virtual environment:**
```bash
   python -m venv venv
   source venv/bin/activate  
```

3. **Install dependencies:**
```bash
   pip install -r requirements.txt
```

4. **Add environment variables:**
```bash
   cp .env.example .env
```

   Then open the `.env` file and add your API keys for Gemini, Firebase, and any other services.

5. **Run the backend server:**
```bash
   uvicorn app.main:app --reload
```

---

### 🎨 Frontend Setup
1. **Install dependencies:**
```bash
   npm install
```

2. **Set up environment variables:**
```bash
   cp .env.example .env
```

   Configure your `.env` file with the necessary API endpoints and Firebase credentials.

3. **Run the development server:**
```bash
   npm run dev
```

---

## 📱 Usage

1. Open your browser and go to `http://localhost:3000`
2. Sign up or log in with your Firebase account
3. Choose your learning path (Beginner, Intermediate, Advanced)
4. Start solving AI-generated coding challenges
5. Track your progress, earn badges, and challenge the AI for fun!

---

## 💡 Design Choices

Here's why I chose each technology:

1. **Next.js with TypeScript** — Gives you fast performance, server-side rendering, and type safety that catches bugs before they happen
2. **Firebase** — Makes authentication and data storage simple without having to manage servers
3. **Gemini API** — Provides smart, contextual coding support and generates personalized feedback
4. **Tailwind + shadcn/ui** — Creates a clean, modern interface that looks great and works smoothly across all devices

---

##  Challenges and Solutions

*(This section can be filled based on specific challenges you faced during development)*

---

##  Future Improvements

Here are some features I'm planning to add:

- **Multiplayer battles** — Compete with friends in real-time coding challenges
- **More language support** — Expand beyond Python to include JavaScript, Java, C++, and more
- **Community features** — Share your solutions and learn from others
- **Mobile app** — Native iOS and Android apps for learning on the go
- **Advanced analytics** — Deeper insights into your coding patterns and improvement trajectory

---

##  Personal Note

I built CodeQuest because I remember how frustrating it was to learn Data Structures and Algorithms without immediate feedback or guidance. My goal was to create a platform that feels less like studying and more like playing a game — where you're motivated to keep going and you actually enjoy the learning process.

If you find CodeQuest helpful or have suggestions for improvement, feel free to reach out or contribute to the project!

---
