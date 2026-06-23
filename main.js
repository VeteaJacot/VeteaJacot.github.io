(function($){
    $(function(){
        $('.sidenav').sidenav();
    });
})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    // 1. Get current page details
    const currentPath = window.location.pathname;
    // Decodes URI component to handle "%20" vs spaces correctly in file matching
    const currentPage = decodeURIComponent(currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html');

    // 2. Detect if we are on a French page
    // We check for "Fr.html" (case insensitive just to be safe)
    const isFrenchPage = /Fr\.html$/i.test(currentPage);

    // Insert into Desktop Menu (before the flag)
    const desktopList = document.querySelector('nav ul.right');
    const desktopFlag = desktopList ? desktopList.querySelector('.lang-switch-desktop') : null;

    // Insert into Mobile Menu (before the flag)
    const mobileList = document.getElementById('nav-mobile');
    const mobileFlag = mobileList ? mobileList.querySelector('.lang-switch-mobile') : null;

    // 3. Define Language Switcher settings
    const langSettings = isFrenchPage
        ? {
            flagSrc: './rsc/united.png',
            flagAlt: 'Switch to English',
            // Replace " Fr.html" or "%20Fr.html" with ".html"
            targetPage: currentPage.replace(/(\s|%20)Fr\.html/i, '.html')
          }
        : {
            flagSrc: './rsc/france.png',
            flagAlt: 'Passer en français',
            // Add "%20Fr.html" for french version
            targetPage: currentPage === 'index.html' ? 'index%20Fr.html' : currentPage.replace('.html', '%20Fr.html')
          };

    // 4. Update both desktop and mobile flags
    ['desktop', 'mobile'].forEach(type => {
        const flagImg = document.getElementById(`lang-flag-${type}`);
        const flagLink = document.getElementById(`lang-link-${type}`);

        if (flagImg && flagLink) {
            flagImg.src = langSettings.flagSrc;
            flagImg.alt = langSettings.flagAlt;
            flagLink.href = langSettings.targetPage;
        }
    });
});
