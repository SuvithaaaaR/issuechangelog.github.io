# Advanced Work Item Log Documentation

This project provides comprehensive documentation for the Advanced Work Item Log application for Jira Cloud.

## Files Structure

- **index.html** - Main HTML structure
- **styles.css** - Complete styling with responsive design
- **script.js** - JavaScript functionality for dynamic content loading and interactions
- **data.js** - Data configuration file containing all page content and navigation structure

## Features

✅ **Responsive Design**

- Desktop layout with sidebar and table of contents
- Mobile-friendly with collapsible sidebar
- Smooth transitions and animations

✅ **Dynamic Content**

- All content loaded from `data.js`
- Easy to update and maintain
- Modular section structure

✅ **Interactive Navigation**

- Expandable/collapsible sidebar sections
- Active state tracking
- Breadcrumb navigation
- Table of contents with scroll spy

✅ **Search Functionality**

- Quick search across all documentation
- Keyboard shortcut support (press '/')
- Real-time results filtering

✅ **Modern UI**

- Clean, professional design
- Info boxes and callouts
- Smooth scrolling
- Hover effects and transitions

## How to Use

1. **Open the page**: Simply open `index.html` in a web browser
2. **Customize content**: Edit `data.js` to change navigation items, page content, and text
3. **Style adjustments**: Modify `styles.css` for design changes
4. **Functionality**: Update `script.js` for behavior modifications

## Documentation Sections

- **Advanced Work Item Log** - Main landing page
- **Get Started** - Overview and introduction
- **Features and Capabilities** - Detailed feature documentation
- **Installation Guide** - Step-by-step installation instructions
- **Troubleshooting** - Common issues and solutions
- **User Guide** - Configuration and usage instructions
- **Support** - Contact information and support resources
- **Security and Privacy** - Security policies and data handling

## Customizing Content

### Navigation Structure

Edit the `navigationData` object in `data.js`:

```javascript
const navigationData = {
  sections: [
    {
      id: "section-id",
      title: "Section Title",
      expanded: true,
      items: [{ id: "item-id", title: "Item Title", active: false }],
    },
  ],
};
```

### Page Content

Edit the `sectionContents` object in `data.js`:

```javascript
const sectionContents = {
  "section-id": {
    breadcrumbs: [...],
    title: 'Page Title',
    description: 'Page description',
    sections: [
      { type: 'info-box', title: '...', content: '...' },
      { type: 'text', content: '...' },
      { type: 'image', src: '...', alt: '...' }
    ],
    tableOfContents: [...],
    navigation: { previous: {...}, next: {...} }
  }
};
```

### Header Navigation

Edit the `headerNav` array in `data.js`:

```javascript
const headerNav = [{ title: "Link Title", link: "#" }];
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Responsive Breakpoints

- Desktop: > 1200px (full layout with sidebar and TOC)
- Tablet: 768px - 1200px (sidebar + content, no TOC)
- Mobile: < 768px (content only, toggleable sidebar)

## Color Scheme

The page uses CSS custom properties for easy theme customization:

- Primary: `#0052CC`
- Text Dark: `#172B4D`
- Background: `#FFFFFF`
- Light Background: `#F4F5F7`
- Info Blue: `#DEEBFF`

## Version

Current Version: 2.5.0

## License

Documentation for Advanced Work Item Log application.
