// MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import { useState, useEffect } from 'react';
import L from 'leaflet';
import apiClient from '../../utils/apiClient';
import 'leaflet/dist/leaflet.css';

// Custom red icon
const redIcon = new L.Icon({
  iconUrl: 'images/CrimeZone.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25], 
  popupAnchor: [0, -25],
  shadowSize: [0, 0],
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setPosition(coords);
      onSelect(coords);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapComponent({ onSelect }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from backend
    apiClient.get('/locations')
      .then(res => {
        console.log("Data from API:", res.data);
        setLocations(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (coords) => {
    console.log('Selected coordinates:', coords);
    if (onSelect) onSelect(coords);

  };

  return (
  <MapContainer center={[34.020882, -6.841650]} zoom={13} style={{ height: '500px', width: '100%' }}>
    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />

    <LocationMarker onSelect={handleSelect} />

    {locations.map((loc, index) => (
      <Marker 
        key={index} 
        position={[loc.lat, loc.lng]} 
        icon={redIcon} 
      >
        <Popup>
          <div>
            <h3>{loc.title || "No title"}</h3>
            <p>{loc.description || "No description available"}</p>
            <p><b>Lat:</b> {loc.lat}, <b>Lng:</b> {loc.lng}</p>
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

}
