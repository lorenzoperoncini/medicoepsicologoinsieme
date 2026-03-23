import { slideBodyDown } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [promoTitle, promoDescription] = [...block.children].map((c) => c.firstElementChild);
  let visibility; let isVisibile;
  if (window.location.pathname === '/eventi') {
    visibility = 'hidden';
    isVisibile = false;
  } else {
    visibility = 'show';
    isVisibile = true;
  }
  block.innerHTML = `<div id="promo-banner" class="${visibility}">
  <p class="promo-title">
    ${promoTitle ? promoTitle.innerText : ''}
  </p>
  ${promoDescription ? promoDescription.innerHTML : ''}
  <button class="promo-banner-dismiss" aria-label="Chiudi banner promozionale">&#x2715;</button>
</div>`;

  const banner = block.querySelector('#promo-banner');
  const dismissBtn = block.querySelector('.promo-banner-dismiss');
  slideBodyDown(isVisibile);

  dismissBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    slideBodyDown(false);
  });
}
