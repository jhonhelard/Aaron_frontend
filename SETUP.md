# 🔧 Portfolio Setup Guide

This guide covers the setup and configuration of authentication, admin panel, contact form, and Firebase integration for the portfolio website.

## 📋 Prerequisites

- Node.js (v16.0.0+)
- npm (v8.0.0+)
- Firebase account
- Basic knowledge of React and TypeScript

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable Google Analytics (optional)

### 2. Configure Firebase Services

#### Firestore Database
1. Navigate to "Firestore Database" in Firebase Console
2. Click "Create database"
3. Choose production mode
4. Select your preferred location

#### Authentication (Optional)
1. Navigate to "Authentication" in Firebase Console
2. Click "Get started"
3. Enable desired sign-in methods (Email/Password, Google, etc.)

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" (</>) icon
4. Register your app
5. Copy the configuration object

### 4. Configure Environment

1. Create `src/firebase/env.ts` file:

```typescript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

2. Update the configuration with your actual Firebase values
3. The `env.ts` file is already gitignored for security

## 📧 Contact Form Setup

### Features
- Contact form with name, email, and message fields
- Form validation using React Hook Form and Zod
- Data storage in Firestore
- Toast notifications for user feedback
- Responsive design

### Firestore Collection Structure
```
contacts/
  ├── {documentId}/
      ├── name: string
      ├── email: string
      ├── message: string
      ├── createdAt: timestamp
      ├── isRead: boolean
      └── id: string
```

### Usage
1. Users fill out the contact form at `/contact`
2. Form data is validated client-side
3. Successful submissions are stored in Firestore
4. Users receive confirmation via toast notification
5. Form resets after successful submission

## 🔐 Authentication Setup

### Features
- Login and signup forms
- Form validation
- Tab-based interface
- Loading states
- Toast notifications
- Responsive design

### Current Implementation
- **Note**: Currently uses simulated authentication (no actual Firebase Auth integration)
- Login/signup forms collect user data
- Success/error states are simulated with timeouts
- Ready for Firebase Auth integration

### To Enable Real Authentication
1. Uncomment Firebase Auth setup in `src/firebase/config.ts`
2. Implement actual authentication logic in `src/pages/Auth.tsx`
3. Add authentication state management
4. Protect admin routes

Example integration:
```typescript
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

// In handleLogin function
const userCredential = await signInWithEmailAndPassword(auth, email, password);
```

## 👑 Admin Panel Setup

### Features
- View all contact messages
- Mark messages as read/unread
- Message details view
- Responsive table layout
- Search and filter capabilities

### Access Control
- Currently uses localStorage check for admin status
- Set `isAdmin=true` in localStorage to access admin panel
- **Security Note**: Implement proper authentication for production use

### Firestore Security Rules
Add these rules to secure admin access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      // Allow read/write for authenticated admin users
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
      
      // Allow create for anyone (contact form submissions)
      allow create: if true;
    }
  }
}
```

### Admin User Setup
1. Create admin user in Authentication
2. Add user document in Firestore:
```
users/
  ├── {userId}/
      ├── email: string
      ├── isAdmin: boolean
      └── createdAt: timestamp
```

## 🛡️ Security & Firewall Setup

### Firebase Security Rules

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contacts collection
    match /contacts/{document} {
      allow create: if true; // Anyone can submit contact forms
      allow read, update, delete: if isAdmin();
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if isAdmin();
    }
    
    // Helper function to check admin status
    function isAdmin() {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### Environment Security
- Never commit `src/firebase/env.ts` to version control
- Use environment variables in production
- Keep API keys secure

### Production Considerations
1. **Authentication**: Implement proper user authentication
2. **Admin Protection**: Add server-side admin verification
3. **Rate Limiting**: Implement contact form rate limiting
4. **CORS**: Configure Firebase CORS settings
5. **HTTPS**: Ensure HTTPS in production
6. **Monitoring**: Set up Firebase monitoring and alerts

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic builds

### Firebase Hosting (Alternative)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 📱 Routes Overview

| Route | Purpose | Authentication Required |
|-------|---------|------------------------|
| `/` | Home page | No |
| `/about` | About page | No |
| `/projects` | Projects showcase | No |
| `/academics` | Academic background | No |
| `/contact` | Contact form | No |
| `/resume` | Resume/CV | No |
| `/auth` | Login/Signup | No |
| `/admin` | Admin panel | Yes (localStorage check) |

## 🔧 Development Tips

1. **Testing Contact Form**: Use Firestore emulator for local testing
2. **Admin Access**: Set `localStorage.setItem('isAdmin', 'true')` in browser console
3. **Firebase Debugging**: Check browser console for Firebase connection status
4. **Form Validation**: Test various input scenarios for robust validation

## 📞 Support

For issues or questions:
1. Check Firebase Console for errors
2. Review browser console logs
3. Verify Firestore security rules
4. Ensure environment configuration is correct

---

**Note**: This portfolio uses a modern tech stack with React, TypeScript, Tailwind CSS, and Firebase. Make sure all dependencies are properly installed and configured before deployment.