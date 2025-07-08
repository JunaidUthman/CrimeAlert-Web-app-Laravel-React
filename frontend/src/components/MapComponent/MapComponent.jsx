// MapComponent.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix icon issue in some setups
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setPosition(coords);
      onSelect(coords); // Send coordinates to parent or backend
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapComponent() {
  const handleSelect = (coords) => {
    console.log('Selected coordinates:', coords); // Save to DB later
  };

  return (
    <MapContainer center={[34.020882, -6.841650]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker onSelect={handleSelect} />
    </MapContainer>
  );
}
