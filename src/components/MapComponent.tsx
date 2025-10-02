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
  const [mapboxToken, setMapboxToken] = useState('');
  const [useDummyData, setUseDummyData] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.2090, 28.6139], // New Delhi coordinates
      zoom: 11,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add CO₂ data points
    map.current.on('load', () => {
      // Add CO₂ heatmap layer
      if (co2Data.length > 0) {
        addCO2Layer();
      }

      // Add sample CO₂ zones if no data provided
      if (co2Data.length === 0) {
        addSampleCO2Zones();
      }

      // Add interventions if provided
      if (interventions.length > 0) {
        addInterventions();
      }
    });

    // Click handler for placing interventions
    if (onInterventionPlace) {
      map.current.on('click', (e) => {
        onInterventionPlace(e.lngLat.lat, e.lngLat.lng);
      });
    }
  };

  const addCO2Layer = () => {
    if (!map.current) return;

    co2Data.forEach((point, index) => {
      const color = getColorForStatus(point.status);
      
      // Add circle layer for each CO₂ data point
      map.current!.addSource(`co2-${index}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            level: point.level,
            status: point.status
          },
          geometry: {
            type: 'Point',
            coordinates: [point.lng, point.lat]
          }
        }
      });

      map.current!.addLayer({
        id: `co2-${index}`,
        type: 'circle',
        source: `co2-${index}`,
        paint: {
          'circle-radius': 50,
          'circle-color': color,
          'circle-opacity': 0.6,
          'circle-blur': 0.5
        }
      });

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">CO₂ Level: ${point.level} ppm</h3>
            <p class="text-sm text-muted-foreground">Status: ${point.status}</p>
          </div>
        `);

      new mapboxgl.Marker({ color })
        .setLngLat([point.lng, point.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  const addSampleCO2Zones = () => {
    if (!map.current) return;

    const sampleZones = [
      { lng: 77.2090, lat: 28.6139, level: 450, status: 'hazardous' as const },
      { lng: 77.1890, lat: 28.6339, level: 380, status: 'unhealthy' as const },
      { lng: 77.2290, lat: 28.5939, level: 320, status: 'moderate' as const },
      { lng: 77.2490, lat: 28.6239, level: 280, status: 'safe' as const },
      { lng: 77.1690, lat: 28.6539, level: 420, status: 'hazardous' as const },
    ];

    sampleZones.forEach((zone, index) => {
      const color = getColorForStatus(zone.status);
      
      map.current!.addSource(`zone-${index}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { level: zone.level, status: zone.status },
          geometry: {
            type: 'Point',
            coordinates: [zone.lng, zone.lat]
          }
        }
      });

      map.current!.addLayer({
        id: `zone-${index}`,
        type: 'circle',
        source: `zone-${index}`,
        paint: {
          'circle-radius': 60,
          'circle-color': color,
          'circle-opacity': 0.6,
          'circle-blur': 0.8
        }
      });

      // Add marker with popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-3">
            <h3 class="font-semibold text-lg">CO₂ Level: ${zone.level} ppm</h3>
            <p class="text-sm capitalize">Status: <span class="font-medium">${zone.status}</span></p>
            <p class="text-xs text-muted-foreground mt-1">Zone ${index + 1}</p>
          </div>
        `);

      new mapboxgl.Marker({
        color: color,
        scale: 0.8
      })
        .setLngLat([zone.lng, zone.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  const addInterventions = () => {
    if (!map.current) return;

    interventions.forEach((intervention) => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${intervention.type}</h3>
            <p class="text-sm">Efficiency: ${intervention.efficiency}%</p>
          </div>
        `);

      new mapboxgl.Marker({ color: '#10b981' })
        .setLngLat([intervention.lng, intervention.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
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

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setUseDummyData(false);
      initializeMap(mapboxToken);
    }
  };

  const handleDummyMarkerClick = (location: any) => {
    setSelectedLocation(location);
  };

  const handleDummyMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onInterventionPlace && showInterventions) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Convert pixel coordinates to approximate lat/lng (dummy calculation)
      const lng = 72 + (x / rect.width) * 15;
      const lat = 30 - (y / rect.height) * 20;
      onInterventionPlace(lat, lng);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  // Render dummy map with static markers
  if (useDummyData) {
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

    // Calculate bounds for centering
    const lats = allMarkers.map(m => m.lat);
    const lngs = allMarkers.map(m => m.lng);
    const minLat = Math.min(...lats, 10);
    const maxLat = Math.max(...lats, 30);
    const minLng = Math.min(...lngs, 70);
    const maxLng = Math.max(...lngs, 85);

    return (
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-card bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
        {/* Map Background */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] cursor-pointer"
          onClick={handleDummyMapClick}
        >
          {/* Grid pattern for map feel */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />

          {/* Markers */}
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
                  handleDummyMarkerClick(marker);
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
          <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-elevated p-4 max-w-xs z-10">
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
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

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-elevated p-3">
          <p className="text-xs font-medium flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Demo Mode - Using dummy data
          </p>
          {showInterventions && (
            <p className="text-xs text-muted-foreground mt-1">Click map to place interventions</p>
          )}
        </div>

        {/* Optional: Add Mapbox button */}
        <div className="absolute bottom-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setUseDummyData(false)}
            className="text-xs"
          >
            Use Real Map
          </Button>
        </div>
      </div>
    );
  }

  // Show token input if not using dummy data
  if (!map.current) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <CardContent className="max-w-md mx-auto text-center space-y-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Mapbox Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox access token for an interactive map experience.
          </p>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Get your free token at{" "}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Input
              placeholder="Enter Mapbox access token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTokenSubmit()}
            />
            <Button 
              onClick={handleTokenSubmit}
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Initialize Map
            </Button>
            <Button 
              variant="outline"
              onClick={() => setUseDummyData(true)}
              className="w-full"
            >
              Back to Demo Mode
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-card">
      <div ref={mapContainer} className="absolute inset-0" />
      {showInterventions && (
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-elevated">
          <p className="text-sm font-medium">Click on the map to place interventions</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;