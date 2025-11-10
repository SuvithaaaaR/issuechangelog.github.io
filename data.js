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
      id: "configuration",
      title: "Configuration and Setup",
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
            top: "8%",
            left: "92%",
            tooltip:
              "Export your changelog data to CSV format for external analysis and reporting",
          },
          {
            number: 2,
            top: "27%",
            left: "-1.2rem",
            tooltip:
              "Filter changelog entries by field, content, author, and status to find specific changes",
          },
          {
            number: 3,
            top: "89%",
            left: "23%",
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
            x: 25,
            y: -5,
            lineFrom: { x: 25, y: -8 },
            lineTo: { x: 25, y: 3 },
            tooltipTitle: "Refresh",
            tooltipDescription:
              "Reload the change log to see the latest updates from Jira.",
          },
          {
            number: "2",
            x: 94,
            y: -5,
            lineFrom: { x: 94, y: -5 },
            lineTo: { x: 94, y: 3 },
            tooltipTitle: "Export to CSV",
            tooltipDescription:
              "Download complete changelog data in CSV format for external analysis.",
          },
          {
            number: "3",
            x: 8,
            y: 40,
            lineFrom: { x: 8, y: 27 },
            lineTo: { x: 8, y: 40 },
            tooltipTitle: "Author Column",
            tooltipDescription:
              "Filter changes by the user who made them. Select one or more authors.",
          },
          {
            number: "4",
            x: 25,
            y: 40,
            lineFrom: { x: 25, y: 27 },
            lineTo: { x: 25, y: 40 },
            tooltipTitle: "Author Column",
            tooltipDescription:
              "Filter changes by the user who made them. Select one or more authors.",
          },
          {
            number: "5",
            x: 42,
            y: 40,
            lineFrom: { x: 42, y: 27 },
            lineTo: { x: 42, y: 40 },
            tooltipTitle: "Author Column",
            tooltipDescription:
              "Filter changes by the user who made them. Select one or more authors.",
          },
          {
            number: "6",
            x: 65,
            y: 40,
            lineFrom: { x: 65, y: 27 },
            lineTo: { x: 65, y: 40 },
            tooltipTitle: "To Column",
            tooltipDescription:
              "Search for changes by the new/updated value after the change was made",
          },
          {
            number: "7",
            x: 89,
            y: 40,
            lineFrom: { x: 89, y: 27 },
            lineTo: { x: 89, y: 40 },
            tooltipTitle: "Date column",
            tooltipDescription:
              "Show changes from a specific time period. Filters all other results.",
          },
          {
            number: "8",
            x: 20,
            y: 104,
            lineFrom: { x: 20, y: 97 },
            lineTo: { x: 20, y: 105 },
            tooltipTitle: "Items Per Page Selector",
            tooltipDescription:
              "Choose how many changes to display on each page (default: 25)",
          },
          {
            number: "9",
            x: 89,
            y: 104,
            lineFrom: { x: 89, y: 95.6 },
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
      "Step-by-step instructions to install Issue Change Log from the Atlassian Marketplace for Jira Cloud. No CLI required.",
    sections: [
      { type: "heading", level: 2, content: "Prerequisites" },
      { type: "heading", level: 3, content: "System Requirements" },
      {
        type: "list",
        items: [
          "Active Jira Cloud instance",
          "Jira administrator (site admin) privileges for installation",
        ],
      },
      { type: "heading", level: 3, content: "User Permissions" },
      {
        type: "list",
        items: [
          "Installation: Jira administrator or site administrator role",
          "Site configuration: Member of site-admins, jira-administrators, or administrators",
          "Project configuration: Project administrator role",
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
        content: "Install from Atlassian Marketplace (Recommended)",
      },
      { type: "heading", level: 3, content: "Step 1: Navigate to Marketplace" },
      {
        type: "text",
        content:
          "Go to https://marketplace.atlassian.com and sign in with your Atlassian account.",
      },
      { type: "heading", level: 3, content: "Step 2: Search for the App" },
      {
        type: "text",
        content:
          'Search for "Issue Change Log" and open the app listing to view details.',
      },
      { type: "heading", level: 3, content: "Step 3: Install the App" },
      {
        type: "text",
        content:
          'Click "Get it now" or "Try it free", select your Jira Cloud site, then click "Install app".',
      },
      { type: "heading", level: 3, content: "Step 4: Grant Permissions" },
      {
        type: "list",
        items: [
          "read:jira-work — read Jira issues and projects",
          "read:jira-user — read user information",
          "storage:app — store app configuration data",
        ],
      },
      { type: "heading", level: 3, content: "Step 5: Confirm Installation" },
      {
        type: "text",
        content:
          "Wait for the installation to complete. A success message confirms the app is installed.",
      },

      { type: "heading", level: 2, content: "Post-Installation Setup" },
      { type: "heading", level: 3, content: "Step 1: Verify Installation" },
      {
        type: "list",
        items: [
          'Open any Jira issue and look for the "Issue Changelog" panel on the right',
          "Seeing an access restriction message is expected before configuration",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: "Step 2: Initial Site Configuration (Admins)",
      },
      {
        type: "list",
        items: [
          "Go to Jira Settings → Apps → Manage apps",
          'Find "Issue Change Log" and open "Issue Change Log Settings"',
          "Authorize projects by selecting them individually or using Select All",
          "Confirm authorized projects appear in the Currently Allowed Projects table",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: "Step 3: Project-Level Configuration (Project Admins)",
      },
      {
        type: "list",
        items: [
          "Project Settings → Apps → Issue Change Log",
          "Toggle Enable Issue Change Log for this project (enabled by default if authorized)",
        ],
      },
      { type: "heading", level: 3, content: "Step 4: Test the Installation" },
      {
        type: "list",
        items: [
          "Open an issue in an authorized, enabled project",
          "Confirm change history appears and filters (24h, 7d, 30d…) work",
          "Try Export → CSV",
        ],
      },

      { type: "heading", level: 2, content: "Verification Checklist" },
      {
        type: "list",
        items: [
          "App appears in Jira Manage apps",
          "Issue Changelog panel visible in issue view",
          "Admin settings page accessible to administrators",
          "Project settings page accessible to project admins",
          "Access control working correctly",
          "Change logs displaying for authorized projects",
          "CSV export working",
          "Time filters operating correctly",
        ],
      },

      {
        type: "heading",
        level: 2,
        content: "Troubleshooting Installation Issues",
      },
      {
        type: "heading",
        level: 3,
        content: 'Issue: "App not appearing in issue panel"',
      },
      {
        type: "list",
        items: [
          "Hard-refresh the browser (Ctrl+F5 or Cmd+Shift+R)",
          "Clear browser cache",
          "Verify the app is installed in Jira Settings → Apps → Manage apps",
          "Ensure the project has been authorized by an administrator",
        ],
      },
      { type: "heading", level: 3, content: 'Issue: "Permission denied"' },
      {
        type: "list",
        items: [
          "Confirm you have Jira administrator privileges",
          "If actions fail, check with a site admin to verify your account permissions",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: 'Issue: "App installed but access denied for all projects"',
      },
      {
        type: "list",
        items: [
          "This is expected until projects are explicitly authorized",
          "Use the admin settings page to add projects and verify they appear in the allowed list",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: 'Issue: "Cannot access admin settings"',
      },
      {
        type: "list",
        items: [
          "Verify membership in site-admins, jira-administrators, or administrators",
          "Ask a site admin to grant access if needed",
        ],
      },

      { type: "heading", level: 2, content: "Uninstallation" },
      { type: "heading", level: 3, content: "Via Jira UI" },
      {
        type: "list",
        items: [
          "Jira Settings → Apps → Manage apps",
          'Find "Issue Change Log" and click Uninstall',
          "Confirm the uninstallation",
        ],
      },

      {
        type: "heading",
        level: 2,
        content: "Data Retention After Uninstallation",
      },
      {
        type: "list",
        items: [
          "Jira data: Not affected (the app reads Jira data only)",
          "App configuration: Removed (authorized project lists are deleted)",
          "No external data: Nothing stored outside Jira/Forge",
        ],
      },

      { type: "heading", level: 2, content: "Upgrading the App" },
      { type: "heading", level: 3, content: "From Marketplace" },
      {
        type: "text",
        content:
          "Updates are delivered automatically when installed from the Marketplace; you’ll be notified of changes.",
      },

      { type: "heading", level: 2, content: "Support" },
      {
        type: "text",
        content:
          "For installation assistance, see Support and Contact Information.",
      },
    ],
    tableOfContents: [
      { title: "Prerequisites", anchor: "#prerequisites" },
      {
        title: "Install from Atlassian Marketplace (Recommended)",
        anchor: "#install-from-atlassian-marketplace-recommended",
      },
      { title: "Post-Installation Setup", anchor: "#post-installation-setup" },
      { title: "Verification Checklist", anchor: "#verification-checklist" },
      {
        title: "Troubleshooting Installation Issues",
        anchor: "#troubleshooting-installation-issues",
      },
      { title: "Uninstallation", anchor: "#uninstallation" },
      {
        title: "Data Retention After Uninstallation",
        anchor: "#data-retention-after-uninstallation",
      },
      { title: "Upgrading the App", anchor: "#upgrading-the-app" },
      { title: "Support", anchor: "#support" },
    ],
    navigation: {
      previous: { title: "Features and Capabilities", target: "features" },
      next: { title: "Configuration and Setup", target: "configuration" },
    },
  },

  configuration: {
    breadcrumbs: [
      { title: "Issue Change Log", link: "#" },
      { title: "Configuration", link: "#" },
    ],
    title: "Configuration and Setup",
    description:
      "How to configure site-level permissions, project enablement and optional feature flags for the app.",
    sections: [
      { type: "image", src: "Admin-2.png", alt: "Admin settings screenshot" },
      {
        type: "image",
        src: "jira admin-1.png",
        alt: "Jira admin panel screenshot",
      },
      {
        type: "image",
        src: "pro admin-1.png",
        alt: "Project admin settings screenshot",
      },
      { type: "heading", level: 2, content: "Site-Level Authorization" },
      {
        type: "text",
        content:
          "Site admins approve the app and manage global settings. Only after site approval can project admins enable the app for individual projects. This provides a two-tier access model for added security.",
      },
      { type: "heading", level: 2, content: "Project Enablement" },
      {
        type: "text",
        content:
          "Enable the app per project via Project Settings → Apps. Once enabled, the Issue Change Log panel will appear on the issue view for that project.",
      },
      { type: "heading", level: 2, content: "Feature Flags and Tuning" },
      {
        type: "list",
        items: [
          "Enable compact mode for dense timelines",
          "Toggle 'include attachments' to avoid heavy downloads in large projects",
          "Set default time-window for views (e.g. 30 days)",
        ],
      },
      { type: "heading", level: 2, content: "Configuration Storage" },
      {
        type: "text",
        content:
          "Configuration values (feature flags, enabled projects list) are stored using Forge's secure storage. No issue data is persisted by the app.",
      },
    ],
    tableOfContents: [
      {
        title: "Site-Level Authorization",
        anchor: "#site-level-authorization",
      },
      { title: "Project Enablement", anchor: "#project-enablement" },
      { title: "Feature Flags", anchor: "#feature-flags" },
    ],
    navigation: {
      previous: { title: "Installation Guide", target: "installation" },
      next: { title: "Support and Contact Information", target: "support" },
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
      previous: { title: "Configuration and Setup", target: "configuration" },
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
