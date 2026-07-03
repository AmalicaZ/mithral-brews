document.addEventListener('DOMContentLoaded', () => {
  const contentArea = document.querySelector('.content');
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  const loadContent = (url) => {
    if (!contentArea) return;

    contentArea.innerHTML = '<p>Loading…</p>';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const selectors = ['.content', 'main', 'article', '.post-content', 'body'];
        let extractedContent = html;

        for (const selector of selectors) {
          const candidate = doc.querySelector(selector);
          if (candidate) {
            extractedContent = candidate.innerHTML;
            break;
          }
        }

        contentArea.innerHTML = extractedContent;
      })
      .catch(() => {
        contentArea.innerHTML = '<p>Sorry, that page couldn’t be loaded.</p>';
      });
  };

  const isInternalLink = (link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }

    try {
      const url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  };

  // Load latest blog post on page load
  loadContent('posts/video1.html');

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !isInternalLink(link)) {
      return;
    }

    const postPath = link.getAttribute('data-post') || link.getAttribute('href');
    if (!postPath) {
      return;
    }

    event.preventDefault();
    loadContent(postPath);
  });

  // Handle mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});