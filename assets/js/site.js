document.addEventListener('DOMContentLoaded', () => {
  const contentArea = document.querySelector('.content');
  const postLinks = document.querySelectorAll('[data-post]');
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Load latest blog post on page load
  fetch('posts/2025-09-04-foundry-setup.html')
    .then(response => response.text())
    .then(html => {
      contentArea.innerHTML = html;
    })
    .catch(() => {
      contentArea.innerHTML = '<p>Latest post could not be loaded.</p>';
    });

  // Handle sidebar post clicks
  postLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const postPath = link.getAttribute('data-post');

      fetch(postPath)
        .then(response => response.text())
        .then(html => {
          contentArea.innerHTML = html;
        })
        .catch(() => {
          contentArea.innerHTML = '<p>Sorry, that post couldn’t be loaded.</p>';
        });
    });
  });

  // Handle mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});