import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, AlertTriangle, Navigation } from "lucide-react";
import dummyLocations from "@/data/dummyLocations.json";

interface MapComponentProps {
  showInterventions?: boolean;
  interventions?: Array<{
    id: string;
    type: string;
    lat: number;
    lng: number;
    efficiency: number;
  }>;
  onInterventionPlace?: (lat: number, lng: number) => void;
  co2Data?: Array<{
    lat: number;
    lng: number;
    level: number;
    status: 'safe' | 'moderate' | 'unhealthy' | 'hazardous';
  }>;
}

const MapComponent = ({ 
  showInterventions = false, 
  interventions = [], 
  onInterventionPlace,
  co2Data = []
}: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // Simulate API data fetch with dummy data
  const fetchLocationData = () => {
    // In production, this would be: return fetch('/api/locations').then(res => res.json())
    return Promise.resolve(dummyLocations);
  };


  const getColorForStatus = (status: string) => {
    switch (status) {
      case 'safe': return '#10b981';
      case 'moderate': return '#f59e0b';
      case 'unhealthy': return '#f97316';
      case 'hazardous': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onInterventionPlace && showInterventions) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Simulate coordinate calculation from click position
      const lng = 72 + (x / rect.width) * 15;
      const lat = 30 - (y / rect.height) * 20;
      onInterventionPlace(lat, lng);
    }
  };

  useEffect(() => {
    // Simulate initial data fetch
    fetchLocationData();
  }, []);

  // Prepare all markers from various data sources
  const allMarkers = [
    ...dummyLocations.map(loc => ({ ...loc, type: 'location' })),
    ...co2Data.map((co2, idx) => ({ 
      id: `co2-${idx}`, 
      name: `CO₂ Zone ${idx + 1}`,
      lat: co2.lat, 
      lng: co2.lng, 
      level: co2.level,
      status: co2.status,
      type: 'co2' 
    })),
    ...interventions.map(int => ({ ...int, type: 'intervention' }))
  ];

  // Calculate map bounds based on all markers
  const lats = allMarkers.map(m => m.lat);
  const lngs = allMarkers.map(m => m.lng);
  const minLat = Math.min(...lats, 10);
  const maxLat = Math.max(...lats, 30);
  const minLng = Math.min(...lngs, 70);
  const maxLng = Math.max(...lngs, 85);
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  // Generate static map URL using OpenStreetMap tiles
  const zoom = 11;
  const mapWidth = 1200;
  const mapHeight = 500;
  const staticMapUrl = `https://tile.openstreetmap.org/${zoom}/${Math.floor((centerLng + 180) / 360 * Math.pow(2, zoom))}/${Math.floor((1 - Math.log(Math.tan(centerLat * Math.PI / 180) + 1 / Math.cos(centerLat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))}.png`;

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-card">
      {/* Static Map Background */}
      <div 
        className="absolute inset-0 cursor-pointer bg-cover bg-center"
        style={{
          backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${centerLng},${centerLat},${zoom},0/${mapWidth}x${mapHeight}?access_token=pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTlxenBxNjYwMGgzMnBzOW85Y3J0YTRpIn0.VTK8SY2EE5EY1234567890')`,
          backgroundColor: '#f0f4f8'
        }}
        onClick={handleMapClick}
      >
        {/* Fallback pattern if image doesn't load */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        {/* Interactive Markers */}
        {allMarkers.map((marker, idx) => {
          // Convert lat/lng to pixel position
          const x = ((marker.lng - minLng) / (maxLng - minLng)) * 100;
          const y = ((maxLat - marker.lat) / (maxLat - minLat)) * 100;

          const markerColor = marker.type === 'co2' 
            ? getColorForStatus((marker as any).status || 'safe')
            : marker.type === 'intervention'
            ? '#10b981'
            : '#3b82f6';

          return (
            <div
              key={marker.id || idx}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-110"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                handleMarkerClick(marker);
              }}
            >
              <div className="relative">
                <MapPin 
                  className="w-8 h-8 drop-shadow-lg" 
                  style={{ color: markerColor }}
                  fill={markerColor}
                />
                {marker.type === 'co2' && (
                  <div 
                    className="absolute -z-10 rounded-full blur-xl animate-pulse"
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: markerColor,
                      opacity: 0.3,
                      top: '-15px',
                      left: '-26px'
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Location Details Popup */}
      {selectedLocation && (
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-elevated p-4 max-w-xs z-10 animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
            {selectedLocation.type === 'location' && (
              <>
                <p className="text-sm text-muted-foreground">{selectedLocation.city}</p>
                <p className="text-xs text-muted-foreground">{selectedLocation.address}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {selectedLocation.category}
                  </span>
                </div>
                <p className="text-sm mt-2">{selectedLocation.description}</p>
              </>
            )}
            {selectedLocation.type === 'co2' && (
              <>
                <p className="text-sm">
                  <span className="font-medium">Level:</span> {selectedLocation.level} ppm
                </p>
                <p className="text-sm capitalize">
                  <span className="font-medium">Status:</span> {selectedLocation.status}
                </p>
              </>
            )}
            {selectedLocation.type === 'intervention' && (
              <p className="text-sm">
                <span className="font-medium">Efficiency:</span> {selectedLocation.efficiency}%
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              📍 {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </p>
          </div>
        </div>
      )}
      {/* Interaction Instructions */}
      {showInterventions && (
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-elevated px-3 py-2">
          <p className="text-xs font-medium flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Click map to place interventions
          </p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;