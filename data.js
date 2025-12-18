// Canonical single-file manifest: navigation + inlined, expanded documentation
const navigationData = {
  sections: [
    {
      id: "issue-changelog",
      title: "Issue Changelog",
      expanded: true,
      items: [],
    },
    {
      id: "app-overview",
      title: "Get Started",
      expanded: true,
      items: [],
    },
    {
      id: "features",
      title: "Features and Capabilities",
      expanded: false,
      items: [],
    },
    {
      id: "installation",
      title: "Installation Guide",
      expanded: false,
      items: [],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      expanded: false,
      items: [
        { id: "troubleshooting", title: "Overview", active: false },
        {
          id: "troubleshooting-document-creation",
          title: "App Not Appearing in Issue Panel",
          active: false,
        },
        {
          id: "troubleshooting-saving-version",
          title: "Change Log Not Loading or Empty",
          active: false,
        },
        {
          id: "troubleshooting-page-group",
          title: "Performance Issues or Slow Loading",
          active: false,
        },
        {
          id: "troubleshooting-content-display",
          title: "Changes Not Appearing or Missing History",
          active: false,
        },
        {
          id: "troubleshooting-license-data",
          title: "Installation or Update Issues",
          active: false,
        },
      ],
    },
    {
      id: "configuration",
      title: "User Guide",
      expanded: false,
      items: [],
    },
    {
      id: "support",
      title: "Support and Contact Information",
      expanded: false,
      items: [],
    },
    {
      id: "security",
      title: "Security and Privacy",
      expanded: false,
      items: [],
    },
    { id: "privacy", title: "Privacy Policy", expanded: false, items: [] },
  ],
};

// Header navigation links (array expected by script.js)
const headerNav = [
  { title: "Home", link: "#" },
  { title: "Issue Change Log", link: "#" },
];

// Page metadata and version info
const pageContent = {
  title: "Issue Change Log Documentation",
  subtitle: "Comprehensive guides and reference for the Issue Change Log app",
};
const headerInfo = {
  title: "Issue Change Log",
  versions: ["1.2.15"],
  defaultVersion: "1.2.15",
};

// Expanded, documentation-style inlined content for each section
const sectionContents = {
  "issue-changelog": {
    layout: "hero",
    hero: {
      title: "Issue Changelog",
      subtitle:
        "Send complete issue history to your team with one click — fields, comments, attachments, and transitions, all from Jira Cloud.",
      ctas: [
        { label: "Get Started", target: "app-overview" },
        { label: "Installation", target: "installation" },
        { label: "Features", target: "features" },
        { label: "Support", target: "support" },
      ],
      image: {
        src: "home img.png",
        alt: "Issue Change Log panel screenshot",
        callouts: [
           {
            number: 1,
            top: "12.5%",
            left: "92%",
            tooltip:
              "Export your changelog data to CSV format for external analysis and reporting",
          },
          {
            number: 2,
            top: "25%",
            left: "-1.0rem",
            tooltip:
              "Filter changelog entries by field, content, author, and status to find specific changes",
          },
          {
            number: 3,
            top: "91%",
            left: "24%",
            tooltip:
              "Control the number of items displayed per page for better navigation",
          },
        ],
      },
      code: {
        language: "js",
        snippet: `import api from '@forge/api';

const issueKey = 'PROJ-123';

const res = await api.asApp().requestJira(
  \`/rest/api/3/issue/\${issueKey}?expand=changelog\`
);
const data = await res.json();
const histories = data.changelog?.histories || [];

histories.forEach(h => {
  console.log(h.author.displayName, h.created);
});

console.log('Ahoy, changelog!', histories.length);
`,
      },
    },
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Issue Changelog", link: "#" },
    ],
    title: "Issue Changelog",
    description:
      "Understand at a glance what the Issue Change Log app provides: full, filterable change history for Jira issues with secure access and export.",
    sections: [
      { type: "heading", level: 2, content: "Overview" },
      {
        type: "text",
        content:
          "Issue Change Log surfaces a **chronological, detailed history** of all activity within Jira issues — including **field updates**, **comment edits**, **attachments**, and **status transitions** — while fully respecting **Jira permissions** and **visibility rules**.",
      },
      {
        type: "text",
        content:
          "This app is designed to help teams **analyze issue activity**, **audit changes**, and share **transparent progress reports** with minimal effort.",
      },
      { type: "heading", level: 2, content: "What You Can See" },
      {
        type: "list",
        className: "checkmark-list",
        items: [
          "**Field modifications** (system and custom) with **before/after values**",
          "**Comment additions and edits** with authors and timestamps",
          "**Attachment add/remove events** with filename, size, and MIME type",
          "**Status transitions** with actor and time",
          "**Time-based filters** and **CSV export** for analysis",
        ],
      },
    ],
    tableOfContents: [
      { title: "Overview", anchor: "#overview" },
      { title: "What You Can See", anchor: "#what-you-can-see" },
    ],
    navigation: {
      previous: null,
      next: { title: "Get Started", target: "app-overview" },
    },
  },

  "troubleshooting-document-creation": {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Troubleshooting", link: "#" },
      { title: "App Not Appearing in Issue Panel", link: "#" },
    ],
    title: "App Not Appearing in Issue Panel",
    description:
      "The Issue Change Log panel doesn't show up when viewing Jira issues.",
    sections: [
      { type: "heading", level: 2, content: "Common Causes" },
      {
        type: "list",
        items: [
          "Project not authorized by site administrator",
          "App disabled at project level by project admin",
          "User lacks Jira permissions to view issues",
          "App installation incomplete or corrupted",
        ],
      },
      { type: "heading", level: 2, content: "Step-by-Step Diagnosis" },
      {
        type: "text",
        content: "<strong>Step 1: Verify Site-Level Authorization</strong>",
      },
      {
        type: "text",
        content:
          "Site administrators must authorize projects before the app can be used. Go to <strong>Jira Settings → Apps → Manage apps → Issue ChangeLog Settings</strong> and confirm your project is in the authorized list.",
      },
      {
        type: "image",
        src: "jira-admin-3.png",
        alt: "Site admin authorization screen",
      },
      {
        type: "text",
        content: "<strong>Step 2: Check Project-Level Enablement</strong>",
      },
      {
        type: "text",
        content:
          "Project administrators must enable the app in <strong>Project Settings → Apps → Issue ChangeLog</strong>. Verify the toggle is set to 'Enabled'.",
      },
      {
        type: "image",
        src: "Project-settings-1.png",
        alt: "Project settings - app enabled",
      },
      {
        type: "text",
        content: "<strong>Step 3: Verify User Permissions</strong>",
      },
      {
        type: "text",
        content:
          "Ensure your Jira account has permission to browse the project and view issues. Contact your Jira administrator if you see permission denied errors.",
      },
      { type: "heading", level: 2, content: "Quick Fixes" },
      {
        type: "list",
        items: [
          "Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)",
          "Clear browser cache and cookies for your Jira instance",
          "Try opening the issue in a different browser or incognito mode",
          "Log out and log back in to refresh your session",
        ],
      },
      {
        type: "text",
        content:
          "If the panel still doesn't appear after verifying all authorization and permissions, check the browser console (F12) for JavaScript errors and contact support with the error details.",
      },
    ],
    tableOfContents: [
      { title: "Common Causes", anchor: "#common-causes" },
      { title: "Step-by-Step Diagnosis", anchor: "#diagnosis" },
      { title: "Quick Fixes", anchor: "#quick-fixes" },
    ],
    navigation: {
      previous: { title: "Troubleshooting", target: "troubleshooting" },
      next: null,
    },
  },

  "troubleshooting-saving-version": {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Troubleshooting", link: "#" },
      { title: "Change Log Not Loading or Empty", link: "#" },
    ],
    title: "Change Log Not Loading or Empty",
    description:
      "The Issue Change Log panel appears but shows no data or fails to load history.",
    sections: [
      { type: "heading", level: 2, content: "Common Causes" },
      {
        type: "list",
        items: [
          "Issue has no change history yet (newly created)",
          "Network connectivity issues or Jira API timeouts",
          "Jira permissions preventing access to issue history",
          "App storage errors or corrupted cached data",
        ],
      },
      {
        type: "image",
        src: "issue-panel-2.png",
        alt: "Empty change log state",
      },
      { type: "heading", level: 2, content: "Diagnosis Steps" },
      {
        type: "text",
        content: "<strong>Check Issue Age</strong>",
      },
      {
        type: "text",
        content:
          "Newly created issues have no history. Make a change to the issue (update status, assignee, or add a comment) and refresh to verify the app is working.",
      },
      {
        type: "text",
        content: "<strong>Verify API Access</strong>",
      },
      {
        type: "text",
        content:
          "Open browser DevTools (F12) → Network tab and look for failed API requests to <code>/rest/api/3/issue/{issueKey}/changelog</code>. If you see 403 errors, you lack permission to view issue history.",
      },
      {
        type: "text",
        content: "<strong>Check Filters</strong>",
      },
      {
        type: "text",
        content:
          "If the panel loads but appears empty, verify that time filters or field filters aren't excluding all changes. Reset filters to 'All time' and 'All fields' to see full history.",
      },
      {
        type: "image",
        src: "feature-2.png",
        alt: "Filter controls in change log panel",
      },
      { type: "heading", level: 2, content: "Quick Fixes" },
      {
        type: "list",
        items: [
          "Refresh the issue page (F5) to reload change history",
          "Clear browser cache and reload (Ctrl+F5)",
          "Check network connectivity and VPN if using remote access",
          "Try viewing a different issue to isolate the problem",
          "Contact your Jira admin to verify you have 'View Issue' permission",
        ],
      },
      {
        type: "text",
        content:
          "If the change log consistently fails to load across multiple issues, capture the Network tab errors from DevTools and contact support with the issue key and error details.",
      },
    ],
    tableOfContents: [
      { title: "Common Causes", anchor: "#causes" },
      { title: "Diagnosis Steps", anchor: "#diagnosis" },
      { title: "Quick Fixes", anchor: "#fixes" },
    ],
    navigation: {
      previous: { title: "Troubleshooting", target: "troubleshooting" },
      next: null,
    },
  },

  "troubleshooting-page-group": {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Troubleshooting", link: "#" },
      { title: "Performance Issues or Slow Loading", link: "#" },
    ],
    title: "Performance Issues or Slow Loading",
    description:
      "Change log loads slowly or causes browser performance issues in large projects.",
    sections: [
      { type: "heading", level: 2, content: "Common Scenarios" },
      {
        type: "list",
        items: [
          "Issues with hundreds or thousands of changes take long to load",
          "Browser becomes unresponsive when scrolling through history",
          "Pagination controls don't respond quickly",
          "High memory usage in browser when panel is open",
        ],
      },
      {
        type: "image",
        src: "feature-3.png",
        alt: "Pagination controls",
      },
      { type: "heading", level: 2, content: "Optimization Steps" },
      {
        type: "text",
        content: "<strong>Use Time Filters</strong>",
      },
      {
        type: "text",
        content:
          "Instead of loading 'All time', filter to recent periods (Last 7 days, Last 30 days). This dramatically reduces the data loaded and improves performance.",
      },
      {
        type: "text",
        content: "<strong>Adjust Pagination</strong>",
      },
      {
        type: "text",
        content:
          "The app loads 20 changes per page by default. For very active issues, this provides good balance. Use Next/Previous buttons to navigate instead of loading all history at once.",
      },
      {
        type: "text",
        content: "<strong>Filter by Field</strong>",
      },
      {
        type: "text",
        content:
          "If you only need to track specific fields (e.g., Status, Assignee), use field filters to reduce data volume and improve rendering speed.",
      },
      {
        type: "image",
        src: "feature-4.png",
        alt: "Field filter options",
      },
      { type: "heading", level: 2, content: "Browser Optimizations" },
      {
        type: "list",
        items: [
          "Close unnecessary browser tabs to free up memory",
          "Disable browser extensions that inject scripts into Jira pages",
          "Use a modern browser (Chrome, Firefox, Edge) with latest updates",
          "Clear browser cache regularly if working with very large issues",
        ],
      },
      {
        type: "text",
        content:
          "For issues with extreme change volumes (>10,000 changes), consider exporting to CSV instead of viewing in-panel for better performance.",
      },
    ],
    tableOfContents: [
      { title: "Common Scenarios", anchor: "#scenarios" },
      { title: "Optimization Steps", anchor: "#optimization" },
      { title: "Browser Optimizations", anchor: "#browser" },
    ],
    navigation: {
      previous: { title: "Troubleshooting", target: "troubleshooting" },
      next: null,
    },
  },

  "troubleshooting-content-display": {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Troubleshooting", link: "#" },
      { title: "Changes Not Appearing or Missing History", link: "#" },
    ],
    title: "Changes Not Appearing or Missing History",
    description:
      "Some issue changes are missing from the change log or history appears incomplete.",
    sections: [
      { type: "heading", level: 2, content: "Why Changes Might Be Missing" },
      {
        type: "list",
        items: [
          "Changes were made before the app was installed on the project",
          "Jira audit log retention policies deleted old history",
          "User lacks permission to view certain fields (e.g., security level changes)",
          "Issue was imported from another system with incomplete history",
          "Changes were made via automation/webhooks that don't log to changelog",
        ],
      },
      { type: "heading", level: 2, content: "Verification Steps" },
      {
        type: "text",
        content: "<strong>Check Jira's Native History</strong>",
      },
      {
        type: "text",
        content:
          "Go to the issue's 'History' tab in Jira. If changes don't appear there, they're not in Jira's changelog API (the app can't show what Jira doesn't record).",
      },
      {
        type: "text",
        content: "<strong>Verify Permissions</strong>",
      },
      {
        type: "text",
        content:
          "Some fields are permission-restricted (e.g., security level, private comments). If you lack permission to view a field, changes to that field won't appear in your change log view.",
      },
      {
        type: "text",
        content: "<strong>Check Time Filters</strong>",
      },
      {
        type: "text",
        content:
          "Ensure you're viewing 'All time' and not a filtered date range that excludes the expected changes.",
      },
      {
        type: "image",
        src: "issue-panel-1.png",
        alt: "Change log panel showing history",
      },
      { type: "heading", level: 2, content: "What You Can Do" },
      {
        type: "list",
        items: [
          "Reset all filters to 'All time' and 'All fields' to see maximum history",
          "Ask your Jira admin to verify you have permission to view all relevant fields",
          "Check Jira's Audit Log (if you're admin) for system-level changes",
          "For imported issues, understand that pre-import history may not exist in Jira",
        ],
      },
      {
        type: "text",
        content:
          "Remember: The Issue Change Log app displays data from Jira's native changelog API. If Jira doesn't record a change (due to automation rules, API calls without changelog flag, or permissions), the app cannot show it.",
      },
    ],
    tableOfContents: [
      { title: "Why Changes Might Be Missing", anchor: "#why" },
      { title: "Verification Steps", anchor: "#verification" },
      { title: "What You Can Do", anchor: "#actions" },
    ],
    navigation: {
      previous: { title: "Troubleshooting", target: "troubleshooting" },
      next: null,
    },
  },

  "troubleshooting-license-data": {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Troubleshooting", link: "#" },
      { title: "Installation or Update Issues", link: "#" },
    ],
    title: "Installation or Update Issues",
    description:
      "Problems installing the app, updating to a new version, or app appearing broken after updates.",
    sections: [
      { type: "heading", level: 2, content: "Installation Problems" },
      {
        type: "list",
        items: [
          "App doesn't appear in 'Manage apps' after installation from Marketplace",
          "'Installation failed' error when trying to install",
          "App installs but doesn't show in any projects",
          "License validation fails even though purchase completed",
        ],
      },
      {
        type: "image",
        src: "jira-admin-2.png",
        alt: "Manage apps screen",
      },
      { type: "heading", level: 2, content: "Installation Troubleshooting" },
      {
        type: "text",
        content: "<strong>Verify Site Admin Rights</strong>",
      },
      {
        type: "text",
        content:
          "Only Jira site administrators can install Marketplace apps. Confirm you're in the 'site-admins' or 'jira-administrators' group.",
      },
      {
        type: "text",
        content: "<strong>Check Atlassian Account Link</strong>",
      },
      {
        type: "text",
        content:
          "Your Jira instance must be properly linked to your Atlassian account. Go to <strong>Jira Settings → Atlassian Marketplace → Manage account</strong> to verify.",
      },
      {
        type: "text",
        content: "<strong>License Activation</strong>",
      },
      {
        type: "text",
        content:
          "After purchase, the license may take a few minutes to activate. Wait 5-10 minutes and refresh the Manage apps page.",
      },
      { type: "heading", level: 2, content: "Update Problems" },
      {
        type: "list",
        items: [
          "App stops working after Jira system update",
          "New app version shows errors or missing features",
          "Update notification appears but update fails",
        ],
      },
      {
        type: "image",
        src: "jira-admin-5.jpg",
        alt: "App version and update screen",
      },
      { type: "heading", level: 2, content: "Update Troubleshooting" },
      {
        type: "text",
        content: "<strong>Manual Update</strong>",
      },
      {
        type: "text",
        content:
          "Go to <strong>Jira Settings → Apps → Manage apps</strong>, find Issue ChangeLog, and click 'Update' if available. If update fails, try uninstalling and reinstalling (your configuration is preserved).",
      },
      {
        type: "text",
        content: "<strong>Clear App Cache</strong>",
      },
      {
        type: "text",
        content:
          "After updates, clear browser cache (Ctrl+F5) and refresh Jira. Some UI updates require cache clearing to display properly.",
      },
      { type: "heading", level: 2, content: "When to Contact Support" },
      {
        type: "list",
        items: [
          "Installation fails repeatedly with error codes",
          "License shows as invalid despite successful purchase",
          "App breaks after Jira platform update (provide Jira version)",
          "Update fails with 'compatibility issue' message",
        ],
      },
      {
        type: "text",
        content:
          "When contacting support, include: Jira version, app version (if installed), error messages (screenshot or text), and your Jira instance URL (cloud vs. data center).",
      },
    ],
    tableOfContents: [
      { title: "Installation Problems", anchor: "#installation" },
      { title: "Installation Troubleshooting", anchor: "#install-fix" },
      { title: "Update Problems", anchor: "#update" },
      { title: "Update Troubleshooting", anchor: "#update-fix" },
      { title: "When to Contact Support", anchor: "#support" },
    ],
    navigation: {
      previous: { title: "Troubleshooting", target: "troubleshooting" },
      next: null,
    },
  },
  "app-overview": {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Get Started", link: "#" },
    ],
    title: "Get Started",
    description:
      "Start here to understand what Issue Change Log is, its benefits, who it's for, and how to install and use it in Jira Cloud.",
    sections: [
      {
        type: "objectives-banner",
        pageTitle: "Get Started",
        subtitle:
          "Start here to understand what Issue Change Log is, its benefits, who it's for, and how to install and use it in Jira Cloud.",
        title: "By the end of this guide, you'll be able to:",
        items: [
          "Understand what Issue Change Log is and its key benefits",
          "Identify who can benefit from using this application",
          "Install and configure the app from the Atlassian Marketplace",
          "Navigate the core features and capabilities",
          "Track and export issue change history effectively",
        ],
      },
      { type: "heading", level: 2, content: "Introduction" },
      {
        type: "text",
        content:
          "The Issue Change Log is an Atlassian Forge application designed for Jira that provides comprehensive tracking and visualization of all changes made to Jira issues. This application enables teams to maintain complete audit trails, monitor issue evolution, and enhance transparency in their project workflows.",
      },
      { type: "heading", level: 2, content: "What is Issue Change Log?" },
      {
        type: "text",
        content:
          "Issue Change Log is a native Jira application that displays detailed change history for issues, including:",
      },
      {
        type: "list",
        items: [
          "Field modifications and updates",
          "Comment additions and edits",
          "Attachments and file uploads",
          "Status transitions",
          "Custom field changes",
          "Time-based filtering of changes",
        ],
      },
      {
        type: "annotated-image",
        src: "home img.png",
        alt: "Issue Change Log interface showing changelog table with filters, author columns, field content, date information, and export options",
        annotations: [
          {
            number: "1",
            x: 7,
            y: -5,
            lineFrom: { x: 7, y: -8 },
            lineTo: { x: 30, y: 7.5 },
            tooltipTitle: "Refresh",
            tooltipDescription:
              "Reload the change log to see the latest updates from Jira.",
          },
          {
            number: "2",
            x: 94,
            y: -5,
            lineFrom: { x: 94, y: -5 },
            lineTo: { x: 94, y: 7.5 },
            tooltipTitle: "Export to CSV",
            tooltipDescription:
              "Download complete changelog data in CSV format for external analysis.",
          },
          {
            number: "3",
            x: 8,
            y: 40,
            lineFrom: { x: 8, y: 31 },
            lineTo: { x: 8, y: 40 },
            tooltipTitle: "Author Column",
            tooltipDescription:
              "Filter changes by the user who made them. Select one or more authors.",
          },
          {
            number: "4",
            x: 25,
            y: 40,
            lineFrom: { x: 25, y: 31 },
            lineTo: { x: 25, y: 40 },
            tooltipTitle: "Field column",
            tooltipDescription:
              "Filter by which field was changed (status, assignee, etc.) or activity type.",
          },
          {
            number: "5",
            x: 42,
            y: 40,
            lineFrom: { x: 42, y: 31 },
            lineTo: { x: 42, y: 40 },
            tooltipTitle: "From Column",
            tooltipDescription:
              "Search for changes by the previous/old value before the change was made.",
          },
          {
            number: "6",
            x: 65,
            y: 40,
            lineFrom: { x: 65, y: 31 },
            lineTo: { x: 65, y: 40 },
            tooltipTitle: "To Column",
            tooltipDescription:
              "Search for changes by the new/updated value after the change was made",
          },
          {
            number: "7",
            x: 89,
            y: 40,
            lineFrom: { x: 89, y: 31 },
            lineTo: { x: 89, y: 40 },
            tooltipTitle: "Date column",
            tooltipDescription:
              "Show changes from a specific time period. Filters all other results.",
          },
          {
            number: "8",
            x: 20,
            y: 104,
            lineFrom: { x: 20, y: 99 },
            lineTo: { x: 20, y: 105 },
            tooltipTitle: "Items Per Page Selector",
            tooltipDescription:
              "Choose how many changes to display on each page (default: 25)",
          },
          {
            number: "9",
            x: 89,
            y: 104,
            lineFrom: { x: 89, y: 97 },
            lineTo: { x: 50, y: 105 },
            tooltipTitle: "Pagination Controls",
            tooltipDescription:
              "Navigate to previous/next page or view current page number.",
          },
        ],
      },
      { type: "heading", level: 2, content: "Key Benefits" },
      {
        type: "benefit-card",
        icon: "visibility",
        title: "Complete Visibility",
        content:
          "Track **every change** made to Jira issues with **detailed timestamps**, **authors**, and **modification details**. Never miss a single update to your issues.",
      },
      {
        type: "benefit-card",
        icon: "security",
        title: "Enterprise-Grade Access Control",
        highlights: [
          "**Site-level authorization** managed by Jira administrators",
          "**Project-level enablement** controlled by project administrators",
          "**Granular permission system** ensures access only for authorized users",
        ],
      },
      {
        type: "benefit-card",
        icon: "report",
        title: "Enhanced Reporting",
        highlights: [
          "**Export change logs** to CSV format for external analysis",
          "**Flexible time filters**: 24h, 7d, 30d, 6m, 1y, or all time",
          "**Track multiple issues** simultaneously across projects",
        ],
      },
      {
        type: "benefit-card",
        icon: "integration",
        title: "Seamless Integration",
        highlights: [
          "**Native Jira integration** directly in issue panels",
          "**Admin settings page** for site-wide management",
          "**Project settings** for project-level control",
          "**Zero infrastructure** - works seamlessly with Jira Cloud",
        ],
      },
      {
        type: "benefit-card",
        icon: "performance",
        title: "Performance Optimized",
        highlights: [
          "**Efficient pagination** for smooth data browsing",
          "**Optimized API calls** to Jira REST API",
          "**Fast loading** even with large change histories",
        ],
      },
      { type: "heading", level: 2, content: "Target Audience & Use Cases" },
      {
        type: "text",
        content:
          "If you use the same scheme for multiple projects, any change to that scheme will impact all associated projects. It's important to consider the benefits and scenarios for each use case.",
      },
      {
        type: "text",
        content:
          "👇 **Click the tabs below to explore the target audience and use cases.**",
      },
      {
        type: "tabbed-section",
        tabs: [
          {
            id: "target-audience",
            label: "Target Audience",
            content: {
              intro:
                "Here are the primary **audiences** who benefit from Issue Change Log:",
              items: [
                {
                  title: "Development Teams",
                  description:
                    "Track code changes, bug fixes, and feature progress with detailed histories.",
                },
                {
                  title: "Project Managers",
                  description:
                    "Monitor milestones, identify workflow bottlenecks, and maintain accountability.",
                },
                {
                  title: "Quality Assurance Teams",
                  description:
                    "Review testing cycles, verify bug resolutions, and ensure quality standards.",
                },
                {
                  title: "Compliance and DevOps Teams",
                  description:
                    "Maintain audit trails, track deployments, and monitor release activities.",
                },
              ],
            },
          },
          {
            id: "use-cases",
            label: "Use Cases",
            content: {
              intro:
                "Here are some **key scenarios** where Issue Change Log adds value:",
              items: [
                {
                  title: "Audit and Compliance",
                  description:
                    "Keeps detailed change records for audits and compliance.",
                },
                {
                  title: "Root Cause Analysis",
                  description: "Shows when and why changes occurred.",
                },
                {
                  title: "Team Transparency",
                  description: "Reveals who made each change.",
                },
                {
                  title: "Quality Tracking",
                  description: "Tracks issue progress and workflow efficiency.",
                },
              ],
            },
          },
        ],
      },
      {
        type: "html",
        content: `
        <div class="info-note">
          <div class="info-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <rect x="11" y="10" width="2" height="7" rx="1" fill="#FFFFFF"></rect>
              <circle cx="12" cy="8" r="1" fill="#FFFFFF"></circle>
            </svg>
          </div>
          <div class="info-text">
            <p>
              <strong>Historical Analysis:</strong> Analyze patterns in issue modifications over time to improve processes and workflows.
            </p>
          </div>
        </div>
        `,
      },
      { type: "heading", level: 2, content: "How It Works" },
      {
        type: "list",
        items: [
          "Installation – Install the app from the Atlassian Marketplace to your Jira Cloud instance.",
          "Site Authorization – Jira administrators authorize projects that can use the app.",
          "Project Enablement – Project administrators enable or disable the app for their projects.",
          "Usage – Authorized users view detailed change logs directly in the issue panel.",
          "Export – Users can export change data to CSV for further analysis.",
        ],
      },
    ],
    tableOfContents: [
      { title: "Introduction", anchor: "#introduction" },
      {
        title: "What is Issue Change Log?",
        anchor: "#what-is-issue-change-log",
      },
      { title: "Key Benefits", anchor: "#key-benefits" },
      { title: "Target Audience", anchor: "#target-audience" },
      { title: "Use Cases", anchor: "#use-cases" },
      { title: "How It Works", anchor: "#how-it-works" },
    ],
    navigation: {
      previous: { title: "Issue Changelog", target: "issue-changelog" },
      next: { title: "Features and Capabilities", target: "features" },
    },
  },

  features: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Features", link: "#" },
    ],
    title: "Features and Capabilities",
    description:
      "This document outlines the core capabilities and technical strengths of the Issue Change Log application, providing detailed insights into its features, performance, and security architecture.",
    sections: [
      {
        type: "objectives-banner",
        pageTitle: "Features and Capabilities",
        subtitle:
          "This document outlines the core capabilities and technical strengths of the Issue Change Log application.",
        title: "Highlights",
        items: [
          "Enterprise-grade access control and centralized authorization",
          "Comprehensive change tracking for fields, comments and attachments",
          "CSV export and time-based filtering for reporting",
        ],
      },

      { type: "heading", level: 2, content: "Core Features" },

      {
        type: "heading",
        level: 2,
        content: "Two-Tier Access Control",
      },

      {
        type: "heading",
        level: 3,
        content: "Site Administrator Configuration",
      },

      {
        type: "image",
        src: "jira-admin-2.png",
        alt: "Site administration - authorize projects screenshot",
        caption:
          "Site admin authorization — authorize or bulk-manage projects for the Issue Change Log app from the Issue Change Log Settings page.",
        description:
          "This screenshot shows the site administration 'Issue Change Log Settings' page where a Jira administrator can search, select, and authorize projects for the app. The list displays project keys and names with checkboxes for bulk selection, alongside controls to add or remove projects and a summary of currently authorized projects, enabling centralized and auditable management of which projects may use the Issue Change Log.",
      },
      {
        type: "heading",
        level: 4,
        content: "Features and Navigation",
      },
      {
        type: "text",
        content:
          "Navigate to Jira Settings → Apps → Issue Change Log → Site Administrator Configuration.",
      },
      {
        type: "list",
        items: [
          "The panel displays all projects with their names and keys.",
          "Use the Smart Search bar to quickly find specific projects.",
          "Select projects individually or use Select All for bulk authorization.",
          "Review the real-time count of selected projects.",
          "Click Add Projects to authorize or Clear Selection to reset.",
          "Once authorized, project administrators can enable or disable the app from their Project Settings.",
        ],
      },
      {
        type: "html",
        content: `
        <div class="info-note">
          <div class="info-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <rect x="11" y="10" width="2" height="7" rx="1" fill="#FFFFFF"></rect>
              <circle cx="12" cy="8" r="1" fill="#FFFFFF"></circle>
            </svg>
          </div>
          <div class="info-text">
            <p>
              Note: Only Jira site administrators can access and configure this panel. Without site-level authorization, the Issue Change Log app will not appear in the project’s Issue panel.
            </p>
          </div>
        </div>
        `,
      },
      {
        type: "image",
        src: "jira-admin-4.jpg",
        alt: "Authorized Projects Management - project list and controls",
      },

      {
        type: "html",
        content: `<div style="margin-top: 5cm;"></div>`,
      },

      /* {
        type: "text",
        content:
          "The **Authorized Projects Management** section allows Jira administrators to view and control which projects have access to the **Issue Change Log** app. It lists each project’s name, key, ID, and authorization date, with options to remove access individually or in bulk using the **Remove Selected** action. This centralized control ensures clear visibility, efficient permission management, and easy updates as organizational needs evolve.",
      },*/ {
        type: "html",
        content: `
        <div class="content-with-image">
          <div class="image-with-expand">
            <img src="jira-admin-3.png" alt="Add Project Access — search and select projects" onerror="this.outerHTML='<div style=\'padding:80px;text-align:center;background:#f4f5f7;color:#6b778c;\'>Image placeholder</div>'" />
            <button class="expand-icon" onclick="openImageModal('jira-admin-3.png', 'Add Project Access — search and select projects')" aria-label="Expand image">⤢</button>
          </div>
          <div class="content-text">
            <h3 class="content-heading">Authorized Projects Management</h3>
            <p>The <strong>Authorized Projects Management</strong> section allows Jira administrators to view and control which projects have access to the <strong>Issue Change Log</strong> app. It lists each project's name, key, ID, and authorization date, with options to remove access individually or in bulk using the <strong>Remove Selected</strong> action. This centralized control ensures clear visibility, efficient permission management, and easy updates as organizational needs evolve.</p>
          </div>
        </div>
        `,
      },
      {
        type: "html",
        content: `<div style="margin-top: 2cm;"></div>`,
      },
      {
        type: "html",
        content: `
        <div class="content-with-image reverse">
          <div class="content-text">
            <h4 class="content-heading" style="font-weight: bold;">Project Authorization Success</h4>
            <p>When projects are successfully added to the authorization list, users will see a green confirmation message indicating how many projects were added. This immediate feedback confirms that the selected projects now have access to the Issue Change Log app and can begin using its features once enabled at the project level.</p>
          </div>
          <div class="image-with-expand">
            <img src="jira-admin-5.jpg" alt="Issue Change Log Settings - Successfully added projects confirmation" style="border: 1px solid #0052CC; border-radius: 8px;" onerror="this.outerHTML='<div style=\'padding:80px;text-align:center;background:#f4f5f7;color:#6b778c;\'>Image placeholder</div>'" />
            <button class="expand-icon" onclick="openImageModal('jira-admin-5.jpg', 'Issue Change Log Settings - Successfully added projects confirmation')" aria-label="Expand image">⤢</button>
          </div>
        </div>
        `,
      },
      {
        type: "annotated-image",
        src: "jira-admin-1.png",
        alt: "Site administration - permissions screenshot showing authorized projects management",
        annotations: [
          {
            number: "1",
            x: 20,
            y: 12,
            lineFrom: { x: 20, y: 12 },
            lineTo: { x: 30, y: 24 },
            tooltipTitle: "Project Name",
            tooltipDescription:
              "The name of the project that has been authorized to use the Issue Change Log app.",
          },
          {
            number: "2",
            x: 37,
            y: 12,
            lineFrom: { x: 37, y: 12 },
            lineTo: { x: 42, y: 24 },
            tooltipTitle: "Project ID",
            tooltipDescription:
              "The internal project ID number assigned by Jira.",
          },
          {
            number: "3",
            x: 48,
            y: 12,
            lineFrom: { x: 48, y: 12 },
            lineTo: { x: 58, y: 24 },
            tooltipTitle: "Authorization Date",
            tooltipDescription:
              "The date when the project was authorized to access the app.",
          },

          {
            number: "4",
            x: 90,
            y: 31,
            lineFrom: { x: 90, y: 31 },
            lineTo: { x: 69, y: 31 },
            tooltipTitle: "Remove Access",
            tooltipDescription:
              "Individual remove button to revoke access for this specific project.",
          },
          {
            number: "5",
            x: 24,
            y: 69,
            lineFrom: { x: 25, y: 69 },
            lineTo: { x: 35, y: 69 },
            tooltipTitle: "Select All Checkbox",
            tooltipDescription:
              "Check this box to select all projects for bulk operations.",
          },
          {
            number: "6",
            x: 90,
            y: 46,
            lineFrom: { x: 90, y: 45 },
            lineTo: { x: 95, y: 60 },
            tooltipTitle: "Remove Selected",
            tooltipDescription:
              "Bulk action button to remove access for all selected projects at once.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        content: "Project-Level Configuration",
      },
      {
        type: "text",
        content:
          "Once a project has been authorized at the site level, project administrators can manage the app's enablement for their specific project. The project settings provide a simple interface to enable or disable the Issue Change Log app, giving project-level control over the feature's availability.",
      },
      {
        type: "image",
        src: "Project-settings-1.png",
        alt: "Project settings screenshot (authorized view)",
        caption:
          "Authorized & enabled — project authorized by a site admin and enabled by project admin.",
      },
      {
        type: "heading",
        level: 4,
        content: "Unauthorized Project State",
      },
      {
        type: "text",
        content:
          "When a project has **not been authorized** by a **site administrator**, project administrators will see a clear warning message indicating that access must be requested. This ensures transparency about the authorization requirement and provides guidance on the next steps to enable the app.",
      },
      {
        type: "image",
        src: "project-settings-2.png",
        alt: "Project settings screenshot (not authorized view)",
        caption:
          "Not authorized — this project has not been authorized for the app; request access from a site administrator.",
      },
      { type: "heading", level: 4, content: "Issue Panel Access States" },
      {
        type: "text",
        content:
          "The Issue Panel displays the app's availability state for a given issue, providing clear visual feedback to users about the current access status. This two-state system ensures users understand exactly why they can or cannot access the Issue Change Log functionality.",
      },
      {
        type: "text",
        content:
          "The panel displays different states based on authorization and enablement settings. Below are the three possible access states users will encounter.",
      },
      {
        type: "heading",
        level: 4,
        content: "Authorized Project - App Disabled by Project Admin",
      },
      {
        type: "text",
        content:
          "When a project is **authorized by the site administrator** but the **project administrator has not enabled** the app, users see a message directing them to contact their project administrators to enable the feature.",
      },

      {
        type: "image",
        src: "issue-panel-1.png",
        alt: "Issue panel - app disabled view",
        caption:
          "Issue panel when app is disabled for the project; instructs users to contact project admins to enable the app.",
      },
      {
        type: "heading",
        level: 4,
        content: "Unauthorized Project - No Site-Level Permission",
      },
      {
        type: "text",
        content:
          "When a project has **not been authorized** by the site administrator, users see a message directing them to **contact site administrators** for project authorization before the app can be used.",
      },
      {
        type: "image",
        src: "issue-panel-2.png",
        alt: "Unauthorized project access showing message to contact site administrator",
        caption:
          "Issue panel displaying access denied message when project is not authorized by site administrator, with instructions to contact Jira administrator for access.",
        expandable: true,
        expandIcon: `
          <div class="expand-icon" onclick="expandImage(this)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>`,
      },

      {
        type: "heading",
        level: 4,
        content: "Enabled State - Main Interface",
      },
      {
        type: "text",
        content:
          "When the app is **properly authorized and enabled**, users see the complete Issue Change Log interface with a comprehensive table showing **WHO changed**, **WHAT changed**, and **WHEN changed**. The interface includes filterable columns for Author, Field/Content, From, To, and Date with dropdown filters for each column.",
      },
      {
        type: "image",
        src: "feature-1.png",
        alt: "Issue Change Log main interface with WHO/WHAT/WHEN columns",
        caption:
          "Main Issue Change Log interface showing changelog table with filtering options and change history data.",
      },
      {
        type: "heading",
        level: 4,
        content: "Export CSV Functionality",
      },
      {
        type: "text",
        content:
          "Users can **export changelog data** by clicking the Export CSV button. The system generates a downloadable CSV file containing all the change history data, which can be opened in Excel or other spreadsheet applications for further analysis.",
      },
      {
        type: "image",
        src: "feature-2.png",
        alt: "Export CSV feature showing download process and resulting spreadsheet",
        caption:
          "Export CSV feature with download notification and resulting spreadsheet view of changelog data.",
      },
      {
        type: "heading",
        level: 4,
        content: "Pagination Controls",
      },
      {
        type: "text",
        content:
          "For large change histories, the interface provides **pagination controls** at the bottom. Users can adjust the number of items per page (default 25) and navigate between pages using Previous/Next buttons and page numbers.",
      },
      {
        type: "image",
        src: "feature-3.png",
        alt: "Pagination controls showing items per page selector and navigation",
        caption:
          "Pagination controls allowing users to adjust display count and navigate through multiple pages of change history.",
      },
      {
        type: "heading",
        level: 4,
        content: "Advanced Filtering Options",
      },
      {
        type: "text",
        content:
          "The interface provides **comprehensive filtering capabilities** across all data columns. Users can filter by Author (selecting specific team members), Field/Content (choosing which types of changes to view), From/To values (searching for specific value changes), and Date ranges with preset options like 'Just now', '5 minutes ago', '2 hours ago', '3 days ago', '1 week ago', '1 month ago', or custom time periods.",
      },
      {
        type: "image",
        src: "feature-4.png",
        alt: "Filter section overview showing all available dropdown options and filters",
        caption:
          "Comprehensive filtering interface with dropdown options for Author, Field/Content, From, To, and Date filters including preset time ranges.",
      },
    ],
    tableOfContents: [
      { title: "Core Features", anchor: "#core-features" },
      { title: "Two-Tier Access Control", anchor: "#two-tier-access-control" },
      {
        title: "Site Administrator Configuration",
        anchor: "#site-administrator-configuration",
      },
      {
        title: "Project-Level Configuration",
        anchor: "#project-level-configuration",
      },
      {
        title: "Issue Panel Access States",
        anchor: "#issue-panel-access-states",
      },
      {
        title: "Authorized Project - App Disabled by Project Admin",
        anchor: "#authorized-project-app-disabled-by-project-admin",
      },
      {
        title: "Unauthorized Project - No Site-Level Permission",
        anchor: "#unauthorized-project-no-site-level-permission",
      },
      {
        title: "Enabled State - Main Interface",
        anchor: "#enabled-state-main-interface",
      },
      {
        title: "Export CSV Functionality",
        anchor: "#export-csv-functionality",
      },
      {
        title: "Pagination Controls",
        anchor: "#pagination-controls",
      },
      {
        title: "Advanced Filtering Options",
        anchor: "#advanced-filtering-options",
      },
    ],
    navigation: {
      previous: { title: "Get Started", target: "app-overview" },
      next: { title: "Installation Guide", target: "installation" },
    },
  },

  installation: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Installation", link: "#" },
    ],
    title: "Installation Guide",
    description:
      "This guide will walk you through the complete installation process for the Issue Change Log app.",
    sections: [
      { type: "heading", level: 2, content: "Prerequisites" },
      {
        type: "text",
        content: "Before installing the Issue Change Log app, ensure you have:",
      },
      { type: "heading", level: 3, content: "System Requirements" },
      {
        type: "html",
        content: `
          <ul class="tab-item-benefits">
            <li>✅ Active Jira Cloud instance</li>
            <li>✅ Jira administrator privileges (for installation and initial setup)</li>
          </ul>
        `,
      },
      { type: "heading", level: 3, content: "User Permissions" },
      {
        type: "list",
        items: [
          "<strong>For Installation:</strong> site administrator role or org admin role",
          "<strong>For Site Configuration:</strong> Member of the site-admins, jira-administrators, or the administrators group",
          "<strong>For Project Configuration:</strong> Project administrator role for specific projects",
        ],
      },
      { type: "heading", level: 3, content: "Browser Requirements" },
      {
        type: "list",
        items: ["Chrome 90+", "Firefox 88+", "Safari 14+", "Edge 90+"],
      },

      {
        type: "heading",
        level: 2,
        content:
          "Installation Method: Install from Atlassian Marketplace (Recommended)",
      },
      {
        type: "heading",
        level: 3,
        content: "Navigate to Atlassian Marketplace",
      },
      {
        type: "text",
        content:
          "Go to <a href='https://marketplace.atlassian.com' target='_blank'>Explore Marketplace solutions for Atlassian apps | Atlassian Marketplace</a>",
      },
      {
        type: "text",
        content: "Sign in with your Atlassian account",
      },
      { type: "heading", level: 3, content: "Search for the App" },
      {
        type: "text",
        content: 'Search for "Issue Change Log" in the marketplace',
      },
      {
        type: "text",
        content: "Click on the app to view details",
      },
      { type: "heading", level: 3, content: "Install the App" },
      {
        type: "text",
        content: 'Click the "Get it now" or "Try it free" button',
      },
      {
        type: "text",
        content: "Select your Jira Cloud site from the dropdown",
      },
      {
        type: "text",
        content: 'Click "Install app"',
      },
      { type: "heading", level: 3, content: "Grant Permissions" },
      {
        type: "text",
        content: "Review the requested permissions:",
      },
      {
        type: "list",
        items: [
          "<code>read:jira-work</code> - Read Jira issues and projects",
          "<code>read:jira-user</code> - Read user information",
          "<code>storage:app</code> - Store app configuration data",
        ],
      },
      {
        type: "text",
        content: 'Click "Grant access"',
      },
      { type: "heading", level: 3, content: "Confirm Installation" },
      {
        type: "text",
        content: "Wait for the installation to complete",
      },
      {
        type: "text",
        content: "You'll see a success message when the app is installed",
      },
    ],
    tableOfContents: [
      { title: "Prerequisites", anchor: "#prerequisites" },
      {
        title: "Installation Method",
        anchor:
          "#installation-method-install-from-atlassian-marketplace-recommended",
      },
    ],
    navigation: {
      previous: { title: "Features and Capabilities", target: "features" },
      next: { title: "Troubleshooting", target: "troubleshooting" },
    },
  },

  configuration: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "User Guide", link: "#" },
    ],
    title: "User Guide",
    description:
      "Site- and project-level configuration for Issue ChangeLog, plus performance tuning and troubleshooting guidance.",
    sections: [
      {
        type: "heading",
        level: 2,
        content: "Overview & Flow",
      },
      {
        type: "text",
        content:
          "Issue ChangeLog uses a two-tier access model: site-level authorization (Jira admins) and project-level enablement (project admins). Both must be true before users can view change logs in issue panels.",
      },
      {
        type: "image",
        src: "jira-admin-1.png",
        alt: "Jira admin - manage apps and authorize projects",
        caption:
          "Site admin console — authorize projects that can use Issue ChangeLog.",
      },
      {
        type: "image",
        src: "jira-admin-2.png",
        alt: "Issue ChangeLog settings - authorize projects screenshot",
        caption:
          "Manage projects from Issue ChangeLog Settings (search, select, bulk-add).",
      },
      {
        type: "html",
        content: `
          <div class="info-note">
            <div class="info-icon" aria-hidden="true">ℹ️</div>
            <div class="info-text"><p><strong>Important:</strong> Only Jira site administrators can authorize projects. If no projects are authorized, the app will not be available in any project (this is intentional for safety).</p></div>
          </div>
        `,
      },

      { type: "heading", level: 2, content: "Site-level: Authorize Projects" },
      {
        type: "text",
        content:
          "From Jira Settings → Apps → Manage apps → Issue ChangeLog Settings, search and select the projects to authorize. Use 'Select All' for bulk authorization when appropriate.",
      },
      {
        type: "image",
        src: "jira-admin-3.png",
        alt: "Add Project Access — search and select projects",
      },
      {
        type: "image",
        src: "jira-admin-4.jpg",
        alt: "Bulk authorize projects",
      },
      {
        type: "image",
        src: "jira-admin-5.jpg",
        alt: "Confirmation after adding projects",
      },

      {
        type: "heading",
        level: 2,
        content: "Project-level: Enable or Disable the App",
      },
      {
        type: "text",
        content:
          "Project administrators can enable Issue ChangeLog per project in Project Settings → Apps. Toggling the switch makes the panel available to project users if the project is also site-authorized.",
      },
      {
        type: "image",
        src: "Project-settings-1.png",
        alt: "Project settings - enabled view",
        caption: "Project settings when authorized and enabled.",
      },
      {
        type: "image",
        src: "project-settings-2.png",
        alt: "Project settings - not authorized view",
        caption:
          "Project settings when the project is not authorized by site admin.",
      },
      {
        type: "html",
        content: `
          <div class="info-box">
            <div class="info-icon" aria-hidden="true">🔒</div>
            <div class="info-content"><h3>Note</h3><p>Enabling at project level does not override site-level authorization — both are required for the app to show data.</p></div>
          </div>
        `,
      },

      { type: "heading", level: 2, content: "Issue Panel States & UX" },
      {
        type: "text",
        content:
          "The issue panel will display different messages depending on site/project authorization and project enablement. Use the screenshots below to identify each state.",
      },
      {
        type: "image",
        src: "issue-panel-1.png",
        alt: "Issue panel - disabled state",
        caption: "Issue panel when the app is disabled for the project.",
      },
      {
        type: "image",
        src: "issue-panel-2.png",
        alt: "Issue panel - unauthorized state",
        caption:
          "Issue panel when the project is not authorized by site admin.",
      },

      { type: "heading", level: 2, content: "Storage & Configuration Shape" },
      {
        type: "text",
        content:
          "Configuration is stored in Forge secure storage as small JSON objects. No issue content is persisted outside of Jira. Example shapes are used by the app (allowedProjects, per-project settings).",
      },
      {
        type: "heading",
        level: 2,
        content: "Performance and Tuning",
      },
      {
        type: "list",
        items: [
          "Pagination: default 20–25 items per page; reduce for very large projects",
          "Time filters: use shorter default windows for high-activity projects",
          "Include attachments: toggle off for large projects to reduce load",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Troubleshooting",
      },
      {
        type: "text",
        content:
          "Common issues include missing site permissions, project not authorized, or missing project enablement. See below quick checks.",
      },
      {
        type: "list",
        items: [
          "Verify app has required scopes: read:jira-work, read:jira-user, storage:app",
          "Confirm you are a site admin to authorize projects",
          "Check project admin enablement in Project Settings → Apps",
          "Refresh the browser and inspect the console/network for API errors",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Quick checklist",
      },
      {
        type: "html",
        content: `
          <ul class="tab-item-benefits">
            <li>Install the app on your Jira site</li>
            <li>Authorize projects at site level</li>
            <li>Enable the app in project settings</li>
            <li>Confirm users can view changelogs</li>
          </ul>
        `,
      },
      {
        type: "image",
        src: "feature-1.png",
        alt: "Feature overview",
      },
      {
        type: "image",
        src: "feature-2.png",
        alt: "Export CSV",
      },
      {
        type: "image",
        src: "feature-3.png",
        alt: "Pagination controls",
      },
      {
        type: "image",
        src: "feature-4.png",
        alt: "Filtering options",
      },
    ],
    tableOfContents: [
      { title: "Overview & Flow", anchor: "#overview" },
      {
        title: "Site-level: Authorize Projects",
        anchor: "#site-level-authorize",
      },
      { title: "Project-level: Enable/Disable", anchor: "#project-level" },
      { title: "Issue Panel States", anchor: "#issue-panel-states" },
      { title: "Storage & Performance", anchor: "#storage-performance" },
      { title: "Troubleshooting", anchor: "#troubleshooting" },
    ],
    navigation: {
      previous: { title: "Troubleshooting", target: "troubleshooting" },
      next: { title: "Support and Contact Information", target: "support" },
    },
  },

  troubleshooting: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Troubleshooting", link: "#" },
    ],
    title: "Troubleshooting",
    description:
      "Quick diagnosis and actionable steps for common admin- and user-facing issues when the Issue Change Log app does not appear or behaves unexpectedly.",
    sections: [
      {
        type: "html",
        content: `
        <div style="display:flex;justify-content:center;margin:18px 0;">
          <div class="troubleshooting-card" role="navigation" aria-label="Troubleshooting topics">
            <ul class="troubleshooting-list">
              <li class="troubleshooting-item"><button class="troubleshooting-link" data-target="troubleshooting-document-creation">App Not Appearing in Issue Panel <span class="troubleshooting-chevron" aria-hidden="true">›</span></button></li>
              <li class="troubleshooting-item"><button class="troubleshooting-link" data-target="troubleshooting-saving-version">Change Log Not Loading or Empty <span class="troubleshooting-chevron" aria-hidden="true">›</span></button></li>
              <li class="troubleshooting-item"><button class="troubleshooting-link" data-target="troubleshooting-page-group">Performance Issues or Slow Loading <span class="troubleshooting-chevron" aria-hidden="true">›</span></button></li>
              <li class="troubleshooting-item"><button class="troubleshooting-link" data-target="troubleshooting-content-display">Changes Not Appearing or Missing History <span class="troubleshooting-chevron" aria-hidden="true">›</span></button></li>
              <li class="troubleshooting-item"><button class="troubleshooting-link" data-target="troubleshooting-license-data">Installation or Update Issues <span class="troubleshooting-chevron" aria-hidden="true">›</span></button></li>
            </ul>
          </div>
        </div>
        `,
      },
    ],
    tableOfContents: [
      { title: "Quick Diagnosis", anchor: "#quick-diagnosis" },
      {
        title: "Authorize Projects (Site Admin)",
        anchor: "#site-admin-authorize-projects",
      },
      {
        title: "Enable the App (Project Admin)",
        anchor: "#project-admin-enable",
      },
      { title: "When You See the Yellow Banner", anchor: "#yellow-banner" },
      { title: "If Problems Persist", anchor: "#if-problems-persist" },
    ],
    navigation: {
      previous: { title: "Installation Guide", target: "installation" },
      next: { title: "User Guide", target: "configuration" },
    },
  },

  support: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Support", link: "#" },
    ],
    title: "Support and Contact Information",
    description:
      "Where to get help and how to open useful support requests so issues can be resolved quickly.",
    sections: [
      { type: "heading", level: 2, content: "Support Channels" },
      {
        type: "list",
        items: [
          "Primary docs & FAQ (this site)",
          "GitHub issues for bugs and feature requests",
          "Atlassian Marketplace support contact",
        ],
      },
      { type: "heading", level: 2, content: "How to Report a Bug" },
      {
        type: "text",
        content:
          "Include exact reproduction steps, browser and Jira Cloud region, app version, screenshots and the console network logs captured during the failure. A minimal reproduction repository or steps will speed triage.",
      },
      { type: "heading", level: 2, content: "Support SLA & Response" },
      {
        type: "text",
        content:
          "Community support is available via GitHub issues. For commercial agreements, include your marketplace vendor contact and purchase details to access priority support.",
      },
    ],
    tableOfContents: [
      { title: "Support Channels", anchor: "#support-channels" },
      { title: "How to Report a Bug", anchor: "#how-to-report" },
      { title: "SLA & Response", anchor: "#sla" },
    ],
    navigation: {
      previous: { title: "User Guide", target: "configuration" },
      next: { title: "Security and Privacy", target: "security" },
    },
  },

  security: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Security", link: "#" },
    ],
    title: "Security and Privacy",
    description:
      "A focused security summary describing threat model, data handling, permission boundaries and recommended hardening steps.",
    sections: [
      { type: "heading", level: 2, content: "Security Overview" },
      {
        type: "text",
        content:
          "Running on Forge offers a controlled execution environment with platform-managed secrets and compliance controls. The app requests only the minimum necessary scopes to read issue activity.",
      },
      { type: "heading", level: 2, content: "Data Handling & Privacy" },
      {
        type: "text",
        content:
          "Issue data is read on-demand and is not stored externally. Configuration and feature flags are stored in Forge storage encrypted at rest. The app supports data export only to CSV via the user's browser session; no server-side export endpoints are provided.",
      },
      { type: "heading", level: 2, content: "Permissions and Least Privilege" },
      {
        type: "list",
        items: [
          "Site admin must approve installation",
          "Per-project enablement is required before issue data is available",
          "Download links for attachments are shown only if the requesting user has attachment access",
        ],
      },
      { type: "heading", level: 2, content: "Recommendations" },
      {
        type: "list",
        items: [
          "Limit project enablement scope to the minimal necessary projects",
          "Regularly review installed apps in site administration",
          "Use browser-based exports for audits instead of scheduled external exports",
        ],
      },
    ],
    tableOfContents: [
      { title: "Security Overview", anchor: "#security-overview" },
      { title: "Data Handling", anchor: "#data-handling" },
      { title: "Recommendations", anchor: "#recommendations" },
    ],
    navigation: {
      previous: { title: "Support and Contact Information", target: "support" },
      next: { title: "Privacy Policy", target: "privacy" },
    },
  },

  privacy: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Privacy Policy", link: "#" },
    ],
    title: "Privacy Policy",
    description:
      "Concise privacy information: what is accessed, retention, and how to exercise privacy rights.",
    sections: [
      { type: "heading", level: 2, content: "Data Access & Retention" },
      {
        type: "text",
        content:
          "The app reads issue and comment metadata from the customer's Jira instance at request time and does not persist issue content to external systems. Configuration and settings are retained in Forge storage for the duration of the app's installation.",
      },
      { type: "heading", level: 2, content: "Third-Party Sharing" },
      {
        type: "text",
        content:
          "No third-party sharing of issue data occurs. Any CSV or PDF exports are generated in-browser and are under the user's control.",
      },
      { type: "heading", level: 2, content: "Data Subject Rights" },
      {
        type: "text",
        content:
          "For GDPR or equivalent requests, follow your organization's process for data subject access or contact the site administrator. Uninstalling the app removes configuration stored by the app.",
      },
    ],
    tableOfContents: [
      { title: "Data Access", anchor: "#data-access" },
      { title: "Third-Party Sharing", anchor: "#third-party" },
      { title: "Data Subject Rights", anchor: "#rights" },
    ],
    navigation: {
      previous: { title: "Security and Privacy", target: "security" },
      next: null,
    },
  },
};

if (typeof module !== "undefined" && module.exports)
  module.exports = { navigationData, headerNav, pageContent, sectionContents };
