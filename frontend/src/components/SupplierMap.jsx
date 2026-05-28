'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// HCMC Warehouse default center
const WAREHOUSE_COORDS = [10.762622, 106.660172];

// Fix Leaflet default icon paths in Next.js/Webpack
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

// Haversine formula to calculate distance in KM
const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; 
  return Number(d.toFixed(1));
};

// Map click handler sub-component for selection mode
function MapClickHandler({ onMapClick, active }) {
  useMapEvents({
    click(e) {
      if (!active) return;
      const { lat, lng } = e.latlng;
      const distance = calculateHaversineDistance(WAREHOUSE_COORDS[0], WAREHOUSE_COORDS[1], lat, lng);
      onMapClick(lat, lng, distance);
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

  // Recenter map on selected items
  useEffect(() => {
    if (mapRef.current) {
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
              <p className="font-bold text-xs">Tổng kho Bách Hóa Xanh</p>
              <p className="text-[10px] text-slate-500">Trung tâm phân phối logistics chính</p>
            </div>
          </Popup>
        </Marker>

        {/* View Mode: Show all suppliers markers */}
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
                    <p className="text-[10px] text-slate-600">Khoảng cách: {sup.distance_km || 0} km</p>
                  </div>
                </Popup>
              </Marker>
              
              {/* Draw logistics route polyline if selected */}
              {isSelected && (
                <Polyline 
                  positions={[WAREHOUSE_COORDS, position]} 
                  color="#8b5cf6" 
                  dashArray="6, 6"
                  weight={3}
                />
              )}
            </div>
          );
        })}

        {/* Selection/Edit Mode: Show active placement marker */}
        {mode === 'select' && selectedLat && selectedLng && (
          <>
            <Marker position={[selectedLat, selectedLng]} icon={selectedIcon}>
              <Popup>
                <div className="text-slate-900 font-sans text-xs">
                  <p className="font-semibold">Vị trí nhà cung cấp</p>
                  <p className="text-[10px] text-slate-500">
                    Khoảng cách đến kho: {calculateHaversineDistance(WAREHOUSE_COORDS[0], WAREHOUSE_COORDS[1], selectedLat, selectedLng)} km
                  </p>
                </div>
              </Popup>
            </Marker>
            
            <Polyline 
              positions={[WAREHOUSE_COORDS, [selectedLat, selectedLng]]} 
              color="#8b5cf6" 
              dashArray="6, 6"
              weight={3}
            />
          </>
        )}

        {/* Map Click Listener */}
        <MapClickHandler 
          active={mode === 'select'} 
          onMapClick={(lat, lng, dist) => {
            if (onPositionSelected) {
              onPositionSelected(lat, lng, dist);
            }
          }}
        />
      </MapContainer>
      
      {mode === 'select' && (
        <div className="absolute bottom-4 left-4 z-[400] rounded-lg bg-slate-900/90 border border-slate-800 p-2.5 text-xs text-slate-300 max-w-[240px] shadow-lg backdrop-blur">
          <p className="font-semibold text-violet-400 mb-1">📍 Cách ghim tọa độ:</p>
          <p className="text-slate-400 leading-4">
            Click vào bất kỳ điểm nào trên bản đồ để xác định vị trí nhà cung cấp. Hệ thống sẽ tự động tính khoảng cách km đến tổng kho.
          </p>
        </div>
      )}
    </div>
  );
}
