# Youth-Link

## Project Overview

Youth-Link is a web platform that connects young job seekers with employment opportunities and career resources. Users can create profiles, browse jobs, and manage applications efficiently.

## Tech Stack

* **Frontend:** React.js
* **Backend:** Firebase (Firestore, Authentication)
* **Other Tools:** Git, GitHub

## Project Structure

```
src/
 ├─ components/      # Reusable UI components (buttons, forms, cards)
 ├─ pages/           # Screens/pages (Dashboard, Login, Profile)
 ├─ firebase/        # Firebase configuration and helper functions
 ├─ context/         # Context API providers (optional)
 └─ App.js           # Main app
```

## Setup Steps

### 1. Clone the repository

```bash
git clone https://github.com/OarisaR/Youth-link.git
cd Youth-link
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

* The app will run at `http://localhost:3000` by default.

## Environment Configuration

* Create a `.env` file in the project root.
* Add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

> Replace each value with the credentials from your Firebase console.

## Seed Data Usage

* If you have any initial data (like sample users or job listings), you can populate Firestore using Firebase console or scripts in `firebase/helpers.js`.
* Example script usage (optional):

```javascript
// import { db } from './firebase/config';
// add initial documents to Firestore collections here
```

## Notes

* All backend functionality (CRUD operations, authentication) is handled via Firebase.
* Code is organized logically with reusable components, pages, and Firebase helper functions.
* Ensure Firebase configuration is correct before running the app.
