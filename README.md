# Real-Time Notes Application

This is a Real-Time Notes Application built with the MERN stack and Firebase.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Firebase account

### Backend Setup

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the backend directory with the following content:
   ```
   FIREBASE_SERVICE_ACCOUNT={"your_firebase_service_account_json_here"}
   ```
5. Start the server: `npm start`

### Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the frontend directory with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```
4. Start the React app: `npm start`

### Firebase Setup

1. Create a new Firebase project
2. Enable Email/Password authentication in the Firebase console
3. Create a Firestore database
4. Set up Firestore security rules to ensure users can only read and write their own notes
5. Generate a new private key for your service account and use it in the backend `.env` file

## Deployment

1. Deploy the backend to a service like Heroku or DigitalOcean
2. Deploy the frontend to a service like Vercel or Netlify
3. Update the frontend API URL to point to your deployed backend

## Additional Notes

- Make sure to keep your Firebase configuration and service account details secret
- For production, set up proper error handling and logging
- Consider implementing additional features like note sharing or rich text editing.