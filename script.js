// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing page...");
  console.log("headerNav data:", headerNav);
  console.log("navigationData:", navigationData);
  console.log("sectionContents:", sectionContents);

  try {
    initializeHeader();
    initializeSidebar();
    // Load initial content – show Issue Changelog hero first
    loadSectionContent("issue-changelog");
    initializeSidebarToggle();
    createBackToTopButton();
    initializeScrollProgress();
    initializeKeyboardNavigation();
    addSearchFunctionality();
    console.log("Page initialized successfully!");
  } catch (error) {
    console.error("Error initializing page:", error);
  }
});

// Load content for a specific section
function loadSectionContent(sectionId) {
  const content = sectionContents[sectionId];
  if (!content) {
    console.error("No content found for section:", sectionId);
    return;
  }

  // If the manifest contains a string (path to a markdown file), fetch it
  if (typeof content === "string") {
    const mdPath = content;
    fetch(mdPath)
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch ${mdPath}: ${res.status}`);
        return res.text();
      })
      .then((md) => {
        // Convert markdown to simple HTML and render
        const html = markdownToHtml(md);

        // Try to get a title from the first H1 in the markdown
        const titleMatch = md.match(/^#\s+(.+)$/m);
        const title = titleMatch
          ? titleMatch[1].trim()
          : navigationData.sections.find((s) => s.id === sectionId)?.title ||
            "Documentation";

        // Update breadcrumbs minimally
        const breadcrumbsContainer = document.getElementById("breadcrumbs");
        breadcrumbsContainer.innerHTML = `
          <span class="breadcrumb-link">Documentation</span>
          <span class="breadcrumb-separator">/</span>
          <span>${escapeHtml(title)}</span>
        `;

        document.getElementById("articleTitle").textContent = title;
        document.getElementById("articleDescription").textContent = "";

        const articleContent = document.getElementById("articleContent");
        articleContent.innerHTML = html;

        // Build a simple TOC from h2/h3 headings inside the rendered HTML
        buildTocFromContent();
        addCopyButtons();
        addContentRevealAnimation();
      })
      .catch((err) => {
        console.error(err);
        const articleContent = document.getElementById("articleContent");
        articleContent.innerHTML = `<div class="load-error">Failed to load content: ${escapeHtml(
          err.message
        )}</div>`;
      });

    return;
  }

  // Update breadcrumbs
  const breadcrumbsContainer = document.getElementById("breadcrumbs");
  breadcrumbsContainer.innerHTML = content.breadcrumbs
    .map((crumb, index) => {
      const isLast = index === content.breadcrumbs.length - 1;
      return `
        ${index > 0 ? '<span class="breadcrumb-separator">/</span>' : ""}
        ${
          isLast
            ? `<span>${crumb.title}</span>`
            : `<a href="${crumb.link}" class="breadcrumb-link">${crumb.title}</a>`
        }
      `;
    })
    .join("");

  // Update title and description (hide default header for hero layout or objectives-banner)
  const titleEl = document.getElementById("articleTitle");
  const descEl = document.getElementById("articleDescription");
  const hasObjectivesBanner =
    content.sections &&
    content.sections[0] &&
    content.sections[0].type === "objectives-banner" &&
    content.sections[0].pageTitle;
  if (content.layout === "hero" || hasObjectivesBanner) {
    titleEl.textContent = "";
    descEl.textContent = "";
  } else {
    titleEl.textContent = content.title;
    descEl.textContent = content.description;
  }

  // Update main content
  const articleContent = document.getElementById("articleContent");
  const heroHtml =
    content.layout === "hero" ? buildHero(content.hero || {}, content) : "";

  // Find the index of the annotated-image section
  const annotatedImageIndex = content.sections.findIndex(
    (s) => s.type === "annotated-image"
  );
  const hasAnnotatedImage = annotatedImageIndex !== -1;

  articleContent.innerHTML =
    heroHtml +
    content.sections
      .map((section, index) => {
        // Add gray background wrapper after annotated image
        const isAfterAnnotatedImage =
          hasAnnotatedImage && index === annotatedImageIndex + 1;
        const prefix = isAfterAnnotatedImage
          ? '<div class="gray-background-section">'
          : "";

        // End gray section after info-message-box (Historical Analysis)
        const isInfoMessageBox = section.type === "info-message-box";
        const isLastSection = index === content.sections.length - 1;
        const suffix =
          hasAnnotatedImage &&
          index >= annotatedImageIndex + 1 &&
          (isLastSection || isInfoMessageBox)
            ? "</div>"
            : "";

        let sectionHtml = "";
        switch (section.type) {
          case "info-message-box":
            sectionHtml = `
            <div class="info-message-box">
              <div class="info-message-content">
                <div class="info-message-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                    <g fill-rule="evenodd">
                      <path fill="currentColor" d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12"></path>
                      <rect width="2" height="7" x="11" y="10" fill="inherit" rx="1"></rect>
                      <circle cx="12" cy="8" r="1" fill="inherit"></circle>
                    </g>
                  </svg>
                </div>
                <div class="info-message-text">
                  ${
                    section.title
                      ? `<p class="info-message-title"><strong>${parseMarkdown(
                          section.title
                        )}</strong></p>`
                      : ""
                  }
                  <p>${parseMarkdown(section.content)}</p>
                </div>
              </div>
            </div>
          `;
            break;
          case "info-box":
            sectionHtml = `
            <div class="info-box">
              <svg class="info-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <div class="info-content">
                <h3>${parseMarkdown(section.title)}</h3>
                <p>${parseMarkdown(section.content)}</p>
              </div>
            </div>
          `;
            break;
          case "warning-box":
            sectionHtml = `
            <div class="warning-box">
              <svg class="warning-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 20h20L12 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <div class="warning-content">
                <h3>${parseMarkdown(section.title)}</h3>
                <p>${parseMarkdown(section.content)}</p>
              </div>
            </div>
          `;
            break;
          case "heading":
            const headingId = section.content
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            sectionHtml = `<h${
              section.level
            } class="content-heading" id="${headingId}">${parseMarkdown(
              section.content
            )}</h${section.level}>`;
            break;
          case "text":
            sectionHtml = `<div class="text-content"><p>${parseMarkdown(
              section.content
            )}</p></div>`;
            break;
          case "objectives-banner":
            sectionHtml = `
            <div class="objectives-banner">
              ${
                section.pageTitle
                  ? `
              <div class="objectives-banner-header">
                <h1>${parseMarkdown(section.pageTitle)}</h1>
                <div class="objectives-banner-badges">
                  ${
                    section.duration
                      ? `<span class="objectives-badge">${section.duration}</span>`
                      : ""
                  }
                  ${
                    section.level
                      ? `<span class="objectives-badge">${section.level}</span>`
                      : ""
                  }
                </div>
              </div>
              `
                  : ""
              }
              ${
                section.subtitle
                  ? `<p class="objectives-banner-subtitle">${parseMarkdown(
                      section.subtitle
                    )}</p>`
                  : ""
              }
              <h3>${parseMarkdown(section.title)}</h3>
              <ul>
                ${section.items
                  .map((item) => `<li>${parseMarkdown(item)}</li>`)
                  .join("")}
              </ul>
            </div>
          `;
            break;
          case "list":
            const listClass = section.className
              ? `content-list ${section.className}`
              : "content-list";
            sectionHtml = `
            <ul class="${listClass}">
              ${section.items
                .map((item) => `<li>${parseMarkdown(item)}</li>`)
                .join("")}
            </ul>
          `;
            break;
          case "image":
            sectionHtml = `
            <div class="content-image">
              <img src="${section.src}" alt="${section.alt}" onerror="this.parentElement.innerHTML='<div style=\\'padding:100px;text-align:center;background:#f4f5f7;color:#6b778c;\\'>Image placeholder: ${section.alt}</div>'">
            </div>
          `;
            break;
          case "annotated-image":
            sectionHtml = `
            <div class="annotated-image-container">
              <img src="${section.src}" alt="${section.alt}">
              ${
                section.annotations && Array.isArray(section.annotations)
                  ? section.annotations
                      .map(
                        (annotation) => `
                ${
                  annotation.lineFrom && annotation.lineTo
                    ? `<div class="annotation-line" style="left: ${
                        annotation.lineFrom.x
                      }%; top: ${annotation.lineFrom.y}%; height: ${Math.abs(
                        annotation.lineTo.y - annotation.lineFrom.y
                      )}%;"></div>`
                    : ""
                }
                <div class="annotation-tag" style="left: ${
                  annotation.x
                }%; top: ${annotation.y}%; transform: translate(-50%, -50%);" 
                data-tooltip-title="${annotation.tooltipTitle || ""}" 
                data-tooltip-description="${
                  annotation.tooltipDescription || ""
                }" 
                onclick="toggleAnnotationTooltip(this)">${
                  annotation.number
                }</div>
              `
                      )
                      .join("")
                  : ""
              }
            </div>
          `;
            break;
          case "tabbed-section":
            const firstTab = section.tabs[0];
            sectionHtml = `
            <div class="tabbed-section">
              <div class="tab-nav">
                <ul class="tab-list">
                  ${section.tabs
                    .map(
                      (tab, index) => `
                    <li class="tab-item ${
                      index === 0 ? "active" : ""
                    }" data-tab="${tab.id}">
                      <button class="tab-button ${
                        index === 0 ? "active" : ""
                      }" onclick="switchTab('${tab.id}')">
                        <span class="tab-label">${tab.label}</span>
                      </button>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
                <div class="tab-content-wrapper">
                  ${section.tabs
                    .map(
                      (tab, index) => `
                    <div class="tab-content ${
                      index === 0 ? "active" : ""
                    }" id="tab-${tab.id}">
                      <p class="tab-intro">${parseMarkdown(
                        tab.content.intro
                      )}</p>
                      <ul class="tab-items-list simple-bullets">
                        ${tab.content.items
                          .map(
                            (item) => `
                          <li class="tab-item-bullet">
                            <strong class="tab-item-title">${parseMarkdown(
                              item.title
                            )}</strong>: ${parseMarkdown(item.description)}
                          </li>
                        `
                          )
                          .join("")}
                      </ul>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            </div>
          `;
            break;
          default:
            sectionHtml = "";
        }

        return prefix + sectionHtml + suffix;
      })
      .join("");

  // Update table of contents
  const tocNav = document.getElementById("tocNav");
  tocNav.innerHTML = content.tableOfContents
    .map(
      (item, index) => `
        <a href="${item.anchor}" class="toc-link ${
        index === 0 ? "active" : ""
      }" data-anchor="${item.anchor}">
          ${item.title}
        </a>
      `
    )
    .join("");

  // Re-attach TOC event listeners
  document.querySelectorAll(".toc-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      document.querySelectorAll(".toc-link").forEach((tocLink) => {
        tocLink.classList.remove("active");
      });

      // Add active class to clicked link
      this.classList.add("active");

      // Scroll to the target heading
      const anchor = this.getAttribute("data-anchor");
      const targetElement = document.querySelector(anchor);

      if (targetElement) {
        const headerHeight = 64; // Height of fixed header
        const offset = 20; // Extra offset for spacing
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Enhance code blocks and animations
  addCopyButtons();
  addContentRevealAnimation();
}

// Build a Twilio-like hero for the Issue Changelog landing
function buildHero(hero, fallback) {
  const title = hero.title || (fallback && fallback.title) || "Issue Changelog";
  const subtitle = hero.subtitle || (fallback && fallback.description) || "";
  const ctas = Array.isArray(hero.ctas) ? hero.ctas : [];
  const code = (hero.code && hero.code.snippet) || "// sample coming soon";
  const lang = (hero.code && hero.code.language) || "js";
  const image = hero.image && hero.image.src ? hero.image : null;

  const ctaHtml = ctas
    .map(
      (c) =>
        `<button class="hero-cta" data-target="${c.target}">${c.label} <span class="hero-cta-arrow">→</span></button>`
    )
    .join("");

  const escaped = escapeHtml(code);

  // Event binding happens after injection in loadSectionContent
  setTimeout(() => {
    document.querySelectorAll(".hero-cta").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (target && sectionContents[target]) {
          loadSectionContent(target);
        }
      });
    });
  }, 0);

  const callouts = image && Array.isArray(image.callouts) ? image.callouts : [];
  const calloutsHtml = callouts
    .map(
      (c) =>
        `<div class="hero-callout" style="top: ${c.top}; left: ${c.left};" ${
          c.tooltip ? `data-tooltip="${escapeHtml(c.tooltip)}"` : ""
        }>
       <div class="hero-callout-inner">
         <div class="hero-callout-number">${c.number}</div>
       </div>
       ${
         c.tooltip
           ? `<div class="hero-callout-tooltip">${escapeHtml(c.tooltip)}</div>`
           : ""
       }
     </div>`
    )
    .join("");

  const rightCard = image
    ? `
          <div class="hero-image-card">
            ${calloutsHtml}
            <img src="${image.src}" alt="${escapeHtml(
        image.alt || "Hero image"
      )}" onerror="this.parentElement.innerHTML='<div style=\'padding:80px;text-align:center;color:#6b778c;\'>Image placeholder: ${escapeHtml(
        image.alt || "Hero image"
      )}</div>'" />
          </div>
        `
    : `
          <div class="hero-code-card">
            <div class="hero-code-header">YOUR APP</div>
            <pre class="hero-pre"><code class="language-${lang}">${escaped}</code></pre>
            <a class="hero-examples" href="#">View complete examples</a>
            <div class="hero-bubble">Ahoy, changelog!</div>
          </div>
        `;

  return `
      <section class="hero">
        <div class="hero-left">
          <h1 class="hero-title">${escapeHtml(title)}</h1>
          <p class="hero-subtitle">${escapeHtml(subtitle)}</p>
          <div class="hero-cta-group">${ctaHtml}</div>
        </div>
        <div class="hero-right">
          ${rightCard}
        </div>
      </section>
    `;
}

// Initialize header navigation
function initializeHeader() {
  const headerNavElement = document.getElementById("headerNav");

  headerNavElement.innerHTML = headerNav
    .map((item) => `<a href="${item.link}">${item.title}</a>`)
    .join("");
}

// Initialize sidebar navigation
function initializeSidebar() {
  const sidebarNav = document.getElementById("sidebarNav");

  // Optional product card at the top (style similar to Twilio's product header)
  let html = "";
  const first = navigationData.sections && navigationData.sections[0];
  if (first && first.id === "issue-changelog") {
    html += `
      <div class="sidebar-product-card" data-section-id="${first.id}">
        <div class="sidebar-product-title">${first.title}</div>
      </div>
    `;
  }

  // Render remaining sections (skip the product card entry if present)
  const sectionsToRender = navigationData.sections.filter(
    (s, idx) => !(idx === 0 && s.id === "issue-changelog")
  );

  html += sectionsToRender
    .map(
      (section) => `
      <div class="nav-section ${
        section.expanded ? "expanded" : ""
      }" data-section-id="${section.id}">
        <div class="nav-section-title" data-section-id="${section.id}">
          <svg class="nav-section-icon" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="nav-section-text">${section.title}</span>
        </div>
        ${
          section.items.length > 0
            ? `
          <div class="nav-items">
            ${section.items
              .map(
                (item) => `
              <a href="#${item.id}" class="nav-item ${
                  item.active ? "active" : ""
                }" data-item-id="${item.id}">
                ${item.title}
              </a>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    `
    )
    .join("");

  sidebarNav.innerHTML = html;

  // Add click handlers for expandable sections
  document.querySelectorAll(".nav-section-title").forEach((title) => {
    const icon = title.querySelector(".nav-section-icon");
    const text = title.querySelector(".nav-section-text");

    // Arrow click - only toggle expansion
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      const section = title.parentElement;
      section.classList.toggle("expanded");
    });

    // Title text click - load content and expand
    text.addEventListener("click", function (e) {
      e.stopPropagation();
      const section = title.parentElement;
      const sectionId = section.getAttribute("data-section-id");

      // Expand the section if not already expanded
      if (!section.classList.contains("expanded")) {
        section.classList.add("expanded");
      }

      // Load content for this section
      if (sectionContents[sectionId]) {
        loadSectionContent(sectionId);

        // Update active state
        document.querySelectorAll(".nav-section-title").forEach((t) => {
          t.classList.remove("active-section");
        });
        title.classList.add("active-section");
        // On small screens, close the sidebar to show content
        if (window.innerWidth <= 768) {
          section.parentElement.classList.remove("open");
          document.querySelector(".sidebar").classList.remove("open");
          document.body.classList.remove("sidebar-open");
          document.body.classList.add("sidebar-collapsed");
        }
      }
    });
  });

  // Add click handlers for navigation items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all items
      document.querySelectorAll(".nav-item").forEach((navItem) => {
        navItem.classList.remove("active");
      });

      // Add active class to clicked item
      this.classList.add("active");
      // Close sidebar on mobile to reveal content
      if (window.innerWidth <= 768) {
        const sidebarEl = document.querySelector(".sidebar");
        if (sidebarEl) sidebarEl.classList.remove("open");
        document.body.classList.remove("sidebar-open");
        document.body.classList.add("sidebar-collapsed");
      }
    });
  });

  // Click handler for product card (loads its page)
  const productCard = document.querySelector(".sidebar-product-card");
  if (productCard) {
    productCard.addEventListener("click", function () {
      const id = this.getAttribute("data-section-id");
      if (sectionContents[id]) {
        loadSectionContent(id);
        // Highlight like an active section
        document
          .querySelectorAll(".nav-section-title")
          .forEach((t) => t.classList.remove("active-section"));
        this.classList.add("active-section");
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
          const sidebarEl = document.querySelector(".sidebar");
          if (sidebarEl) sidebarEl.classList.remove("open");
          document.body.classList.remove("sidebar-open");
          document.body.classList.add("sidebar-collapsed");
        }
      }
    });
  }
}

// Initialize sidebar toggle for mobile
function initializeSidebarToggle() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");

  sidebarToggle.addEventListener("click", function () {
    // Toggle sidebar for both mobile and desktop
    const opened = sidebar.classList.toggle("open");

    // When opened on small screens, add an overlay state; on desktop keep collapsed flag
    if (window.innerWidth <= 768) {
      document.body.classList.toggle("sidebar-open", opened);
      // ensure collapsed flag is removed when open
      document.body.classList.toggle("sidebar-collapsed", false);
    } else {
      document.body.classList.toggle("sidebar-collapsed", !opened);
      document.body.classList.toggle("sidebar-open", false);
    }

    // Update button aria-label
    const isCollapsed = document.body.classList.contains("sidebar-collapsed");
    sidebarToggle.setAttribute(
      "aria-label",
      isCollapsed ? "Expand sidebar" : "Collapse sidebar"
    );
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove("open");
        document.body.classList.remove("sidebar-open");
        document.body.classList.add("sidebar-collapsed");
      }
    }
  });
}

// Scroll spy for table of contents
let ticking = false;
window.addEventListener("scroll", function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      updateActiveLink();
      ticking = false;
    });
    ticking = true;
  }
});

function updateActiveLink() {
  const tocLinks = document.querySelectorAll(".toc-link");
  let activeSet = false;

  tocLinks.forEach((link) => {
    const anchor = link.getAttribute("data-anchor");
    const section = document.querySelector(anchor);

    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2 && !activeSet) {
        tocLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        activeSet = true;
      }
    }
  });
}

// Create back-to-top button
function createBackToTopButton() {
  const button = document.createElement("button");
  button.id = "backToTop";
  button.innerHTML = "↑";
  button.setAttribute("aria-label", "Back to top");
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
    z-index: 1000;
  `;

  document.body.appendChild(button);

  // Show/hide button on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      button.style.opacity = "1";
      button.style.visibility = "visible";
    } else {
      button.style.opacity = "0";
      button.style.visibility = "hidden";
    }
  });

  // Scroll to top on click
  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hover effect
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)";
    this.style.boxShadow = "0 6px 16px rgba(0, 82, 204, 0.4)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 12px rgba(0, 82, 204, 0.3)";
  });
}

// Initialize scroll progress indicator
function initializeScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.id = "scrollProgress";
  progressBar.style.cssText = `
    position: fixed;
    top: 64px;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), #4C9AFF);
    z-index: 1001;
    transition: width 0.1s ease-out;
  `;

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// Add copy button to code blocks (if any are added later)
function addCopyButtons() {
  document.querySelectorAll("pre code").forEach((block) => {
    const button = document.createElement("button");
    button.className = "copy-code-btn";
    button.textContent = "Copy";
    button.onclick = function () {
      navigator.clipboard.writeText(block.textContent);
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 2000);
    };
    block.parentElement.style.position = "relative";
    block.parentElement.appendChild(button);
  });
}

// Keyboard navigation
function initializeKeyboardNavigation() {
  document.addEventListener("keydown", function (e) {
    // Press '/' to open search
    if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
      const searchModal = document.getElementById("searchModal");
      const searchInput = document.getElementById("searchInput");
      if (searchModal && !searchModal.classList.contains("active")) {
        e.preventDefault();
        openSearchModal();
      }
    }

    // Press ESC to close search or sidebar
    if (e.key === "Escape") {
      const searchModal = document.getElementById("searchModal");
      if (searchModal && searchModal.classList.contains("active")) {
        closeSearchModal();
        return;
      }

      const sidebar = document.querySelector(".sidebar");
      if (sidebar && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
      }
    }

    // Alt + Arrow Up: Scroll to top
    if (e.altKey && e.key === "ArrowUp") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Alt + Arrow Down: Scroll to bottom
    if (e.altKey && e.key === "ArrowDown") {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  });
}

// Open search modal
function openSearchModal() {
  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("searchInput");
  searchModal.classList.add("active");
  setTimeout(() => searchInput.focus(), 100);
}

// Close search modal
function closeSearchModal() {
  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("searchInput");
  searchModal.classList.remove("active");
  searchInput.value = "";
  document.getElementById("searchResults").innerHTML =
    '<div class="search-hint">Start typing to search across all sections...</div>';
}

// Add search highlighting functionality
function addSearchFunctionality() {
  const searchBtn = document.querySelector(".search-btn");
  const searchModal = document.getElementById("searchModal");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");

  // Open modal on search button click
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      openSearchModal();
    });
  }

  // Close modal on close button click
  if (searchClose) {
    searchClose.addEventListener("click", function () {
      closeSearchModal();
    });
  }

  // Close modal when clicking outside
  if (searchModal) {
    searchModal.addEventListener("click", function (e) {
      if (e.target === searchModal) {
        closeSearchModal();
      }
    });
  }

  // Search functionality
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener("input", function (e) {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim().toLowerCase();

      if (query.length === 0) {
        document.getElementById("searchResults").innerHTML =
          '<div class="search-hint">Start typing to search across all sections...</div>';
        return;
      }

      // Debounce search
      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    });

    // Handle keyboard navigation in search results
    searchInput.addEventListener("keydown", function (e) {
      const results = document.querySelectorAll(".search-result-item");
      const selected = document.querySelector(".search-result-item.selected");

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!selected && results.length > 0) {
          results[0].classList.add("selected");
        } else if (selected) {
          const next = selected.nextElementSibling;
          if (next && next.classList.contains("search-result-item")) {
            selected.classList.remove("selected");
            next.classList.add("selected");
            next.scrollIntoView({ block: "nearest" });
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (selected) {
          const prev = selected.previousElementSibling;
          if (prev && prev.classList.contains("search-result-item")) {
            selected.classList.remove("selected");
            prev.classList.add("selected");
            prev.scrollIntoView({ block: "nearest" });
          }
        }
      } else if (e.key === "Enter" && selected) {
        selected.click();
      }
    });
  }
}

// Perform search across all content
function performSearch(query) {
  const results = [];

  // Search through all sections
  Object.keys(sectionContents).forEach((sectionId) => {
    const section = sectionContents[sectionId];
    const sectionTitle =
      navigationData.sections.find((s) => s.id === sectionId)?.title || "";

    // Search in title
    if (section.title.toLowerCase().includes(query)) {
      results.push({
        sectionId: sectionId,
        sectionTitle: sectionTitle,
        title: section.title,
        preview: section.description,
        type: "title",
      });
    }

    // Search in description
    if (section.description.toLowerCase().includes(query)) {
      const preview = highlightText(section.description, query);
      results.push({
        sectionId: sectionId,
        sectionTitle: sectionTitle,
        title: section.title,
        preview: preview,
        type: "description",
      });
    }

    // Search in content sections
    section.sections.forEach((contentSection, index) => {
      if (
        contentSection.type === "text" &&
        contentSection.content.toLowerCase().includes(query)
      ) {
        const preview = highlightText(
          getPreviewText(contentSection.content, query),
          query
        );
        results.push({
          sectionId: sectionId,
          sectionTitle: sectionTitle,
          title: section.title,
          preview: preview,
          type: "content",
        });
      } else if (
        contentSection.type === "info-box" &&
        contentSection.content.toLowerCase().includes(query)
      ) {
        const preview = highlightText(
          getPreviewText(contentSection.content, query),
          query
        );
        results.push({
          sectionId: sectionId,
          sectionTitle: sectionTitle,
          title: `${section.title} - ${contentSection.title}`,
          preview: preview,
          type: "info-box",
        });
      } else if (contentSection.type === "list" && contentSection.items) {
        contentSection.items.forEach((item) => {
          if (item.toLowerCase().includes(query)) {
            const preview = highlightText(item, query);
            results.push({
              sectionId: sectionId,
              sectionTitle: sectionTitle,
              title: section.title,
              preview: preview,
              type: "list",
            });
          }
        });
      }
    });
  });

  displaySearchResults(results, query);
}

// Get preview text around the search query
function getPreviewText(text, query, contextLength = 100) {
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(query.toLowerCase());

  if (index === -1) return text.substring(0, contextLength) + "...";

  const start = Math.max(0, index - contextLength / 2);
  const end = Math.min(text.length, index + query.length + contextLength / 2);

  let preview = text.substring(start, end);
  if (start > 0) preview = "..." + preview;
  if (end < text.length) preview = preview + "...";

  return preview;
}

// Highlight search query in text
function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// Display search results
function displaySearchResults(results, query) {
  const searchResults = document.getElementById("searchResults");

  if (results.length === 0) {
    searchResults.innerHTML = `
      <div class="search-no-results">
        <div class="search-no-results-icon">🔍</div>
        <div class="search-no-results-text">No results found for "${query}"</div>
        <div class="search-no-results-hint">Try different keywords or check your spelling</div>
      </div>
    `;
    return;
  }

  // Limit to top 10 results
  const limitedResults = results.slice(0, 10);

  searchResults.innerHTML = limitedResults
    .map(
      (result) => `
    <div class="search-result-item" data-section-id="${result.sectionId}">
      <div class="search-result-section">${result.sectionTitle}</div>
      <div class="search-result-title">${result.title}</div>
      <div class="search-result-preview">${result.preview}</div>
    </div>
  `
    )
    .join("");

  // Add click handlers to results
  document.querySelectorAll(".search-result-item").forEach((item) => {
    item.addEventListener("click", function () {
      const sectionId = this.getAttribute("data-section-id");
      loadSectionContent(sectionId);
      closeSearchModal();

      // Expand the section in sidebar
      const section = document.querySelector(
        `[data-section-id="${sectionId}"]`
      );
      if (section) {
        section.classList.add("expanded");
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    item.addEventListener("mouseenter", function () {
      document
        .querySelectorAll(".search-result-item")
        .forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
}

// Add smooth reveal animation for content sections
function addContentRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeIn 0.6s ease-out";
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".text-content, .content-list, .info-box, .warning-box")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Minimal markdown -> HTML converter (supports headings, paragraphs, unordered lists, and code blocks)
function markdownToHtml(md) {
  // Normalize line endings
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let inList = false;

  function closeList() {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!line.trim()) {
      closeList();
      continue;
    }

    // Heading levels
    const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      closeList();
      const level = Math.min(hMatch[1].length, 6);
      const text = escapeHtml(hMatch[2].trim());
      out.push(`<h${level}>${text}</h${level}>`);
      continue;
    }

    // Unordered list
    const liMatch = line.match(/^[-*+]\s+(.*)$/);
    if (liMatch) {
      if (!inList) {
        inList = true;
        out.push('<ul class="content-list">\n');
      }
      out.push(`<li>${escapeHtml(liMatch[1].trim())}</li>`);
      continue;
    }

    // Code block (fenced)
    const fencedStart = line.match(/^```(\w*)/);
    if (fencedStart) {
      const lang = fencedStart[1] || "";
      let codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      closeList();
      out.push(
        `<pre><code class=\"language-${escapeHtml(lang)}\">${escapeHtml(
          codeLines.join("\n")
        )}</code></pre>`
      );
      continue;
    }

    // Paragraph (fallback)
    closeList();
    out.push(`<p>${escapeHtml(line.trim())}</p>`);
  }

  closeList();
  return out.join("\n");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Parse simple markdown bold syntax (**text** -> <strong>text</strong>)
function parseMarkdown(str) {
  // First escape HTML
  let escaped = escapeHtml(str);
  // Then convert **text** to <strong>text</strong>
  return escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

// Build a simple table-of-contents by scanning the rendered articleContent for headings
function buildTocFromContent() {
  const tocNav = document.getElementById("tocNav");
  const articleContent = document.getElementById("articleContent");
  const headings = articleContent.querySelectorAll("h2, h3");
  if (!headings || headings.length === 0) {
    tocNav.innerHTML = "";
    return;
  }

  const tocItems = Array.from(headings).map((h, idx) => {
    const id = `md-heading-${idx}`;
    h.id = id;
    return `<a href="#${id}" class="toc-link" data-anchor="#${id}">${escapeHtml(
      h.textContent
    )}</a>`;
  });

  tocNav.innerHTML = tocItems.join("\n");
  // Attach click listeners similar to existing behavior
  document.querySelectorAll(".toc-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const anchor = this.getAttribute("data-anchor");
      const targetElement = document.querySelector(anchor);
      if (targetElement) {
        const headerHeight = 64;
        const offset = 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });
}

// Initialize version dropdown functionality
function initializeVersionDropdown() {
  const versionBtn = document.getElementById("versionBtn");
  const versionMenu = document.getElementById("versionMenu");
  const versionItems = document.querySelectorAll(
    ".dropdown-item[data-version]"
  );

  if (!versionBtn || !versionMenu) return;

  // Handle version selection
  versionItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedVersion = this.getAttribute("data-version");

      // Update button text
      versionBtn.textContent = `Version ${selectedVersion} ▼`;

      // Update active state
      versionItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      // Show notification (optional)
      showVersionNotification(selectedVersion);
    });
  });
}

// Show version change notification
function showVersionNotification(version) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "version-notification";
  notification.innerHTML = `
    <div class="version-notification-content">
      <span class="notification-icon">ℹ️</span>
      <span>Viewing documentation for Version ${version}</span>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Hide and remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize Save as PDF button
function initializeSaveAsPdfButton() {
  const btn = document.getElementById("savePdfBtn");
  if (!btn) return;
  // helper: render a section's 'sections' array into a container element
  function renderSectionsToElement(sections) {
    const container = document.createElement("div");
    container.className = "pdf-section";
    sections.forEach((section) => {
      switch (section.type) {
        case "heading": {
          const h = document.createElement(`h${section.level || 2}`);
          h.className = "content-heading";
          h.textContent = section.content;
          container.appendChild(h);
          break;
        }
        case "text": {
          const p = document.createElement("p");
          p.className = "text-content";
          p.innerHTML = section.content;
          container.appendChild(p);
          break;
        }
        case "list": {
          const ul = document.createElement("ul");
          ul.className = "content-list";
          (section.items || []).forEach((it) => {
            const li = document.createElement("li");
            li.textContent = it;
            ul.appendChild(li);
          });
          container.appendChild(ul);
          break;
        }
        case "info-box": {
          const box = document.createElement("div");
          box.className = "info-box pdf-info-box";
          box.innerHTML = `<h3>${
            section.title || "Info"
          }</h3><div class="info-content"><p>${section.content}</p></div>`;
          container.appendChild(box);
          break;
        }
        case "warning-box": {
          const box = document.createElement("div");
          box.className = "warning-box pdf-warning-box";
          box.innerHTML = `<h3>${
            section.title || "Warning"
          }</h3><div class="warning-content"><p>${section.content}</p></div>`;
          container.appendChild(box);
          break;
        }
        case "image": {
          const img = document.createElement("img");
          img.src = section.src;
          img.alt = section.alt || "";
          img.style.maxWidth = "100%";
          container.appendChild(img);
          break;
        }
        case "annotated-image": {
          const annotatedContainer = document.createElement("div");
          annotatedContainer.className = "annotated-image-container";

          const img = document.createElement("img");
          img.src = section.src;
          img.alt = section.alt || "";
          annotatedContainer.appendChild(img);

          // Add annotations if provided
          if (section.annotations && Array.isArray(section.annotations)) {
            section.annotations.forEach((annotation) => {
              // Create line if coordinates provided
              if (annotation.lineFrom && annotation.lineTo) {
                const line = document.createElement("div");
                line.className = "annotation-line";

                // Calculate vertical line length (simplified for vertical lines)
                const lineLength = Math.abs(
                  annotation.lineTo.y - annotation.lineFrom.y
                );

                line.style.left = annotation.lineFrom.x + "%";
                line.style.top = annotation.lineFrom.y + "%";
                line.style.height = lineLength + "%";
                annotatedContainer.appendChild(line);
              }

              // Create tag
              const tag = document.createElement("div");
              tag.className = "annotation-tag";
              tag.textContent = annotation.number;
              tag.style.left = annotation.x + "%";
              tag.style.top = annotation.y + "%";
              tag.style.transform = "translate(-50%, -50%)";
              annotatedContainer.appendChild(tag);
            });
          }

          container.appendChild(annotatedContainer);
          break;
        }
        default:
          // unknown types: render raw
          const raw = document.createElement("div");
          raw.innerHTML = section.content || "";
          container.appendChild(raw);
      }
    });
    return container;
  }

  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // show notification
    const notification = document.createElement("div");
    notification.className = "version-notification";
    notification.innerHTML = `
      <div class="version-notification-content">
        <span class="notification-icon">📄</span>
        <span>Preparing PDF (this may take a moment)...</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add("show"), 50);

    // build full document container
    const full = document.createElement("div");
    full.className = "pdf-full-document";

    // Add header for PDF: title, version, date
    const titleEl = document.getElementById("articleTitle");
    const versionActive = document.querySelector(".dropdown-item.active");
    const versionStr = versionActive
      ? versionActive.getAttribute("data-version")
      : "latest";
    const header = document.createElement("div");
    header.className = "pdf-header";
    const h1 = document.createElement("h1");
    h1.textContent = titleEl ? titleEl.textContent.trim() : "Documentation";
    const meta = document.createElement("div");
    meta.className = "pdf-meta";
    const date = new Date().toLocaleDateString();
    meta.textContent = `Version ${versionStr} • ${date}`;
    header.appendChild(h1);
    header.appendChild(meta);
    full.appendChild(header);

    // Iterate through navigationData to include all sections in order
    (navigationData.sections || []).forEach((nav) => {
      const id = nav.id;
      const page = sectionContents[id];
      if (!page) return;
      // section title
      const sectionWrap = document.createElement("section");
      sectionWrap.className = "pdf-page";
      const secTitle = document.createElement("h2");
      secTitle.textContent = page.title || nav.title;
      sectionWrap.appendChild(secTitle);

      // render page sections
      const rendered = renderSectionsToElement(page.sections || []);
      sectionWrap.appendChild(rendered);

      // optional page break
      const pb = document.createElement("div");
      pb.className = "page-break";
      sectionWrap.appendChild(pb);

      full.appendChild(sectionWrap);
    });

    // build filename
    const safeTitle = (titleEl ? titleEl.textContent : "documentation")
      .toLowerCase()
      .replace(/[^a-z0-9\-\s]+/g, "")
      .replace(/\s+/g, "-");
    const filename = `${safeTitle}-${versionStr}-full.pdf`;

    // Inject print-friendly CSS into wrapper
    const style = document.createElement("style");
    style.textContent = `
      .pdf-full-document { font-family: Arial, Helvetica, sans-serif; color: #111; background: #fff; padding: 20px; }
      .pdf-header h1 { margin: 0 0 6px 0; font-size: 20px; color: #0b3a66; }
      .pdf-meta { font-size: 12px; color: #333; margin-bottom: 12px; }
      h2 { color: #0b3a66; margin-top: 18px; }
      p { color: #111; line-height: 1.5; }
      .info-box, .pdf-info-box { border: 1px solid #cce4ff; background: #e9f5ff; padding: 10px; border-radius: 4px; }
      .warning-box, .pdf-warning-box { border: 1px solid #ffd6a5; background: #fff4e6; padding: 10px; border-radius: 4px; }
      .content-list { margin-left: 18px; }
      .page-break { page-break-after: always; }
      img { max-width: 100%; height: auto; }
    `;

    // append wrapper hidden and generate PDF
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.appendChild(style);
    wrapper.appendChild(full);
    document.body.appendChild(wrapper);

    if (window.html2pdf) {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      html2pdf()
        .set(opt)
        .from(full)
        .save()
        .then(() => {
          wrapper.remove();
          setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => notification.remove(), 300);
          }, 800);
        })
        .catch((err) => {
          console.error("PDF generation failed", err);
          wrapper.remove();
          setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => notification.remove(), 300);
          }, 800);
        });
    } else {
      // fallback: cleanup and show message
      console.warn("html2pdf not available, falling back to print dialog");
      wrapper.remove();
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      }, 800);
      try {
        window.print();
      } catch (e) {
        console.error(e);
      }
    }
  });
}

// Annotation tooltip toggle function
function toggleAnnotationTooltip(element) {
  const tooltipTitle = element.getAttribute("data-tooltip-title");
  const tooltipDescription = element.getAttribute("data-tooltip-description");
  if (!tooltipTitle && !tooltipDescription) return;

  // Remove active class from all tags and close their tooltips
  document.querySelectorAll(".annotation-tag").forEach((tag) => {
    tag.classList.remove("active");
    const popup = tag.querySelector(".annotation-tooltip-popup");
    if (popup) {
      popup.remove();
    }
  });

  // Check if this element already has a tooltip (was just closed above)
  const existingTooltip = element.querySelector(".annotation-tooltip-popup");
  if (existingTooltip) {
    element.classList.remove("active");
    existingTooltip.remove();
    return;
  }

  // Add active class to current tag
  element.classList.add("active");

  // Get all annotation tags to navigate between them
  const allTags = Array.from(document.querySelectorAll(".annotation-tag"));
  const currentIndex = allTags.indexOf(element);
  const totalTags = allTags.length;
  const currentNumber = currentIndex + 1;

  // Create tooltip popup
  const tooltipPopup = document.createElement("div");
  tooltipPopup.className = "annotation-tooltip-popup";
  tooltipPopup.innerHTML = `
    <div class="tooltip-header">
      <span class="tooltip-counter">${currentNumber}/${totalTags}</span>
      <div class="tooltip-nav-buttons">
        <button class="tooltip-nav-btn tooltip-prev" ${
          currentIndex === 0 ? "disabled" : ""
        } onclick="event.stopPropagation(); navigateTooltip(${
    currentIndex - 1
  })">
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <path fill="currentColor" fill-rule="evenodd" d="M13.706 9.698a.99.99 0 0 0 0-1.407 1.01 1.01 0 0 0-1.419 0l-2.965 2.94a1.09 1.09 0 0 0 0 1.548l2.955 2.93a1.01 1.01 0 0 0 1.42 0 .99.99 0 0 0 0-1.407l-2.318-2.297z"></path>
          </svg>
        </button>
        <button class="tooltip-nav-btn tooltip-next" ${
          currentIndex === totalTags - 1 ? "disabled" : ""
        } onclick="event.stopPropagation(); navigateTooltip(${
    currentIndex + 1
  })">
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <path fill="currentColor" fill-rule="evenodd" d="M10.294 9.698a.99.99 0 0 1 0-1.407 1.01 1.01 0 0 1 1.419 0l2.965 2.94a1.09 1.09 0 0 1 0 1.548l-2.955 2.93a1.01 1.01 0 0 1-1.42 0 .99.99 0 0 1 0-1.407l2.318-2.297z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="tooltip-content">
      ${tooltipTitle ? `<p class="tooltip-title">${tooltipTitle}</p>` : ""}
      ${
        tooltipDescription
          ? `<p class="tooltip-description">${tooltipDescription}</p>`
          : ""
      }
    </div>
  `;

  element.appendChild(tooltipPopup);

  // Close tooltip when clicking outside
  setTimeout(() => {
    document.addEventListener("click", function closeTooltip(e) {
      if (!element.contains(e.target)) {
        element.classList.remove("active");
        tooltipPopup.remove();
        document.removeEventListener("click", closeTooltip);
      }
    });
  }, 0);
}

// Navigate to a different tooltip
function navigateTooltip(index) {
  const allTags = document.querySelectorAll(".annotation-tag");
  if (allTags[index]) {
    // Close current tooltip
    document
      .querySelectorAll(".annotation-tooltip-popup")
      .forEach((popup) => popup.remove());
    // Open new tooltip
    toggleAnnotationTooltip(allTags[index]);
  }
}

// Switch between tabs in tabbed section
function switchTab(tabId) {
  // Get all tab buttons and contents
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabItems = document.querySelectorAll(".tab-item");
  const tabContents = document.querySelectorAll(".tab-content");

  // Remove active class from all
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabItems.forEach((item) => item.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));

  // Add active class to selected tab
  const selectedButton = document.querySelector(
    `[data-tab="${tabId}"] .tab-button`
  );
  const selectedItem = document.querySelector(`[data-tab="${tabId}"]`);
  const selectedContent = document.getElementById(`tab-${tabId}`);

  if (selectedButton) selectedButton.classList.add("active");
  if (selectedItem) selectedItem.classList.add("active");
  if (selectedContent) selectedContent.classList.add("active");
}

// Initialize version dropdown when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeVersionDropdown();
  initializeSaveAsPdfButton();
});
