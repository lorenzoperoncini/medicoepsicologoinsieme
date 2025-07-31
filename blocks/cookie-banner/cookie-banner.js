export default async function decorate(block) {
  const [cookieText, linkText] = [...block.children].map((c) => c.firstElementChild);
  block.innerHTML = `<div id="cookie-banner" style="display: none">
  <p>
    ${cookieText ? cookieText.innerHTML : 'Questo sito utilizza i cookie per migliorare la tua esperienza. Continuando a navigare, accetti l\'uso dei cookie.'}
    <a href="/cookie-policy.html" target="_blank">${linkText ? linkText.innerHTML : 'Leggi di più sui cookie'}</a>
  </p>
  <button id="accept-cookies">Accetta</button>
</div>`;
  // Check if user already accepted cookies
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    document.getElementById('cookie-banner').style.display = 'none';
  }

  // Handle acceptance
  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
  });
}
