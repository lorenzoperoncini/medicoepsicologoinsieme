export default async function decorate(block) {
  const [cookieText, linkText] = [...block.children].map((c) => c.firstElementChild);
  block.innerHTML = `<div id="cookie-banner" class="hidden">
  <p>
    ${cookieText ? cookieText.innerText : 'Questo sito utilizza i cookie per migliorare la tua esperienza. Continuando a navigare, accetti l\'uso dei cookie.'}
    <a href="/cookie-policy" target="_blank">${linkText ? linkText.innerText : 'Leggi di più sui cookie'}</a>
  </p>
  <button id="accept-cookies">Accetta</button>
</div>`;
}

setTimeout(() => {
  const banner = document.getElementById('cookie-banner');

  if (localStorage.getItem('cookiesAccepted') !== 'true') {
    // Show the banner with fade-in
    banner.classList.remove('hidden');
    setTimeout(() => {
      banner.classList.add('show');
    }, 10); // slight delay to trigger transition
  }

  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    // Fade-out effect
    banner.classList.remove('show');
    setTimeout(() => {
      banner.classList.add('hidden');
    }, 500); // match the transition duration
  });
}, 3000);
