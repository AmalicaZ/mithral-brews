document.addEventListener('DOMContentLoaded', () => {
  const contentArea = document.querySelector('.content');
  const postLinks = document.querySelectorAll('[data-post]');

  postLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const postPath = link.getAttribute('data-post');

      fetch(postPath)
        .then(res => res.text())
        .then(html => {
          contentArea.innerHTML = html;
        })
        .catch(err => {
          contentArea.innerHTML = "<p>Error loading post.</p>";
        });
    });
  });
});
