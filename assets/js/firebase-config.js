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

// Function to show custom location permission prompt with 3 options
function showCustomLocationPrompt() {
  console.log('🚨 Custom location permission prompt starting...');
  
  return new Promise((resolve) => {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      pointer-events: none;
    `;

    // Create browser-style notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      left: 150px;
      background: rgba(60, 60, 60, 0.95);
      color: white;
      border-radius: 6px;
      padding: 0;
      width: 280px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 11px;
      pointer-events: auto;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      
      @media (max-width: 768px) {
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100vw - 30px);
        max-width: 320px;
        font-size: 12px;
        border-radius: 8px;
      }
    `;

    notification.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        padding: 8px 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      ">
        <div style="
          width: 12px;
          height: 12px;
          margin-right: 6px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
        "></div>
        <div style="flex: 1;">
          <div style="font-weight: 400; margin-bottom: 1px; color: #fff; font-size: 11px;">
            ${window.location.hostname} wants to
          </div>
          <div style="
            display: flex;
            align-items: center;
            color: #ccc;
            font-size: 10px;
          ">
            <span style="margin-right: 0px;"></span>Know your location
          </div>
        </div>
        <button id="closePermission" style="
          background: none;
          border: none;
          color: #999;
          font-size: 12px;
          cursor: pointer;
          padding: 1px;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          @media (max-width: 768px) {
            font-size: 16px;
            min-width: 24px;
            min-height: 24px;
            width: auto;
            height: auto;
            touch-action: manipulation;
          }
        ">×</button>
      </div>
      <div style="
        display: flex;
        justify-content: space-between;
        padding: 6px 8px;
        gap: 3px;
        
        @media (max-width: 768px) {
          gap: 5px;
          flex-wrap: nowrap;
          padding: 8px 10px;
        }
      ">
        <button id="allowLocation" style="
          background: rgba(85, 85, 85, 0.8);
          color: white;
          border: none;
          padding: 5px 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 400;
          backdrop-filter: blur(5px);
          flex: 1;
          
          @media (max-width: 768px) {
            padding: 8px 10px;
            font-size: 12px;
            touch-action: manipulation;
            min-height: 36px;
            border-radius: 5px;
          }
        ">Allow</button>
        <button id="justThisTime" style="
          background: rgba(85, 85, 85, 0.8);
          color: white;
          border: none;
          padding: 5px 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 400;
          backdrop-filter: blur(5px);
          flex: 1;
          
          @media (max-width: 768px) {
            padding: 8px 10px;
            font-size: 12px;
            touch-action: manipulation;
            min-height: 36px;
            border-radius: 5px;
          }
        ">Just this time</button>
        <button id="declineLocation" style="
          background: rgba(85, 85, 85, 0.8);
          color: #ddd;
          border: none;
          padding: 5px 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 400;
          backdrop-filter: blur(5px);
          flex: 1;
          
          @media (max-width: 768px) {
            padding: 8px 10px;
            font-size: 12px;
            touch-action: manipulation;
            min-height: 36px;
            border-radius: 5px;
          }
        ">Decline</button>
      </div>
    `;

    overlay.appendChild(notification);
    document.body.appendChild(overlay);
    
    console.log('🚨 Custom location permission prompt displayed!');

    // Handle button clicks
    notification.querySelector('#allowLocation').onclick = () => {
      console.log('✅ User clicked Allow');
      document.body.removeChild(overlay);
      resolve('allow');
    };

    notification.querySelector('#justThisTime').onclick = () => {
      console.log('⏱️ User clicked Just this time');
      document.body.removeChild(overlay);
      resolve('just-this-time');
    };

    notification.querySelector('#declineLocation').onclick = () => {
      console.log('❌ User clicked Decline');
      document.body.removeChild(overlay);
      resolve('decline');
    };

    notification.querySelector('#closePermission').onclick = () => {
      console.log('❌ User clicked X (close)');
      document.body.removeChild(overlay);
      resolve('decline');
    };
  });
}

// Function to get simplified location data
async function getSimpleLocationData() {
  try {
    console.log('🌐 Getting basic location information...');
    
    // Simple IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.latitude && data.longitude) {
      console.log('✅ Basic location obtained');
      
      // Try to get more detailed address information
      let houseAddress = 'Not available';
      try {
        // Use a simple reverse geocoding to get street address
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}&addressdetails=1`);
        const geoData = await geoResponse.json();
        
        if (geoData.address) {
          // Build house address from available data
          const addressParts = [
            geoData.address.house_number || '',
            geoData.address.road || geoData.address.street || '',
            geoData.address.building || geoData.address.apartment || geoData.address.commercial || ''
          ].filter(part => part.trim() !== '');
          
          houseAddress = addressParts.length > 0 ? addressParts.join(' ') : 'Address not found';
        }
      } catch (error) {
        console.log('Could not get detailed address:', error.message);
      }
      
      return {
        ip: data.ip,
        houseAddress: houseAddress,
        streetAddress: `${data.postal ? data.postal + ' ' : ''}${data.city || 'Unknown'}`,
        city: data.city || 'Unknown',
        state: data.region || 'Unknown',
        pincode: data.postal || 'Unknown',
        timestamp: new Date()
      };
    } else {
      throw new Error('Location data unavailable');
    }
  } catch (error) {
    console.log('❌ Location detection failed:', error.message);
    
    return {
      ip: 'Unknown',
      houseAddress: 'Address unavailable',
      streetAddress: 'Address unavailable',
      city: 'Unknown',
      state: 'Unknown',
      pincode: 'Unknown',
      timestamp: new Date()
    };
  }
}

// Function to track visitor with simplified location data
async function trackVisitorWithLocation() {
  try {
    console.log('Tracking visitor with simplified location data...');
    
    // Always show custom location permission prompt
    const userChoice = await showCustomLocationPrompt();
    let locationData = null;

    if (userChoice === 'allow' || userChoice === 'just-this-time') {
      try {
        console.log(`User chose: ${userChoice}`);
        console.log('🎯 Getting basic location information...');
        
        locationData = await getSimpleLocationData();
        console.log('✅ Location data obtained:', locationData);
        
      } catch (error) {
        console.log('❌ Location detection failed:', error.message);
        locationData = {
          ip: 'Unknown',
          houseAddress: 'Location unavailable',
          streetAddress: 'Location unavailable',
          city: 'Unknown',
          state: 'Unknown',
          pincode: 'Unknown',
          timestamp: new Date()
        };
      }
    } else {
      console.log('User declined location access');
      locationData = {
        ip: 'Declined',
        houseAddress: 'Location access declined',
        streetAddress: 'Location access declined',
        city: 'Declined',
        state: 'Declined',
        pincode: 'Declined',
        timestamp: new Date()
      };
    }

    // Store simplified visitor data in Firebase
    const visitorsRef = collection(db, 'portfolio', 'analytics', 'visitors');
    await addDoc(visitorsRef, locationData);
    
    console.log('Visitor tracked successfully:', locationData);
    return locationData;
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

// Initialize portfolio views tracking with simplified location prompt
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing portfolio views tracking...');
  
  // Wait for all scripts to load, then show custom prompt
  setTimeout(async () => {
    try {
      // Track visitor with simplified location data
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

// Export functions for external use
window.portfolioViews = {
  increment: incrementPortfolioViews,
  getCurrent: getCurrentViewCount,
  updateCounter: updateViewsCounter,
  
  // Simplified functions for analytics
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
        if (visitor.city && visitor.city !== 'Unknown') {
          const key = `${visitor.city}, ${visitor.state || 'Unknown'}`;
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
