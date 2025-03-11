# SPEN Lab Website Maintenance Guide

This document provides detailed instructions for maintaining and updating the SPEN Lab website. It's intended for lab members, students, and staff who need to make common changes to the site content without extensive web development knowledge.

## Table of Contents

1. [Adding Conference Entries](#adding-conference-entries)
2. [Updating Service Page Information](#updating-service-page-information)
3. [Adding/Editing Team Members](#addingediting-team-members)
4. [Modifying Logo Sizes](#modifying-logo-sizes)
5. [Uploading New Images](#uploading-new-images)
6. [Adding Research Publications](#adding-research-publications)
7. [Updating Course Information](#updating-course-information)
8. [Editing the Icon Strip](#editing-the-icon-strip)
9. [Managing the Meeting Request Form](#managing-the-meeting-request-form)
10. [Common Troubleshooting](#common-troubleshooting)

---

## Adding Conference Entries

Conference entries appear in several places on the website, primarily in the `service.html` page. Follow these steps to add new conference roles:

### Adding Conference Leadership Roles

1. Open `service.html` in a text editor or HTML editor
2. Locate the "Conference Leadership Roles" section (around line 75):
   ```html
   <!-- Conference Leadership Roles -->
   <section class="info-card">
     <h2>Conference Leadership Roles</h2>
     <ul>
       <!-- Existing entries here -->
     </ul>
   </section>
   ```
3. Add a new list item (`<li>`) with your conference information:
   ```html
   <li>Role Title, Conference Name (Conference Acronym Year)</li>
   ```
   
   For example:
   ```html
   <li>Program Chair, IEEE International Conference on Cybersecurity (ICC 2024)</li>
   ```
4. Save the file

### Adding Conference Technical Program Committee Memberships

1. Open `service.html` in a text editor
2. Find the "Conference Technical Program Committee Member" section (around line 85)
3. Add a new entry following the existing format:
   ```html
   <li>Conference Name (ACRONYM): YEAR, YEAR, YEAR (specific tracks if applicable)</li>
   ```

### Adding Conference Reviewing Activities

If you need to add conference reviewing activities:

1. Open `service.html` and find the journal reviewing section or create a new section if needed
2. Add your entries using the consistent format of the existing entries

## Updating Service Page Information

The service page (`service.html`) contains various professional activities. Here's how to update different sections:

### Adding Editorial Roles

1. Open `service.html` in a text editor
2. Find the "Editorial Roles" section (around line 60)
3. Add a new list item with the journal name and date range:
   ```html
   <li>Editor, Special Issue "Title of Special Issue", Journal Name (Publisher) (Start Year - Present/End Year)</li>
   ```

### Adding Professional Memberships

1. Locate the "Professional Membership" section (around line 50)
2. Add a new list item:
   ```html
   <li><strong>Membership Level</strong>, Organization Name (Start Date - End Date/Present)</li>
   ```

### Adding Grant Review Panels

1. Find the "Grant Review Panels and External Reviewer" section
2. Add new entries following the existing format:
   ```html
   <li>Organization Name Reviewer (Year Range)</li>
   ```

## Adding/Editing Team Members

The team page displays information about lab members. Here's how to add or edit team members:

### Adding a New PhD Student

1. Open `team.html` in a text editor
2. Locate the "PhD Students" section (around line 70)
3. Add a new team card entry with this structure:
   ```html
   <!-- Student Name -->
   <article class="team-card detailed-profile">
     <img src="images/filename.png" alt="Student Name - PhD Student" />
     <div class="profile-info">
       <p><strong>Name:</strong> Student Name</p>
       <p><strong>Title:</strong> PhD Student</p>
       <p><strong>Major:</strong> Field of Study</p>
       <p><strong>Research:</strong> Research Focus Area</p>
       <p><strong>First Employment:</strong> Company/Institution or N/A</p>
     </div>
   </article>
   ```
4. Save the student's profile photo to the `images` folder (recommended size: 250x250 pixels)
5. Update the `src` attribute in the `<img>` tag to point to your new image

### Editing an Existing Team Member

1. Find the team member's entry in `team.html`
2. Update the relevant information (name, title, major, research, etc.)
3. If needed, replace their photo by updating the `src` attribute to point to a new image file

### Adding a New Team Category

If you need to add a new category of team members (e.g., "Master's Students"):

1. After an existing section like "PhD Students", add a new section:
   ```html
   <!-- Master's Students -->
   <section class="team-group">
     <h3>Master's Students</h3>
     <div class="team-cards">
       <!-- Add student entries here using the format above -->
     </div>
   </section>
   ```

## Modifying Logo Sizes

The website uses various logos and icons. Here's how to adjust their sizes:

### Changing Header Logo Sizes

The two main logos in the header can be resized by editing the CSS:

1. Open `CSS/style.css` in a text editor
2. For the left logo (Southern Miss), find these lines (around line 180):
   ```css
   /* Left logo (Southern Miss) */
   .left-logo {
     height: 80px; /* FIXED: Reduced from 150px for desktop */
     width: auto;
   }
   ```
3. Change the `height` value to your desired size (e.g., `height: 100px;`)
4. For the right logo (SPEN Lab), find these lines (around line 208):
   ```css
   /* The Spenn Lab logo on the far right */
   .right-logo {
     height: 80px; /* FIXED: Reduced from 150px for desktop */
     width: auto;
   }
   ```
5. Adjust the `height` value as needed

### Changing Icon Strip Sizes

The three icons in the black strip below the header can be resized:

1. Open `CSS/style.css` in a text editor
2. Find the icon strip section (around line 1080):
   ```css
   /* Force consistent icon sizing - this is key for all pages */
   .icon-strip img {
     height: 130px !important; /* Increased from 100px */
     width: auto !important;
     max-width: none !important;
     border-radius: 4px !important;
     object-fit: contain !important;
     display: inline-block !important;
     visibility: visible !important;
     opacity: 1 !important;
   }
   ```
3. Change the `height` value (currently 130px) to your desired size
4. Also update the mobile-specific values in the responsive sections (search for "icon-strip" to find all occurrences)

### Adjusting Mobile Logo Sizes

For mobile devices, the logos have separate size settings:

1. Find the mobile media query section (around line 1140):
   ```css
   @media (max-width: 768px) {
     /* Significantly reduce logo sizes */
     .left-logo, .right-logo {
       height: 50px;
       width: auto;
     }
     
     /* Other mobile styles... */
   }
   ```
2. Adjust the `height` value for mobile logos
3. For very small devices, find the extra small section (around line 1320):
   ```css
   @media (max-width: 480px) {
     /* Extra small devices */
     .left-logo, .right-logo {
       height: 40px; /* Further reduce logos */
     }
     
     /* Other small mobile styles... */
   }
   ```

## Uploading New Images

When adding new images to the website:

1. Choose an appropriate file format:
   - Photos: `.jpg` or `.webp` for best compression
   - Graphics with transparency: `.png`
   - Simple icons: `.svg` where possible
2. Optimize the image before uploading:
   - Resize to the appropriate dimensions (don't upload oversized images)
   - Compress using tools like TinyPNG, ImageOptim, or Squoosh
3. Use descriptive filenames (e.g., `john-smith-profile.jpg` not `IMG12345.jpg`)
4. Upload the file to the `images` directory
5. Reference the image in HTML using the relative path:
   ```html
   <img src="images/filename.jpg" alt="Descriptive text about the image" />
   ```

## Adding Research Publications

To add new research publications to the website:

1. Open `research.html` in a text editor
2. Find the publications section (usually with tabs for different years or types)
3. Add a new publication entry in this format:
   ```html
   <div class="pub-card">
     <h3>Publication Title</h3>
     <p><em>Authors Names</em></p>
     <p>Journal/Conference Name, Volume, Pages, Year</p>
     <p>
       <a href="link-to-paper" target="_blank" class="link-highlight">View Paper</a> |
       <a href="link-to-code" target="_blank" class="link-highlight">Code</a> |
       <a href="link-to-doi" target="_blank" class="link-highlight">DOI</a>
     </p>
   </div>
   ```
4. Place the entry in the appropriate tab section based on year or publication type

## Updating Course Information

To update course information on the teaching page:

1. Open `teaching.html` in a text editor
2. Find the appropriate course section (Undergraduate or Graduate)
3. To add a new course, copy an existing course card and modify it:
   ```html
   <article class="course-card interests-card" tabindex="0">
     <img src="images/course-icon.png" alt="Course Icon" class="course-icon card-icon" />
     <h4>COURSE CODE – Course Name</h4>
     <p>
       <strong>Overview:</strong> Description of the course content and focus areas.
     </p>
     <p>
       <strong>Key Skills:</strong> Skill 1, skill 2, skill 3
     </p>
   </article>
   ```
4. To edit an existing course, update the text content and/or image reference

## Editing the Icon Strip

The icon strip contains three key icons. To modify them:

### Changing Icons

1. Create/prepare the new icon (recommended size: at least 130x130 pixels)
2. Upload it to the `images` directory
3. Open each HTML file that uses the icon strip
4. Find the icon strip section:
   ```html
   <section class="icon-strip">
     <img src="images/AI.png" alt="AI Icon" />
     <img src="images/Hardware.png" alt="Hardware Icon" />
     <img src="images/Security.png" alt="Security Icon" />
   </section>
   ```
5. Update the `src` attribute to point to your new image
6. Update the `alt` attribute with appropriate descriptive text

### Adding Additional Icons

If you need to add a fourth icon to the strip:

1. Prepare the icon image
2. Add it to the icon strip section in each HTML file:
   ```html
   <section class="icon-strip">
     <img src="images/AI.png" alt="AI Icon" />
     <img src="images/Hardware.png" alt="Hardware Icon" />
     <img src="images/Security.png" alt="Security Icon" />
     <img src="images/NewIcon.png" alt="New Icon" />
   </section>
   ```
3. You may need to adjust the styling to accommodate the additional icon by editing the gap in `CSS/style.css`:
   ```css
   .icon-strip {
     gap: 1.5rem !important; /* Adjust this value */
   }
   ```

## Managing the Meeting Request Form

The website's meeting request form on the homepage uses Formspree.io to handle form submissions. This allows submissions to be sent directly to designated email addresses without requiring server-side code.

### How the Form Works

1. When visitors fill out and submit the form, data is sent to Formspree.io
2. Formspree processes the data and emails it to the designated recipient (w10120702@usm.edu)
3. The visitor is redirected to a thank-you page (thanks.html)

### Changing the Form Recipient Email

To change where form submissions are sent:

1. Login to the Formspree account (credentials available from Dr. Sherif or the website maintainer)
2. Visit your dashboard at: https://formspree.io/forms/
3. Click on the form named "SPEN Lab Meeting Request Form"
4. Go to the "Integration" tab
5. Under "Email Notifications", update the forwarding email address
6. Click "Save"

No changes to the website code are needed when updating the recipient email.

### Modifying Form Fields

If you need to add, remove, or modify form fields:

1. Open `index.html` in a text editor
2. Find the meeting form section (around line 170):
   ```html
   <section class="meeting-scheduler">
     <h2>Schedule a Meeting</h2>
     <p>Please fill out this form to schedule a meeting with our team. We'll get back to you with confirmation shortly.</p>
     <div class="form-container">
       <form id="meeting-form" action="https://formspree.io/f/mldjewvq" method="POST">
         <!-- Form fields here -->
       </form>
     </div>
   </section>
   ```
3. Edit the form fields as needed. Each field follows this structure:
   ```html
   <div class="form-group">
     <label for="fieldId">Field Label</label>
     <input type="text" id="fieldId" name="fieldName" required>
   </div>
   ```
4. Ensure the `name` attribute is included on any new form fields (this controls how the field appears in the email)
5. Add the `required` attribute if the field is mandatory

### Customizing the Thank You Page

To modify the thank you page that appears after form submission:

1. Open `thanks.html` in a text editor
2. Modify the content within the `<div class="form-submission-message">` section
3. Save the file

### Form Submission Troubleshooting

If the form isn't working correctly:

1. **Form Submissions Not Being Received**
   - Verify the Formspree account is active and not at its submission limit
   - Check if submissions are being marked as spam in the recipient's email
   - Look in the Formspree dashboard to see if submissions are being recorded

2. **Error Messages When Submitting**
   - Check the form action URL in `index.html` (should be `https://formspree.io/f/mldjewvq`)
   - Verify all required form fields have the `required` attribute
   - Ensure the form has `method="POST"` attribute

3. **Customizing Email Format**
   - To customize how emails are formatted, use the Formspree dashboard's "Email Notifications" settings
   - Advanced customization may require a Formspree paid plan

## Common Troubleshooting

### Images Not Displaying

If images aren't displaying properly:

1. Check the file path in the `src` attribute
2. Verify the image exists in the specified location
3. Confirm the file name case matches exactly (e.g., "Logo.png" is not the same as "logo.png")
4. Check that the image file isn't corrupted by opening it directly

### Layout Breaking on Mobile

If the layout looks wrong on mobile devices:

1. Use browser developer tools to test at different screen sizes
2. Check that responsive CSS is properly applied
3. Ensure you haven't removed any important CSS classes from elements
4. Verify that you haven't added exceptionally large content that overflows containers

### Cards Not Animating

If the interactive cards aren't animating:

1. Make sure the HTML elements have both required classes:
   - For research cards: `interests-card`
   - For course cards: `course-card interests-card`
2. Check that you've added `tabindex="0"` to make the cards focusable
3. Verify that you haven't removed the JavaScript that initializes the animations

### Changes Not Appearing After Upload

If your changes don't appear after uploading:

1. Try clearing your browser cache (Ctrl+F5 or Cmd+Shift+R)
2. Check that you uploaded the changes to the correct location on the server
3. Verify that file permissions allow the web server to read the files

## Additional Resources

- [HTML Essential Training](https://www.linkedin.com/learning/html-essential-training-4) on LinkedIn Learning
- [Mozilla Developer Network (MDN) HTML Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [CSS Basics on MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [TinyPNG Image Compression](https://tinypng.com/)
- [Squoosh Image Optimizer](https://squoosh.app/)

## Contact for Technical Support

If you encounter issues that aren't covered in this guide, please contact:

- **Technical Maintainer**: Zohaib Chaudhary
- **Lab Director**: Dr. Ahmed B. T. Sherif at [Ahmed.Sherif@usm.edu](mailto:Ahmed.Sherif@usm.edu) 
