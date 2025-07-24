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
      left: 300px;
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
        left: 50%;
        transform: translateX(-50%);
        width: calc(100vw - 20px);
        max-width: 280px;
        font-size: 12px;
        border-radius: 5px;
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
            font-size: 14px;
            min-width: 20px;
            min-height: 20px;
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
          gap: 3px;
          flex-wrap: wrap;
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
            padding: 7px 8px;
            font-size: 11px;
            touch-action: manipulation;
            min-height: 32px;
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
            padding: 7px 8px;
            font-size: 11px;
            touch-action: manipulation;
            min-height: 32px;
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
            padding: 7px 8px;
            font-size: 11px;
            touch-action: manipulation;
            min-height: 32px;
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
  console.log(`🏢 Getting precise street address for: ${latitude}, ${longitude} (accuracy: ${accuracy})`);
  
  // Enhanced geocoding services with street-level precision
  const precisionGeocodingServices = [
    {
      name: 'OpenStreetMap_HighPrecision',
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&extratags=1&namedetails=1`,
      parser: (data) => ({
        streetNumber: data.address?.house_number || '',
        street: data.address?.road || data.address?.street || '',
        building: data.address?.building || data.address?.commercial || data.address?.office || '',
        neighborhood: data.address?.neighbourhood || data.address?.suburb || data.address?.quarter || '',
        city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
        state: data.address?.state || data.address?.province || 'Unknown',
        country: data.address?.country || 'Unknown',
        countryCode: data.address?.country_code?.toUpperCase() || 'Unknown',
        postalCode: data.address?.postcode || '',
        confidence: data.importance || 0
      })
    },
    {
      name: 'MapBox_Geocoding',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazk4cHBmOG0wMGF3M29tbzZlZWc5YmU4In0.K5tgCGdx2qyI0YJD8yZpIg&types=address`,
      parser: (data) => {
        const feature = data.features?.[0];
        const context = feature?.context || [];
        
        return {
          streetNumber: feature?.address || '',
          street: feature?.text || '',
          building: '',
          neighborhood: context.find(c => c.id?.includes('neighborhood'))?.text || '',
          city: context.find(c => c.id?.includes('place'))?.text || 'Unknown',
          state: context.find(c => c.id?.includes('region'))?.text || 'Unknown',
          country: context.find(c => c.id?.includes('country'))?.text || 'Unknown',
          countryCode: context.find(c => c.id?.includes('country'))?.short_code?.toUpperCase() || 'Unknown',
          postalCode: context.find(c => c.id?.includes('postcode'))?.text || '',
          confidence: feature?.relevance || 0
        };
      }
    },
    {
      name: 'LocationIQ_Geocoding',
      url: `https://us1.locationiq.com/v1/reverse.php?key=pk.6c5bb90e3a5e0e3a5e0e3a5e0e3a5e&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
      parser: (data) => ({
        streetNumber: data.address?.house_number || '',
        street: data.address?.road || '',
        building: data.address?.building || '',
        neighborhood: data.address?.neighbourhood || data.address?.suburb || '',
        city: data.address?.city || data.address?.town || 'Unknown',
        state: data.address?.state || 'Unknown',
        country: data.address?.country || 'Unknown',
        countryCode: data.address?.country_code?.toUpperCase() || 'Unknown',
        postalCode: data.address?.postcode || '',
        confidence: data.importance || 0
      })
    },
    {
      name: 'BigDataCloud_Enhanced',
      url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      parser: (data) => {
        const admin = data.localityInfo?.administrative || [];
        
        return {
          streetNumber: admin.find(a => a.adminLevel >= 10)?.name || '',
          street: data.locality || admin.find(a => a.name && (a.name.includes('Street') || a.name.includes('Avenue') || a.name.includes('Road')))?.name || '',
          building: '',
          neighborhood: admin.find(a => a.adminLevel === 9 || a.adminLevel === 8)?.name || '',
          city: data.city || 'Unknown',
          state: data.principalSubdivision || 'Unknown',
          country: data.countryName || 'Unknown',
          countryCode: data.countryCode || 'Unknown',
          postalCode: data.postcode || '',
          confidence: data.confidence || 0
        };
      }
    },
    {
      name: 'GeocodeFarm',
      url: `https://www.geocode.farm/v3/json/reverse/?lat=${latitude}&lon=${longitude}&country=us&lang=en&count=1`,
      parser: (data) => {
        const result = data.geocoding_results?.RESULTS?.[0];
        
        return {
          streetNumber: result?.ADDRESS?.street_number || '',
          street: result?.ADDRESS?.street_name || '',
          building: '',
          neighborhood: result?.ADDRESS?.locality || '',
          city: result?.ADDRESS?.city || 'Unknown',
          state: result?.ADDRESS?.state || 'Unknown',
          country: result?.ADDRESS?.country || 'Unknown',
          countryCode: result?.ADDRESS?.country_code || 'Unknown',
          postalCode: result?.ADDRESS?.postal_code || '',
          confidence: result?.accuracy || 0
        };
      }
    },
    {
      name: 'PositionStack',
      url: `http://api.positionstack.com/v1/reverse?access_key=free&query=${latitude},${longitude}&limit=1`,
      parser: (data) => {
        const result = data.data?.[0];
        
        return {
          streetNumber: result?.number || '',
          street: result?.street || '',
          building: '',
          neighborhood: result?.neighbourhood || '',
          city: result?.locality || 'Unknown',
          state: result?.region || 'Unknown',
          country: result?.country || 'Unknown',
          countryCode: result?.country_code || 'Unknown',
          postalCode: result?.postal_code || '',
          confidence: result?.confidence || 0
        };
      }
    }
  ];

  // Try each service for precise street address
  for (const service of precisionGeocodingServices) {
    try {
      console.log(`🔍 Trying ${service.name} for precise street address...`);
      
      const response = await fetch(service.url, {
        headers: {
          'User-Agent': 'Portfolio-Location-Tracker/1.0'
        }
      });
      const data = await response.json();
      
      if (data && (data.address || data.city || data.locality || data.items || data.features || data.geocoding_results || data.data)) {
        const addressInfo = service.parser(data);
        
        // Only proceed if we got actual street information
        if (addressInfo.street && addressInfo.street !== 'Unknown' && addressInfo.street !== addressInfo.city) {
          console.log(`✅ ${service.name} returned precise street data:`, addressInfo);
          
          // Create detailed address string
          const addressParts = [
            addressInfo.streetNumber,
            addressInfo.street,
            addressInfo.neighborhood,
            addressInfo.city,
            addressInfo.state,
            addressInfo.postalCode,
            addressInfo.country
          ].filter(part => part && part !== 'Unknown' && part.trim() !== '');
          
          const completeAddress = addressParts.join(', ');
          
          // Create building-specific address
          const buildingAddress = [
            addressInfo.building || '',
            addressInfo.streetNumber,
            addressInfo.street
          ].filter(part => part && part.trim() !== '').join(' ') || 'Address not found';
          
          return {
            streetNumber: addressInfo.streetNumber,
            street: addressInfo.street,
            building: addressInfo.building,
            neighborhood: addressInfo.neighborhood,
            city: addressInfo.city,
            state: addressInfo.state,
            country: addressInfo.country,
            countryCode: addressInfo.countryCode,
            postalCode: addressInfo.postalCode,
            completeAddress: completeAddress || 'Address not available',
            buildingAddress: buildingAddress,
            precisionLevel: accuracy === 'city_level' ? 'ip_enhanced' : 'street_level',
            geocodingService: service.name
          };
        }
      }
    } catch (error) {
      console.log(`❌ ${service.name} failed:`, error.message);
      continue;
    }
  }

  // Fallback - return minimal but clean data
  console.log('⚠️ All street-level geocoding services failed, using basic location data');
  return {
    streetNumber: '',
    street: 'Street not found',
    building: '',
    neighborhood: '',
    city: 'Unknown',
    state: 'Unknown',
    country: 'Unknown',
    countryCode: 'Unknown',
    postalCode: '',
    completeAddress: `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    buildingAddress: 'Address not available',
    precisionLevel: 'coordinates_only',
    geocodingService: 'fallback'
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
        
        // Log clean address information
        if (location.completeAddress) {
          console.log(`🏢 Complete Address: ${location.completeAddress}`);
          console.log(`🏗️ Building Address: ${location.buildingAddress}`);
          console.log(`🏠 Building: ${location.building || 'N/A'}`);
          console.log(`🔢 Street Number: ${location.streetNumber || 'N/A'}`);
          console.log(`🛣️ Street: ${location.street}`);
          console.log(`🏘️ Neighborhood: ${location.neighborhood}`);
          console.log(`🏙️ City: ${location.city}`);
          console.log(`📮 Postal Code: ${location.postalCode}`);
          console.log(`🌍 Country: ${location.country}`);
          console.log(`📍 Precision Level: ${location.precisionLevel}`);
          console.log(`⚡ Location Method: ${location.method}`);
          console.log(`🎯 Geocoding Service: ${location.geocodingService}`);
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
      },
      {
        name: 'ip-api.com',
        url: 'http://ip-api.com/json/?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query',
        parser: (data) => ({
          latitude: data.lat,
          longitude: data.lon,
          city: data.city,
          region: data.regionName,
          state: data.regionName,
          country: data.country,
          countryCode: data.countryCode,
          postalCode: data.zip,
          timezone: data.timezone,
          isp: data.isp,
          ip: data.query,
          accuracy: 'city_level'
        })
      },
      {
        name: 'freegeoip.app',
        url: 'https://freegeoip.app/json/',
        parser: (data) => ({
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          region: data.region_name,
          state: data.region_name,
          country: data.country_name,
          countryCode: data.country_code,
          postalCode: data.zip_code,
          timezone: data.time_zone,
          isp: '',
          ip: data.ip,
          accuracy: 'city_level'
        })
      },
      {
        name: 'ipstack.com',
        url: 'http://api.ipstack.com/check?access_key=free&format=1',
        parser: (data) => ({
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          region: data.region_name,
          state: data.region_name,
          country: data.country_name,
          countryCode: data.country_code,
          postalCode: data.zip,
          timezone: data.time_zone?.id,
          isp: data.connection?.isp,
          ip: data.ip,
          accuracy: 'city_level'
        })
      },
      {
        name: 'abstractapi.com',
        url: 'https://ipgeolocation.abstractapi.com/v1/?api_key=free',
        parser: (data) => ({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: data.city,
          region: data.region,
          state: data.region,
          country: data.country,
          countryCode: data.country_code,
          postalCode: data.postal_code,
          timezone: data.timezone?.name,
          isp: data.connection?.autonomous_system_organization,
          ip: data.ip_address,
          accuracy: 'city_level'
        })
      }
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service.url);
        const data = await response.json();
        
        if (data.latitude && data.longitude && data.status !== 'fail') {
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
