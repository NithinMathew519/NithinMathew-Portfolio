# Nithin Mathew Chinnabattini - Portfolio Website

A modern, responsive portfolio website showcasing my skills, experience, and projects as a Full-Stack Software Engineer.

## Overview

This portfolio website is designed to provide a comprehensive overview of my professional journey, technical expertise, and project accomplishments. Built with modern web technologies, it features a clean, responsive design that works seamlessly across all devices.

**Live Website:** [Your Portfolio URL]

## About Me

Full-Stack Software Engineer with a Master's degree in Computer Science from Roosevelt University and over one year of professional experience at Nisum. Specialized in Java, Python, JavaScript, and frameworks such as Spring Boot, Angular, and Node.js.

## Tech Stack

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Bootstrap 5
- **JavaScript** - Interactive functionality
- **Bootstrap 5** - Responsive framework
- **AOS (Animate On Scroll)** - Smooth animations
- **Swiper.js** - Touch slider
- **GLightbox** - Lightbox gallery
- **Typed.js** - Typing animation effect

### Backend & Tools

- **Formspree** - Contact form handling
- **Firebase** - Real-time view tracking and analytics
- **DevIcons** - Technology icons
- **Bootstrap Icons** - UI icons

## Features

### Design & User Experience

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark Theme** - Sleek dark background with accent colors
- **Interactive Elements** - Hover effects, animations, and transitions
- **Fast Loading** - Optimized assets and efficient code structure

### Sections

1. **Hero Section** - Dynamic introduction with typing animation
2. **About** - Professional summary and personal details
3. **Stats** - Key metrics and achievements counter
4. **Technical Skills** - Categorized skill showcase with technology icons
5. **Resume** - Education, experience, certifications, and achievements
6. **Projects** - Portfolio of professional and academic projects with filtering
7. **Services** - Professional services offered
8. **Testimonials** - Reviews from professors and colleagues
9. **Contact** - Contact form and location information

### Technical Features

- **Isotope Layout** - Filterable project portfolio
- **Pure Counter** - Animated statistics counters
- **Firebase View Tracking** - Real-time portfolio view counting
- **Contact Form** - Functional contact form with Formspree integration
- **Smooth Scrolling** - Seamless navigation between sections
- **Lazy Loading** - Optimized image loading
- **SEO Optimized** - Proper meta tags and semantic structure

## Project Structure

"""
NithinMathew-Portfolio/
├── index.html                 # Main HTML file
├── README.md                  # Complete project documentation
├── firebase-test.html         # Firebase testing and debugging
├── assets/
│   ├── css/
│   │   └── main.css           # Custom styles
│   ├── img/                   # Images and photos
│   │   ├── portfolio/         # Project screenshots
│   │   └── testimonials/      # Testimonial images
│   ├── js/
│   │   ├── main.js            # Main JavaScript functionality
│   │   ├── formspree-handler.js # Contact form handler
│   │   └── firebase-config.js # Firebase configuration and view tracking
│   └── vendor/                # Third-party libraries
│       ├── bootstrap/
│       ├── aos/
│       ├── glightbox/
│       ├── swiper/
│       └── ...
└── forms/
    └── contact.php            # PHP contact form (backup)
"""

## Key Projects Featured

### 1. N-Cart E-commerce Platform

- **Tech Stack:** Angular, Spring Boot, MySQL, Elasticsearch
- **Features:** Microservices architecture, REST APIs, TDD practices
- **Impact:** 25% performance improvement, 30% faster API response time

### 2. DemoCapstone Backend Project

- **Tech Stack:** Java, Spring Boot, RESTful APIs
- **Focus:** Backend development and microservices architecture

### 3. Scribe Social Media Web App

- **Tech Stack:** Angular, Node.js, Firebase
- **Features:** Real-time data management, cloud deployment
- **Impact:** 50% faster page load times with lazy loading

### 4. JPMC Software Engineering Simulation

- **Platform:** Forage
- **Focus:** Practical backend and frontend development tasks

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NithinMathew519/NithinMathew-Portfolio.git
   cd NithinMathew-Portfolio
   ```

2. **Open the project:**

   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience:

     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve .

     # Using PHP
     php -S localhost:8000
     ```

3. **View the website:**

   Open your browser and navigate to `http://localhost:8000`

## Contact Form Setup

The contact form uses **Formspree** for handling form submissions:

1. The form is configured to send emails to: `nithinmathew519@gmail.com`
2. Formspree endpoint: `https://formspree.io/f/mwpbdvrj`
3. Form includes validation and success/error messaging
4. All form data is processed securely through Formspree

## Customization

### Colors & Styling

- Primary colors and themes can be modified in `assets/css/main.css`
- Bootstrap variables can be customized for consistent theming

### Content Updates

- Personal information: Update the About section in `index.html`
- Projects: Add new projects in the Portfolio section
- Skills: Update the Technical Skills section with new technologies
- Resume: Keep the Resume section updated with latest experience

### Images

- Profile images: Replace files in `assets/img/`
- Project screenshots: Update images in `assets/img/portfolio/`
- Optimize images for web to maintain fast loading times

## 📱 Responsive Design

The website is fully responsive and tested on:

- **Desktop:** 1920px and above
- **Laptop:** 1366px - 1919px
- **Tablet:** 768px - 1365px
- **Mobile:** 320px - 767px

## Performance Optimizations

- **Minified CSS/JS** - Reduced file sizes
- **Optimized Images** - Compressed images without quality loss
- **Lazy Loading** - Images load on demand
- **CDN Resources** - Fast loading of external libraries
- **Semantic HTML** - Better accessibility and SEO

## SEO Features

- Semantic HTML structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Structured data markup
- Fast loading times
- Mobile-friendly design

## Analytics & Tracking

### Firebase View Tracking

This portfolio includes Firebase integration to track and display the number of portfolio views in real-time.

#### Firebase Tracking Features

1. **Real-time View Tracking**: Uses Firebase Firestore to store and increment view counts
2. **Automatic Counter Update**: Updates the "Portfolio Views" counter in the stats section
3. **Fallback Support**: Falls back to local storage if Firebase is unavailable
4. **Enhanced Logging**: Comprehensive console logging for debugging

#### How It Works

- **Firebase Configuration**: Stored in `assets/js/firebase-config.js`
- **Firestore Structure**: View counts stored at `portfolio/views/count`
- **View Counting**: Increments on every page load/refresh
- **UI Updates**: Automatically updates the stats counter display

#### Files Added/Modified

1. **index.html**: Added Firebase script import
2. **assets/js/firebase-config.js**: Firebase configuration and logic
3. **firebase-test.html**: Test file for Firebase debugging

### Firebase Setup Guide

#### Quick Setup Steps

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Select your project: `portfolio-501510`**
3. **Navigate to "Firestore Database" → "Rules" tab**
4. **Update security rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write access to the portfolio views document
    match /portfolio/views {
      allow read, write: if true;
    }
    
    // Deny access to all other documents
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

5.**Click "Publish" to save the rules**

#### Testing the Firebase Integration

1. Open your portfolio in a web browser
2. Open Developer Tools (F12) and check the Console tab
3. Look for these log messages:
   - ✅ "Firebase initialized successfully"
   - ✅ "Getting current view count..."
   - ✅ "Views incremented successfully, new count: X"

#### Expected Firestore Structure

After the first visit, you should see this in your Firestore database:

"""
portfolio (collection)
  └── views (document)
      └── count: 1 (or higher number)
"""

#### Troubleshooting

**Common Issues:**

- **Permission Denied**: Update Firestore security rules (see setup steps above)
- **Not Found**: Verify the document path is `portfolio/views`
- **Unavailable**: Check network connectivity

**Debugging Steps:**

1. Open browser console and refresh the page
2. Look for error messages starting with "Error updating views:"
3. Check if Firebase is initialized successfully
4. Use the test file (`firebase-test.html`) to isolate issues

**Common Error Codes:**

- `permission-denied`: Firestore rules are blocking the operation
- `not-found`: The collection/document path might be wrong
- `unavailable`: Network connectivity issues
- `unauthenticated`: Authentication required (shouldn't happen with current setup)

## Contributing

While this is a personal portfolio, suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

## Nithin Mathew Chinnabattini

- **Email:** <nithinmathew519@gmail.com>
- **Phone:** +1(312)804-7586
- **Location:** Chicago, IL
- **LinkedIn:** [nithin-mathew-chinnabattini](https://www.linkedin.com/in/nithin-mathew-chinnabattini-97a3251b9/)
- **GitHub:** [NithinMathew519](https://github.com/NithinMathew519)
- **Twitter:** [@MathewNithin1](https://x.com/MathewNithin1)

## Acknowledgments

- **Bootstrap Team** - For the excellent CSS framework
- **AOS Library** - For smooth scroll animations
- **DevIcons** - For technology icons
- **Formspree** - For contact form handling
- **All Contributors** - For feedback and suggestions

---

**Last Updated:** July 2025

*This portfolio is continuously updated with new projects and experiences. Check back regularly for the latest updates!*
