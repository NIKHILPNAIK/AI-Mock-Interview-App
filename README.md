
# AI Mock Interview App

An AI-powered mock interview platform designed to help users practice and prepare for interviews with real-time feedback. The app uses **Clerk.js** for authentication, **Dribble** for UI design, **Neon PostgreSQL** for database management, and **Gemini AI** for simulating interviews.

## Features

- **Authentication**: Secure login and registration using Clerk.js.
- **AI-Powered Interview Simulation**: Powered by Gemini AI to simulate mock interviews.
- **Real-Time Feedback**: Instant feedback on answers provided during the mock interview.
- **Database**: User data and interview records are stored securely in a Neon PostgreSQL database.
- **User-Friendly Interface**: Interactive and responsive UI built using Dribble components.

## Tech Stack

- **Frontend**: React.js, Dribble (UI design), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Authentication**: Clerk.js
- **Database**: Neon PostgreSQL
- **AI**: Gemini AI for generating and simulating interview scenarios

## Installation

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (for local development or use Neon PostgreSQL for cloud-based setup)

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/NIKHILPNAIK/AI-Mock-Interview-App.git
   cd AI-Mock-Interview-App
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root of the project and adding the following variables:

   ```
   CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>
   DATABASE_URL=<your-neon-database-url>
   GEMINI_AI_API_KEY=<your-gemini-ai-api-key>
   ```

4. Run the application locally:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to start using the app.

## Usage

### Authentication

1. Sign up or log in using Clerk.js authentication.
2. After logging in, you can start a mock interview session.
3. Answer the interview questions provided by the AI system, and receive real-time feedback.

### Interview Simulation

- The AI will ask you a series of interview questions based on your selected job role and technical stack.
- Your responses will be analyzed by the AI, and feedback will be provided instantly, helping you improve your answers.

## Deployment

To deploy the app, you can follow these steps:

1. Build the app for production:

   ```bash
   npm run build
   ```

2. Deploy to your preferred cloud platform (e.g., Vercel, Netlify, Heroku).

3. Ensure that all environment variables are correctly set in your cloud environment.

## Contributing

We welcome contributions to the AI Mock Interview App! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Clerk.js**: Authentication platform for easy user sign-ups and logins.
- **Dribble**: UI design library that helped in creating an elegant and responsive design.
- **Neon PostgreSQL**: Cloud-based PostgreSQL database for storing user data and interview sessions.
- **Gemini AI**: AI service used for generating and evaluating interview questions and answers.

---

Feel free to reach out if you have any questions or suggestions for improving the app! 🚀
```
