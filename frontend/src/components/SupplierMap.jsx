'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Warehouse position: District 10, HCMC (Cao Thắng / 3 Tháng 2 intersection)
const WAREHOUSE_COORDS = [10.762622, 106.660172];

if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Custom icons
const createIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const warehouseIcon = createIcon('blue');
const supplierIcon = createIcon('red');
const selectedIcon = createIcon('violet');

// Haversine formula fallback
const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Number((R * c).toFixed(1));
};

// Map click handler for select mode with OSRM routing
function MapClickHandler({ onMapClick, active }) {
  useMapEvents({
    async click(e) {
      if (!active) return;
      const { lat, lng } = e.latlng;
      
      try {
        // Query OSRM for actual road route & driving distance
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${WAREHOUSE_COORDS[1]},${WAREHOUSE_COORDS[0]};${lng},${lat}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        
        let distance = 0;
        let routeCoords = [[WAREHOUSE_COORDS[0], WAREHOUSE_COORDS[1]], [lat, lng]];

        if (data.routes && data.routes.length > 0) {
          distance = Number((data.routes[0].distance / 1000).toFixed(1));
          routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        } else {
          distance = calculateHaversineDistance(WAREHOUSE_COORDS[0], WAREHOUSE_COORDS[1], lat, lng);
        }

        onMapClick(lat, lng, distance, routeCoords);
      } catch (err) {
        console.error('OSRM API error:', err);
        const distance = calculateHaversineDistance(WAREHOUSE_COORDS[0], WAREHOUSE_COORDS[1], lat, lng);
        onMapClick(lat, lng, distance, [WAREHOUSE_COORDS, [lat, lng]]);
      }
    },
  });
  return null;
}

export default function SupplierMap({ 
  mode = 'view', 
  suppliers = [], 
  selectedSupplier = null, 
  selectedLat = null, 
  selectedLng = null,
  onPositionSelected = null 
}) {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeRoute, setActiveRoute] = useState([]);

  // Fetch OSRM route for active supplier in view mode
  useEffect(() => {
    if (mode === 'view' && selectedSupplier && selectedSupplier.latitude && selectedSupplier.longitude) {
      const fetchRoute = async () => {
        try {
          const res = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${WAREHOUSE_COORDS[1]},${WAREHOUSE_COORDS[0]};${selectedSupplier.longitude},${selectedSupplier.latitude}?overview=full&geometries=geojson`
          );
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            const coords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setActiveRoute(coords);
          } else {
            setActiveRoute([WAREHOUSE_COORDS, [selectedSupplier.latitude, selectedSupplier.longitude]]);
          }
        } catch (e) {
          console.warn('OSRM routing fetch failed, falling back to straight line:', e);
          setActiveRoute([WAREHOUSE_COORDS, [selectedSupplier.latitude, selectedSupplier.longitude]]);
        }
      };
      fetchRoute();
    } else {
      setActiveRoute([]);
    }
  }, [selectedSupplier, mode]);

  // Handle auto centering of the map view
  useEffect(() => {
    if (mapRef.current && mapReady) {
      const map = mapRef.current;
      if (mode === 'select' && selectedLat && selectedLng) {
        map.setView([selectedLat, selectedLng], 13);
      } else if (selectedSupplier && selectedSupplier.latitude && selectedSupplier.longitude) {
        map.setView([selectedSupplier.latitude, selectedSupplier.longitude], 12);
      } else {
        map.setView(WAREHOUSE_COORDS, 11);
      }
    }
  }, [selectedSupplier, selectedLat, selectedLng, mode, mapReady]);

  // Recalculate route for select mode when coordinates change (e.g. from address search)
  useEffect(() => {
    if (mode === 'select' && selectedLat && selectedLng) {
      const fetchSelectRoute = async () => {
        try {
          const res = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${WAREHOUSE_COORDS[1]},${WAREHOUSE_COORDS[0]};${selectedLng},${selectedLat}?overview=full&geometries=geojson`
          );
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            const coords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setActiveRoute(coords);
          } else {
            setActiveRoute([WAREHOUSE_COORDS, [selectedLat, selectedLng]]);
          }
        } catch (e) {
          setActiveRoute([WAREHOUSE_COORDS, [selectedLat, selectedLng]]);
        }
      };
      fetchSelectRoute();
    }
  }, [selectedLat, selectedLng, mode]);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950/20 relative z-10">
      <MapContainer 
        center={WAREHOUSE_COORDS} 
        zoom={11} 
        scrollWheelZoom={true}
        className="h-full w-full"
        ref={mapRef}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Central Warehouse Marker */}
        <Marker position={WAREHOUSE_COORDS} icon={warehouseIcon}>
          <Popup>
            <div className="text-slate-900 font-sans p-1">
              <p className="font-bold text-xs">🚗 Tổng kho Bách Hóa Xanh</p>
              <p className="text-[10px] text-slate-500">Quận 10, Thành phố Hồ Chí Minh</p>
              <p className="text-[9px] text-slate-400 font-mono">10.762622, 106.660172</p>
            </div>
          </Popup>
        </Marker>

        {/* View Mode: Render multiple markers and routing polylines */}
        {mode === 'view' && suppliers.map(sup => {
          if (!sup.latitude || !sup.longitude) return null;
          const isSelected = selectedSupplier && selectedSupplier.id === sup.id;
          const position = [sup.latitude, sup.longitude];
          
          return (
            <div key={sup.id}>
              <Marker 
                position={position} 
                icon={isSelected ? selectedIcon : supplierIcon}
              >
                <Popup>
                  <div className="text-slate-900 font-sans p-1">
                    <p className="font-bold text-xs">{sup.name}</p>
                    <p className="text-[10px] text-slate-600">Đại diện: {sup.contact_person || '—'}</p>
                    <p className="text-[10px] text-indigo-600 font-semibold">Cự ly thực tế: {sup.distance_km || 0} km</p>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}

        {/* Render active route if available */}
        {activeRoute.length > 0 && (
          <Polyline 
            positions={activeRoute} 
            color="#8b5cf6" 
            weight={4}
            opacity={0.8}
            dashArray="1, 8" // beautiful dot sequence for animated feel
            lineCap="round"
          />
        )}

        {/* Selection/Edit Mode: Renders placement marker */}
        {mode === 'select' && selectedLat && selectedLng && (
          <Marker position={[selectedLat, selectedLng]} icon={selectedIcon}>
            <Popup>
              <div className="text-slate-900 font-sans text-xs">
                <p className="font-semibold">Vị trí đối tác</p>
                <p className="text-[9px] text-slate-500 font-mono">{selectedLat.toFixed(5)}, {selectedLng.toFixed(5)}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Map Click Listener */}
        <MapClickHandler 
          active={mode === 'select'} 
          onMapClick={(lat, lng, dist, routeCoords) => {
            setActiveRoute(routeCoords);
            if (onPositionSelected) {
              onPositionSelected(lat, lng, dist);
            }
          }}
        />
      </MapContainer>
      
      <div className="absolute top-4 left-12 z-[400] rounded-lg bg-slate-950/80 border border-slate-800/80 p-2 text-[10px] text-slate-400 backdrop-blur shadow">
        🏢 Kho: Q.10, TP.HCM
      </div>

      {mode === 'select' && (
        <div className="absolute bottom-4 left-4 z-[400] rounded-lg bg-slate-900/95 border border-slate-800 p-2.5 text-xs text-slate-300 max-w-[240px] shadow-lg backdrop-blur">
          <p className="font-semibold text-violet-400 mb-1">📍 Cách ghim tọa độ:</p>
          <p className="text-slate-400 leading-4">
            Click vào bản đồ hoặc điền địa chỉ rồi bấm <b>"Định vị"</b>. Tuyến đường thực tế và khoảng cách đường đi (km) sẽ được tính toán qua OSRM.
          </p>
        </div>
      )}
    </div>
  );
}
