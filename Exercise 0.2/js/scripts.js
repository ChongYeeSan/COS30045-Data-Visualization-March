function showPage(pageId) {
    // 1. Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // 2. Show the selected page
    document.getElementById(pageId).style.display = 'block';

    // 3. Update Nav Links feedback
    const links = document.querySelectorAll('.nav-links li');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked element
    // This logic assumes IDs follow the pattern 'link-home', 'link-tv', etc.
    const activeLink = document.getElementById('link-' + (pageId === 'home' ? 'home' : (pageId === 'tv' ? 'tv' : 'about')));
    if(activeLink) activeLink.classList.add('active');
}