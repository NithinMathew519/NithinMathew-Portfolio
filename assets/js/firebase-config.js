// Firebase configuration and initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDThKWhYAIpLkcNzEAjJvdexFDk2Zvjd7Q",
  authDomain: "portfolio-501510.firebaseapp.com",
  projectId: "portfolio-501510",
  storageBucket: "portfolio-501510.firebasestorage.app",
  messagingSenderId: "311452264939",
  appId: "1:311452264939:web:cecf93a47a108c363ad1ae",
  measurementId: "G-E183T20M2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

console.log('Firebase initialized successfully');
console.log('Firebase app:', app);
console.log('Firestore database:', db);

// Function to increment portfolio views
async function incrementPortfolioViews() {
  try {
    console.log('Attempting to increment portfolio views...');
    const viewsRef = doc(db, 'portfolio', 'views');
    
    // Check if document exists, if not create it
    const viewsSnap = await getDoc(viewsRef);
    
    if (!viewsSnap.exists()) {
      console.log('Views document does not exist, creating new one...');
      // Create the document if it doesn't exist
      await setDoc(viewsRef, { count: 1 });
      console.log('New views document created with count: 1');
      updateViewsCounter(1);
    } else {
      console.log('Views document exists, incrementing...');
      // Increment the view count
      await updateDoc(viewsRef, {
        count: increment(1)
      });
      
      // Get the updated count and display it
      const updatedSnap = await getDoc(viewsRef);
      const newCount = updatedSnap.data().count;
      console.log('Views incremented successfully, new count:', newCount);
      updateViewsCounter(newCount);
    }
  } catch (error) {
    console.error('Error updating views:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    // Fallback to local storage if Firebase fails
    incrementLocalViews();
  }
}

// Function to get current view count
async function getCurrentViewCount() {
  try {
    console.log('Getting current view count...');
    const viewsRef = doc(db, 'portfolio', 'views');
    const viewsSnap = await getDoc(viewsRef);
    
    if (viewsSnap.exists()) {
      const count = viewsSnap.data().count;
      console.log('Current view count from Firebase:', count);
      updateViewsCounter(count);
      return count;
    } else {
      console.log('Views document does not exist, initializing with 0');
      // Initialize with 0 if document doesn't exist
      updateViewsCounter(0);
      return 0;
    }
  } catch (error) {
    console.error('Error getting views:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    // Fallback to local storage
    const localViews = getLocalViews();
    updateViewsCounter(localViews);
    return localViews;
  }
}

// Function to update the views counter in the UI
function updateViewsCounter(count) {
  const viewsElement = document.getElementById('views-counter');
  if (viewsElement) {
    // Update the purecounter end value
    viewsElement.setAttribute('data-purecounter-end', count);
    
    // If PureCounter is available, reinitialize it
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    } else {
      // Fallback: directly update the text
      viewsElement.textContent = count;
    }
  }
}

// Fallback functions for when Firebase is not available
function incrementLocalViews() {
  const currentViews = getLocalViews();
  const newViews = currentViews + 1;
  localStorage.setItem('portfolioViews', newViews.toString());
  updateViewsCounter(newViews);
}

function getLocalViews() {
  return parseInt(localStorage.getItem('portfolioViews')) || 0;
}

// Initialize portfolio views tracking
document.addEventListener('DOMContentLoaded', async function() {
  console.log('DOM loaded, initializing portfolio views tracking...');
  
  // Get current view count first
  await getCurrentViewCount();
  
  // Increment view count on every page load/refresh
  console.log('About to increment portfolio views...');
  await incrementPortfolioViews();
});

// Export functions for external use
window.portfolioViews = {
  increment: incrementPortfolioViews,
  getCurrent: getCurrentViewCount,
  updateCounter: updateViewsCounter
};
