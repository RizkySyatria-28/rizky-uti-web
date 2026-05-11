import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCKmWZRo9GLqdyeyjpuE4MVWLm6owaHfk8",
  authDomain: "rizky-uti-web-747f3.firebaseapp.com",
  projectId: "rizky-uti-web-747f3",
  storageBucket: "rizky-uti-web-747f3.firebasestorage.app",
  messagingSenderId: "321347165683",
  appId: "1:321347165683:web:b2511c505b8cbedda98686",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)