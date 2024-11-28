# AnimationLab

## Overview

AnimationLab is a web application that allows users to create, manage, and share animations. It includes user authentication, a personal dashboard, experiment management, community galleries, and search and filtering functionalities.

## Features

- **User Authentication:** Users can register and log in with their email.
- **User Dashboard:** Users can view and manage their saved animations and experiment settings.
- **Experiment Management:** Users can create animations through experiments and display these animations prominently in their personal dashboard.
- **Community Galleries:** Users can share their animations in a public gallery with a 'Like' button.
- **Top and Recent Animations:** Users can view the most liked and recent animations.
- **Search and Filtering:** Users can search and filter animations based on popularity, recency, or tags.
- **Responsive Design:** The platform is visually appealing and accessible on both desktop and mobile devices.

## Setup

### Prerequisites

- Node.js and npm installed on your machine.
- A Firebase project with Realtime Database enabled.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/AnimationLab.git
   cd AnimationLab
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable the Realtime Database in your Firebase project.
   - Generate a web API key for your Firebase project.
   - Create a `.env` file in the root directory of the project and add the following environment variables:
     ```plaintext
     VITE_FIREBASE_API_KEY=your-firebase-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-firebase-app-id
     VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000` (or the port specified in the terminal).

## Deployment

- The application can be deployed to Vercel using the Vercel CLI or by connecting your GitHub repository to Vercel.

## Contributing

- Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

- This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
