function showPage(pageId) {
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    document.getElementById(pageId).style.display = 'block';

    const links = document.querySelectorAll('.nav-links li');
    links.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.getElementById('link-' + (pageId === 'home' ? 'home' : (pageId === 'tv' ? 'tv' : 'about')));
    if(activeLink) activeLink.classList.add('active');
}