async function loadLeaflet() {
  // Load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);

  // Load JS
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function initMap(mapId, mapEntries) {
  await loadLeaflet();

  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  const zoom = isDesktop ? 10 : 8.5;
  const map = window.L.map(mapId).setView([45.4363402, 9.4595803], zoom);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  mapEntries.forEach(({ coordinates, name = '', address = '' }) => {
    if (!coordinates) return;

    const [lat, lon] = coordinates.split('/').map(Number);
    window.L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<strong>${name}</strong><br>${address}`);
  });
}

export default async function decorate(block) {
  const mapEntries = [...block.children].map((child) => {
    child.classList.add('hidden');
    const paragraphs = [...child.querySelector('div')?.children || []].filter((el) => el.tagName === 'P');
    const [name, address, coordinates] = paragraphs.map((p) => p.textContent);
    return { name, address, coordinates };
  });

  const mapDiv = document.createElement('div');
  mapDiv.className = 'mappa';
  mapDiv.id = 'mappa';
  block.append(mapDiv);

  await initMap('mappa', mapEntries);
}
