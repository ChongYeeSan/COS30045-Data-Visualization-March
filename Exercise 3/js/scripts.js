function showPage(pageId) {
    
   document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
   });

   document.getElementById(pageId).style.display = 'block';

   document.querySelectorAll('.nav-links li').forEach(link => {
        link.classList.remove('active');
   });
   document.getElementById("link-" + pageId).classList.add('active');
}
