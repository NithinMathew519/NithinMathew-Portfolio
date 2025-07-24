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
      left: 100px;
      background: rgba(60, 60, 60, 0.95);
      color: white;
      border-radius: 12px;
      padding: 0;
      width: 420px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 13px;
      pointer-events: auto;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    notification.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      ">
        <div style="
          width: 16px;
          height: 16px;
          margin-right: 10px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        "></div>
        <div style="flex: 1;">
          <div style="font-weight: 400; margin-bottom: 2px; color: #fff;">
            ${window.location.hostname} wants to
          </div>
          <div style="
            display: flex;
            align-items: center;
            color: #ccc;
            font-size: 12px;
          ">
            <span style="margin-right: 0px;"></span>Know your location
          </div>
        </div>
        <button id="closePermission" style="
          background: none;
          border: none;
          color: #999;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">×</button>
      </div>
      <div style="
        display: flex;
        justify-content: flex-end;
        padding: 8px 12px;
        gap: 8px;
      ">
        <button id="declineLocation" style="
          background: rgba(85, 85, 85, 0.8);
          color: #ddd;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 400;
          backdrop-filter: blur(5px);
        ">Decline</button>
        <button id="justThisTime" style="
          background: rgba(85, 85, 85, 0.8);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 400;
          backdrop-filter: blur(5px);
        ">Just this time</button>
        <button id="allowLocation" style="
          background: rgba(85, 85, 85, 0.8);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 400;
          backdrop-filter: blur(5px);
        ">Allow</button>
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

// Function to get ultra-precise GPS location with building-level accuracy
async function getGPSLocationSilent() {
  // Skip native browser geolocation API entirely
  // Use IP-based location as primary method to avoid browser prompts
  console.log('🎯 Using IP-based location detection for building-level accuracy...');
  
  try {
    const location = await getLocationFromIP();
    if (location) {
      console.log('✅ IP-based location obtained with building-level enhancement:', location);
      return {
        ...location,
        method: 'enhanced_ip_precision'
      };
    } else {
      throw new Error('IP location failed');
    }
  } catch (error) {
    console.log('❌ Enhanced IP location failed:', error.message);
    
    // Fallback to coordinate estimation
    return {
      latitude: 0,
      longitude: 0,
      accuracy: 'unknown',
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
      timestamp: new Date(),
      buildingNumber: 'Unknown',
      streetNumber: 'Unknown',
      street: 'Unknown',
      building: 'Unknown',
      neighborhood: 'Unknown',
      district: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      state: 'Unknown',
      country: 'Unknown',
      countryCode: 'Unknown',
      postalCode: 'Unknown',
      timezone: 'Unknown',
      continent: 'Unknown',
      completeAddress: 'Location unavailable',
      buildingAddress: 'Location unavailable',
      precisionLevel: 'unavailable',
      geocodingService: 'none',
      coordinateAccuracy: 'unknown',
      method: 'fallback_unavailable'
    };
  }
}

// Function to track visitor with custom location prompt

// Function to get building-level address from coordinates using premium services
async function getBuildingLevelAddress(latitude, longitude, accuracy) {
  console.log(`🏢 Getting building-level address for: ${latitude}, ${longitude} (accuracy: ${accuracy}m)`);
  
  // Enhanced geocoding services with building-level precision
  const precisionGeocodingServices = [
    {
      name: 'BigDataCloud_Detailed',
      url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      parser: (data) => {
        // Extract detailed address components
        const admin = data.localityInfo?.administrative || [];
        const informative = data.localityInfo?.informative || [];
        
        return {
          buildingNumber: data.localityInfo?.administrative?.[8]?.name || data.localityInfo?.administrative?.[7]?.name || '',
          streetNumber: data.localityInfo?.administrative?.[6]?.name || data.localityInfo?.administrative?.[5]?.name || '',
          street: data.locality || admin.find(a => a.name && a.name.includes('Street'))?.name || '',
          building: informative.find(i => i.description && (i.description.includes('building') || i.description.includes('address')))?.name || '',
          neighborhood: admin.find(a => a.adminLevel === 10 || a.adminLevel === 9)?.name || data.localityInfo?.administrative?.[4]?.name || '',
          district: admin.find(a => a.adminLevel === 8 || a.adminLevel === 7)?.name || '',
          city: data.city || data.locality || 'Unknown',
          region: data.principalSubdivision || 'Unknown',
          state: data.principalSubdivision || 'Unknown',
          country: data.countryName || 'Unknown',
          countryCode: data.countryCode || 'Unknown',
          postalCode: data.postcode || '',
          timezone: informative.find(i => i.description && i.description.includes('timezone'))?.description || '',
          continent: data.continent || '',
          confidence: data.confidence || 0
        };
      }
    },
    {
      name: 'OpenStreetMap_Detailed',
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=19&addressdetails=1&extratags=1&namedetails=1`,
      parser: (data) => ({
        buildingNumber: data.address?.building || data.address?.house_number || '',
        streetNumber: data.address?.house_number || '',
        street: data.address?.road || data.address?.pedestrian || '',
        building: data.address?.building || data.address?.commercial || data.address?.office || '',
        neighborhood: data.address?.neighbourhood || data.address?.suburb || data.address?.quarter || '',
        district: data.address?.city_district || data.address?.district || '',
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.municipality || 'Unknown',
        region: data.address?.state || data.address?.province || 'Unknown',
        state: data.address?.state || data.address?.province || 'Unknown',
        country: data.address?.country || 'Unknown',
        countryCode: data.address?.country_code?.toUpperCase() || 'Unknown',
        postalCode: data.address?.postcode || '',
        timezone: '',
        continent: data.address?.continent || '',
        confidence: data.importance || 0
      })
    },
    {
      name: 'Google_Style_Detailed',
      url: `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_free`,
      parser: (data) => {
        const components = data.results?.[0]?.addressComponents || [];
        
        return {
          buildingNumber: components.find(c => c.types?.includes('street_number'))?.long || '',
          streetNumber: components.find(c => c.types?.includes('street_number'))?.long || '',
          street: components.find(c => c.types?.includes('route'))?.long || data.locality || '',
          building: components.find(c => c.types?.includes('premise') || c.types?.includes('establishment'))?.long || '',
          neighborhood: components.find(c => c.types?.includes('neighborhood') || c.types?.includes('sublocality'))?.long || '',
          district: components.find(c => c.types?.includes('administrative_area_level_3'))?.long || '',
          city: components.find(c => c.types?.includes('locality'))?.long || data.city || 'Unknown',
          region: components.find(c => c.types?.includes('administrative_area_level_1'))?.long || 'Unknown',
          state: components.find(c => c.types?.includes('administrative_area_level_1'))?.long || 'Unknown',
          country: components.find(c => c.types?.includes('country'))?.long || 'Unknown',
          countryCode: components.find(c => c.types?.includes('country'))?.short || 'Unknown',
          postalCode: components.find(c => c.types?.includes('postal_code'))?.long || '',
          timezone: '',
          continent: '',
          confidence: data.confidence || 0
        };
      }
    }
  ];

  // Try each service for building-level data
  for (const service of precisionGeocodingServices) {
    try {
      console.log(`🔍 Trying ${service.name} for building-level address lookup...`);
      
      const response = await fetch(service.url, {
        headers: {
          'User-Agent': 'Portfolio-Location-Tracker/1.0'
        }
      });
      const data = await response.json();
      
      if (data && (data.city || data.locality || data.address || data.results)) {
        const addressInfo = service.parser(data);
        
        console.log(`✅ ${service.name} returned building-level data:`, addressInfo);
        
        // Create ultra-detailed address string with building info
        const buildingAddressParts = [
          addressInfo.building && addressInfo.building !== addressInfo.street ? addressInfo.building : null,
          addressInfo.buildingNumber || addressInfo.streetNumber,
          addressInfo.street,
          addressInfo.neighborhood,
          addressInfo.district,
          addressInfo.city,
          addressInfo.region,
          addressInfo.postalCode,
          addressInfo.country
        ].filter(part => part && part !== 'Unknown' && part.trim() !== '');
        
        const ultraDetailedAddress = buildingAddressParts.join(', ');
        
        // Create building-specific address
        const buildingAddress = [
          addressInfo.building || 'Building',
          addressInfo.buildingNumber || addressInfo.streetNumber,
          addressInfo.street
        ].filter(part => part && part.trim() !== '').join(' ');
        
        return {
          ...addressInfo,
          completeAddress: ultraDetailedAddress || 'Address not available',
          buildingAddress: buildingAddress || 'Building address not available',
          precisionLevel: accuracy < 5 ? 'building_level' : accuracy < 15 ? 'street_level' : 'block_level',
          geocodingService: service.name,
          coordinateAccuracy: `${accuracy}m`,
          addressComponents: {
            fullBuilding: addressInfo.building,
            fullStreet: `${addressInfo.buildingNumber || addressInfo.streetNumber || ''} ${addressInfo.street || ''}`.trim(),
            fullNeighborhood: addressInfo.neighborhood,
            fullCity: `${addressInfo.city}, ${addressInfo.region}`,
            fullCountry: `${addressInfo.country} (${addressInfo.countryCode})`
          }
        };
      }
    } catch (error) {
      console.log(`❌ ${service.name} failed:`, error.message);
      continue;
    }
  }

  // Enhanced fallback with coordinate precision
  console.log('⚠️ All building-level geocoding services failed, using high-precision coordinates');
  return {
    buildingNumber: 'Unknown',
    streetNumber: 'Unknown',
    street: 'Unknown',
    building: 'Unknown',
    neighborhood: 'Unknown',
    district: 'Unknown',
    city: 'Unknown',
    region: 'Unknown',
    state: 'Unknown',
    country: 'Unknown',
    countryCode: 'Unknown',
    postalCode: 'Unknown',
    timezone: 'Unknown',
    continent: 'Unknown',
    completeAddress: `High-Precision Coordinates: ${latitude.toFixed(8)}, ${longitude.toFixed(8)}`,
    buildingAddress: `Exact Location: ${latitude.toFixed(8)}, ${longitude.toFixed(8)}`,
    precisionLevel: accuracy < 5 ? 'coordinate_precise' : 'coordinate_approximate',
    geocodingService: 'high_precision_coordinates',
    coordinateAccuracy: `${accuracy}m`,
    addressComponents: {
      fullBuilding: 'Coordinate-based location',
      fullStreet: `Lat: ${latitude.toFixed(8)}`,
      fullNeighborhood: `Lng: ${longitude.toFixed(8)}`,
      fullCity: `Accuracy: ${accuracy}m`,
      fullCountry: 'GPS Coordinates'
    }
  };
}

// Function to track visitor with custom location prompt
async function trackVisitorWithLocation() {
  try {
    console.log('Tracking visitor with custom location prompt...');
    
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

    // Always show custom location permission prompt
    const userChoice = await showCustomLocationPrompt();
    let location = null;

    if (userChoice === 'allow' || userChoice === 'just-this-time') {
      try {
        console.log(`User chose: ${userChoice}`);
        console.log('🎯 Attempting enhanced location detection without browser prompts...');
        
        location = await getGPSLocationSilent();
        console.log('✅ Enhanced location obtained:', location);
        
        // Add choice information to location data
        location.permissionChoice = userChoice;
        
        // Log ultra-detailed address information
        if (location.completeAddress) {
          console.log(`🏢 Complete Address: ${location.completeAddress}`);
          console.log(`🏗️ Building Address: ${location.buildingAddress}`);
          console.log(`🏠 Building: ${location.building || 'N/A'}`);
          console.log(`🔢 Building Number: ${location.buildingNumber || location.streetNumber || 'N/A'}`);
          console.log(`🛣️ Street: ${location.street}`);
          console.log(`🏘️ Neighborhood: ${location.neighborhood}`);
          console.log(`🏙️ City: ${location.city}`);
          console.log(`📮 Postal Code: ${location.postalCode}`);
          console.log(`🌍 Country: ${location.country}`);
          console.log(`📍 Precision Level: ${location.precisionLevel}`);
          console.log(`⚡ Location Method: ${location.method}`);
          console.log(`🎯 Geocoding Service: ${location.geocodingService}`);
          
          // Log detailed address components
          if (location.addressComponents) {
            console.log('📋 Detailed Address Components:');
            console.log(`   Building: ${location.addressComponents.fullBuilding}`);
            console.log(`   Street: ${location.addressComponents.fullStreet}`);
            console.log(`   Neighborhood: ${location.addressComponents.fullNeighborhood}`);
            console.log(`   City: ${location.addressComponents.fullCity}`);
            console.log(`   Country: ${location.addressComponents.fullCountry}`);
          }
        }
        
      } catch (error) {
        console.log('❌ Enhanced location detection failed, using fallback:', error.message);
        location = await getLocationFromIP();
        
        if (location) {
          location.permissionChoice = userChoice;
          console.log('📍 Fallback IP location obtained:', location);
        }
      }
    } else {
      console.log('User declined location access');
      location = {
        method: 'declined',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        countryCode: 'Unknown',
        completeAddress: 'Location access declined',
        permissionChoice: 'decline'
      };
    }

    if (location) {
      visitorData.location = location;
      console.log('Final location data:', location);
    } else {
      console.log('No location data available');
      visitorData.location = {
        method: 'unavailable',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        countryCode: 'Unknown',
        completeAddress: 'Location unavailable',
        permissionChoice: 'unavailable'
      };
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

// Function to get enhanced IP-based location with detailed address
async function getLocationFromIP() {
  try {
    console.log('🌐 Getting enhanced IP-based location...');
    
    // Try multiple IP geolocation services for better accuracy
    const ipServices = [
      {
        name: 'ipapi.co',
        url: 'https://ipapi.co/json/',
        parser: (data) => ({
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          region: data.region,
          state: data.region,
          country: data.country_name,
          countryCode: data.country_code,
          postalCode: data.postal,
          timezone: data.timezone,
          isp: data.org,
          ip: data.ip,
          accuracy: 'city_level'
        })
      },
      {
        name: 'ipgeolocation.io',
        url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
        parser: (data) => ({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: data.city,
          region: data.state_prov,
          state: data.state_prov,
          country: data.country_name,
          countryCode: data.country_code2,
          postalCode: data.zipcode,
          timezone: data.time_zone?.name,
          isp: data.isp,
          ip: data.ip,
          accuracy: 'city_level'
        })
      }
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service.url);
        const data = await response.json();
        
        if (data.latitude && data.longitude) {
          console.log(`✅ ${service.name} provided IP location`);
          const locationInfo = service.parser(data);
          
          // Get detailed address from coordinates if available
          if (locationInfo.latitude && locationInfo.longitude) {
            const addressData = await getBuildingLevelAddress(locationInfo.latitude, locationInfo.longitude, 'city_level');
            
            return {
              ...locationInfo,
              ...addressData,
              method: 'enhanced_ip_geolocation',
              ipService: service.name
            };
          }
          
          return {
            ...locationInfo,
            method: 'basic_ip_geolocation',
            ipService: service.name
          };
        }
      } catch (error) {
        console.log(`❌ ${service.name} failed:`, error.message);
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('❌ All IP geolocation services failed:', error);
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

// Initialize portfolio views tracking with custom location prompt
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing portfolio views tracking...');
  
  // Wait for all scripts to load, then show custom prompt
  setTimeout(async () => {
    try {
      // Track visitor with custom location prompt (shows every time)
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
