export default async function decorate(block) {
  const [promoTitle, promoDescription] = [...block.children].map((c) => c.firstElementChild);
  const visibility = window.location.pathname === '/eventi' ? 'hidden' : 'show';
  block.innerHTML = `<div id="promo-banner" class="${visibility}">
  <p class="promo-title">
    ${promoTitle ? promoTitle.innerText : ''}
  </p>
  ${promoDescription ? promoDescription.innerHTML : ''}
</div>`;
}
