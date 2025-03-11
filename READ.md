# SPEN Lab Website

This is the official website for the Security and Privacy of Emerging Networks (SPEN) Research Lab at the University of Southern Mississippi, showcasing research interests, publications, team information, and academic activities.

## Overview

The SPEN Lab website serves as a digital hub for Dr. Ahmed B. T. Sherif's research group, highlighting their work in cybersecurity, privacy, and networked systems. The site features a modern, responsive design with interactive elements to engage visitors and effectively communicate the lab's research focus and accomplishments.

## Features

- **Fully Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Research Cards**: Animated cards with hover effects showcase research areas
- **Interactive Course Cards**: Animated cards detail courses offered by the lab
- **Tabbed Content Navigation**: Clean organization of publications and research outputs
- **Team Member Profiles**: Showcases PhD students and research team
- **Dynamic Content Sections**: Dedicated pages for teaching, service, research, and updates
- **Optimized Image Loading**: Progressive and lazy loading for performance
- **Animations & Transitions**: Modern UI with subtle animations for engagement
- **Accessibility Features**: ARIA attributes and keyboard navigation
- **Mobile-First Approach**: Touch-friendly elements and adaptive layouts

## Technologies Used

- **HTML5**: Semantic markup for better structure and accessibility
- **CSS3**: Modern features including:
  - Grid and Flexbox layouts
  - CSS Variables
  - Animations and transitions
  - Media queries for responsive design
- **JavaScript (ES6+)**: Vanilla JS with modern features:
  - Intersection Observer for lazy loading
  - Event delegation for performance
  - ES6 module pattern
  - Touch event handling
- **Development Approach**:
  - Progressive enhancement
  - Mobile-first responsive design
  - Performance optimization techniques
  - No dependencies on external frameworks

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/spenn-lab-website.git
```

2. Open the website:
- Simply open `index.html` in your web browser
- Or use a local server (recommended):
  ```bash
  # Using Python
  python -m http.server
  
  # Using Node.js and http-server
  npx http-server
  ```

## Project Structure

```
spenn-lab-website/
├── CSS/
│   └── style.css         # Main stylesheet with responsive design
├── js/
│   └── script.js         # Main JavaScript with interactive features
├── images/
│   ├── logo.png          # SPEN Lab logo
│   ├── AI.png            # AI icon for icon strip
│   ├── Hardware.png      # Hardware icon for icon strip
│   ├── Security.png      # Security icon for icon strip
│   └── [other images]    # Various content images
├── index.html            # Home page
├── research.html         # Research interests and publications
├── teaching.html         # Courses and teaching materials
├── service.html          # Service activities
├── team.html             # Team member profiles
├── updates.html          # Recent updates and news
├── supervisors.html      # Information about lab supervisors
├── LICENSE               # License information
└── README.md             # This documentation file
```

## Key Components

### Interactive Card System

The site features an interactive card system for both research interests and courses:
- Cards animate in with a staggered delay when page loads
- Hover/focus effects include:
  - Slight elevation (shadow and transform)
  - Yellow accent border that grows from top
  - Heading text shift
  - Icon rotation and scaling
  - Content shifts for visual interest

### Responsive Navigation

- Desktop: Horizontal navigation bar with dropdown capabilities
- Tablet/Mobile: 
  - Hamburger menu toggle
  - Full-width overlay menu
  - Touch-optimized tap targets
  - Smooth transitions

### Icon Strip Feature

- Features three key icons (AI, Hardware, Security) that represent lab focus areas
- Optimized sizing across devices:
  - Desktop: 130px height
  - Tablet: 100px height
  - Mobile: 65px height
- Consistent display across all pages

### Responsive Image Strategy

- Size-appropriate images for different viewports
- Lazy loading for performance
- Optimized image dimensions and compression

## CSS Architecture

The CSS is organized into logical sections:
1. **Basic CSS Reset & Utilities**
2. **Typography & Base Elements**
3. **Header & Navigation**
4. **Layout Components**
5. **Hero Sections**
6. **Cards & Interactive Elements**
7. **Form Elements**
8. **Footer**
9. **Responsive Adjustments**

## JavaScript Features

The JavaScript provides several key functionalities:
- **Mobile Navigation**: Toggle menu, overlay handling, and responsive adjustments
- **Card Animations**: Staggered entrance animations and interactive hover effects
- **Lazy Loading**: Performance-optimized image loading with Intersection Observer
- **Tab System**: Interactive tabbed content navigation
- **Touch Optimization**: Special handling for touch devices
- **Responsive Adjustments**: Dynamic layout adjustments based on screen size
- **Form Handling**: Validation and submission handling

## Responsive Design Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: 479px and below

## Testing the Mobile Version

To test the mobile responsiveness:

1. **Using Browser DevTools**:
   - Chrome/Edge: Right-click > Inspect > Toggle device toolbar (or Ctrl+Shift+M)
   - Firefox: Right-click > Inspect Element > Responsive Design Mode
   - Safari: Develop menu > Enter Responsive Design Mode

2. **Using Online Tools**:
   - [Responsinator](http://www.responsinator.com/)
   - [BrowserStack](https://www.browserstack.com/)
   - [Screenfly](http://quirktools.com/screenfly/)

3. **On Real Devices**:
   - Host the site locally or on a test server
   - Connect mobile devices to the same network
   - Enter your computer's local IP address plus port in the mobile browser

## Development Guidelines

When making changes to the website, please follow these guidelines:

1. **Maintain Responsive Design**: Test any changes across multiple screen sizes
2. **Preserve Accessibility**: Maintain ARIA attributes and keyboard navigation
3. **Performance First**: Optimize images and minimize JavaScript operations
4. **Browser Compatibility**: Test across major browsers (Chrome, Firefox, Safari, Edge)
5. **Mobile Testing**: Verify touch interactions work properly on mobile devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or contributions to the SPEN Lab website, please contact:
- **Dr. Ahmed B. T. Sherif**: [Ahmed.Sherif@usm.edu](mailto:Ahmed.Sherif@usm.edu)
- **Website Maintainer**: Zohaib Chaudhary 
