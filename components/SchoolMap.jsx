import { useEffect, useRef } from 'react';

// Component that uses Leaflet (browser only)
function SchoolMapClient({ school }) {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!school || !school.location || !mapContainer.current) return;

    // Import Leaflet only on client-side
    const L = require('leaflet');

    const { coordinates } = school.location;
    const [lng, lat] = coordinates;

    // Initialize map only if not already initialized
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([lat, lng], 15);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);

      // Add marker for school
      const marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDQwIj48cGF0aCBmaWxsPSIjNjY3ZWVhIiBkPSJNMTIgMEMxNi40MTggMCAyMCA0LjAzNyAyMCA4YzAgMi42NjktMS42NDMgNS45MzktNC41ODMgMTAuMDk2TDEyIDQwIC40ODMgMTguMDk2Qzg2NDMgMTMuOTM5IDcgMTAuNjY5IDcgOGM0LTMuOTYzIDguNTgyLTggMTItOHptMCA1LjVhMi41IDIuNSAwIDEgMSAwIDUgMi41IDIuNSAwIDAgMSAwLTV6Ii8+PC9zdmc+',
          iconSize: [24, 40],
          iconAnchor: [12, 40],
          popupAnchor: [0, -40],
        }),
      }).addTo(mapInstance.current);

      // Add popup
      marker.bindPopup(`
        <div style="font-size: 14px;">
          <strong>${school.name}</strong><br/>
          ${school.address}<br/>
          <a href="tel:${school.phone}" style="color: #667eea;">${school.phone}</a>
        </div>
      `);

      marker.openPopup();
    }

    return () => {
      // Cleanup is optional for Leaflet
    };
  }, [school]);

  if (!school || !school.location) {
    return (
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <p className="text-gray-500">Ubicación no disponible</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className="w-full h-96 rounded-lg shadow-md"
      style={{ zIndex: 1 }}
    />
  );
}

export default SchoolMapClient;