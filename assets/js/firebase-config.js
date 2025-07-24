// Firebase configuration and initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
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

// Function to get location using browser geolocation API
async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          method: 'browser_geolocation'
        });
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        resolve(null); // Don't reject, just return null
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 600000 // 10 minutes
      }
    );
  });
}

// Function to get approximate location using IP (free service)
async function getLocationFromIP() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.latitude && data.longitude) {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        region: data.region,
        country: data.country_name,
        countryCode: data.country_code,
        ip: data.ip,
        method: 'ip_geolocation'
      };
    }
  } catch (error) {
    console.error('Error getting location from IP:', error);
  }
  return null;
}

// Function to track visitor with location
async function trackVisitorWithLocation() {
  try {
    console.log('Tracking visitor with location...');
    
    // Get basic visitor info
    const visitorData = {
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      language: navigator.language,
      screen: {
        width: screen.width,
        height: screen.height
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    // Try to get location (IP-based first, then browser if user allows)
    let location = await getLocationFromIP();
    
    if (!location) {
      // Fallback to browser geolocation (requires user permission)
      location = await getUserLocation();
    }

    if (location) {
      visitorData.location = location;
      console.log('Location obtained:', location);
    } else {
      console.log('Location not available');
    }

    // Store visitor data in Firebase
    const visitorsRef = collection(db, 'portfolio', 'analytics', 'visitors');
    await addDoc(visitorsRef, visitorData);
    
    console.log('Visitor tracked successfully:', visitorData);
    return visitorData;
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return null;
  }
}

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
    console.log('Updating views counter with count:', count);
    
    // Update the purecounter end value
    viewsElement.setAttribute('data-purecounter-end', count);
    viewsElement.setAttribute('data-purecounter-start', '0');
    
    // Try to reinitialize PureCounter
    setTimeout(() => {
      try {
        if (typeof PureCounter !== 'undefined') {
          // Clear existing instances for this element
          if (PureCounter.instances) {
            PureCounter.instances = PureCounter.instances.filter(instance => instance.element !== viewsElement);
          }
          
          // Create new instance
          new PureCounter({
            selector: '#views-counter'
          });
        } else {
          // Fallback: directly update the text
          viewsElement.textContent = count;
        }
      } catch (error) {
        console.error('Error with PureCounter:', error);
        viewsElement.textContent = count;
      }
    }, 200);
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
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing portfolio views tracking...');
  
  // Wait for all scripts to load
  setTimeout(async () => {
    try {
      // Track visitor with location (runs in background)
      await trackVisitorWithLocation();
      
      // Increment view count on every page load/refresh
      console.log('About to increment portfolio views...');
      await incrementPortfolioViews();
    } catch (error) {
      console.error('Error during initialization:', error);
      // Fallback to local storage
      incrementLocalViews();
    }
  }, 1000);
});

// Export functions for external use
window.portfolioViews = {
  increment: incrementPortfolioViews,
  getCurrent: getCurrentViewCount,
  updateCounter: updateViewsCounter,
  
  // New functions for analytics
  getVisitorData: async function() {
    try {
      const visitorsRef = collection(db, 'portfolio', 'analytics', 'visitors');
      const snapshot = await getDocs(visitorsRef);
      const visitors = [];
      
      snapshot.forEach((doc) => {
        visitors.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return visitors.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error getting visitor data:', error);
      return [];
    }
  },
  
  getLocationStats: async function() {
    try {
      const visitors = await this.getVisitorData();
      const locationStats = {};
      
      visitors.forEach(visitor => {
        if (visitor.location) {
          const key = visitor.location.country || visitor.location.city || 'Unknown';
          locationStats[key] = (locationStats[key] || 0) + 1;
        }
      });
      
      return locationStats;
    } catch (error) {
      console.error('Error getting location stats:', error);
      return {};
    }
  }
};
