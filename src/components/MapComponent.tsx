import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, AlertTriangle } from "lucide-react";

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
  const [showTokenInput, setShowTokenInput] = useState(true);

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
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <CardContent className="max-w-md mx-auto text-center space-y-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Mapbox Configuration Required</CardTitle>
          <p className="text-sm text-muted-foreground">
            Please enter your Mapbox access token to display the interactive map.
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