import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import apiClient from '../../utils/apiClient';
import 'leaflet/dist/leaflet.css';

const redIcon = new L.Icon({
  iconUrl: 'images/CrimeZone.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
  shadowSize: [0, 0],
});

// Component to recenter the map when user location updates
function RecenterMap({ lat, lng, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], zoom);
    }
  }, [lat, lng, zoom, map]);
  return null;
}

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  map.on('click', (e) => {
    const coords = e.latlng;
    setPosition(coords);
    onSelect(coords);
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapComponent({ onSelect }) {
  const [locations, setLocations] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    apiClient.get('/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err)
    );
  }, []);

  const mapCenter = [34.020882, -6.841650];

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {userPosition && <RecenterMap lat={userPosition[0]} lng={userPosition[1]} zoom={15} />}
      {userPosition && (
        <Marker position={userPosition}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]} icon={redIcon}>
          <Popup>
            <div>
              <h3>{loc.title || 'No title'}</h3>
              <p>{loc.description || 'No description available'}</p>
              <p><b>Lat:</b> {loc.lat}, <b>Lng:</b> {loc.lng}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
}
