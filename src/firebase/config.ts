
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './env';

console.log("=== FIREBASE CONFIG LOADING ===");
console.log("Successfully loaded Firebase config from env.ts");
console.log("Project ID:", firebaseConfig.projectId);
console.log("Auth Domain:", firebaseConfig.authDomain);

// Check if config looks valid
if (!firebaseConfig.projectId || firebaseConfig.projectId === "your-project-id") {
  console.warn("⚠️ Firebase config appears to use placeholder values!");
}

console.log("=== INITIALIZING FIREBASE ===");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("✅ Firebase app initialized");

// Initialize Firestore
export const db = getFirestore(app);
console.log("✅ Firestore initialized");

// Initialize Firebase Auth
export const auth = getAuth(app);
console.log("✅ Firebase Auth initialized");

console.log("=== FIREBASE SETUP COMPLETE ===");

export default app;
