# Portfolio Website - Modular Structure

## Overview
A clean, modular personal portfolio website with separated concerns for easy maintenance and updates.

## File Structure
```
public_html/
├── index.html                    # Main homepage (minimal markup only)
├── bachelors_research.html       # Bachelors research page
├── pushpak_sir_memoriam.html     # Memorial page
├── publications.json             # Publication data (easily editable)
│
├── styles/
│   └── main.css                  # All styling (centralized)
│
├── scripts/
│   └── main.js                   # All JavaScript logic
│
└── images/                       # All media assets
    ├── Kaustubh_Photo.jpg
    ├── Risingsun.jpg
    ├── iitb_logo.png
    └── ... (other images)
```

## Quick Updates Guide

### Adding a New Publication
Edit `publications.json` and add a new entry to the array:
```json
{
  "id": "unique-id-2026",
  "title": "Your Paper Title",
  "authors": ["Author 1", "Author 2"],
  "venue": "Conference/Journal Name",
  "year": 2026,
  "type": "conference",
  "paperLink": "https://link-to-paper",
  "githubLink": "https://link-to-code",
  "abstract": "Abstract text here",
  "showAbstract": true
}
```

### Updating Styles
All CSS is in `styles/main.css`. Make changes there and they'll automatically apply site-wide.

### Updating Content
- Main page content: Edit the HTML sections in `index.html`
- TA courses: Update the table in the "TA Journey" section
- Contact info: Update the "Contact Information" section

### Adding JavaScript Logic
All JavaScript is in `scripts/main.js`. The main functions:
- `loadPublications()` - Loads publications.json
- `renderPublications()` - Renders the publication list
- `handleAbstractToggle()` - Handles abstract toggle click

## Key Features

✅ **Modular Design** - Separate CSS, JS, and data files for easy maintenance  
✅ **Data-Driven** - Publications loaded from JSON (no hardcoding)  
✅ **Responsive** - Mobile-friendly with media queries  
✅ **Clean Code** - Minimal HTML, semantic markup  
✅ **Easy Updates** - Change data without touching code

## Technologies Used
- HTML5
- CSS3 (Flexbox, Media Queries)
- Vanilla JavaScript (ES6+)
- JSON for data storage

## Notes
- All images are in the `images/` folder
- Sanskrit font loaded from Google Fonts
- No external libraries or frameworks required
- All styling uses CSS variables for easy theme changes (if needed)
