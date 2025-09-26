import { useState } from "react";
import Navigation from "@/components/Navigation";
import KPICard from "@/components/KPICard";
import MapComponent from "@/components/MapComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Wind, 
  Thermometer, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Calendar,
  MapPin,
  Filter
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("today");
  const [selectedZone, setSelectedZone] = useState("all");

  // Sample data
  const co2TrendData = [
    { time: '00:00', co2: 380, target: 350 },
    { time: '04:00', co2: 385, target: 350 },
    { time: '08:00', co2: 420, target: 350 },
    { time: '12:00', co2: 450, target: 350 },
    { time: '16:00', co2: 435, target: 350 },
    { time: '20:00', co2: 410, target: 350 },
    { time: '24:00', co2: 395, target: 350 },
  ];

  const zoneData = [
    { zone: 'Zone A', co2: 450, status: 'hazardous' },
    { zone: 'Zone B', co2: 380, status: 'unhealthy' },
    { zone: 'Zone C', co2: 320, status: 'moderate' },
    { zone: 'Zone D', co2: 280, status: 'safe' },
    { zone: 'Zone E', co2: 420, status: 'hazardous' },
  ];

  const co2MapData = [
    { lat: 28.6139, lng: 77.2090, level: 450, status: 'hazardous' as const },
    { lat: 28.6339, lng: 77.1890, level: 380, status: 'unhealthy' as const },
    { lat: 28.5939, lng: 77.2290, level: 320, status: 'moderate' as const },
    { lat: 28.6239, lng: 77.2490, level: 280, status: 'safe' as const },
    { lat: 28.6539, lng: 77.1690, level: 420, status: 'hazardous' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">CO₂ Management Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time monitoring and analytics for urban air quality</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-40">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="zone-a">Zone A</SelectItem>
                <SelectItem value="zone-b">Zone B</SelectItem>
                <SelectItem value="zone-c">Zone C</SelectItem>
                <SelectItem value="zone-d">Zone D</SelectItem>
                <SelectItem value="zone-e">Zone E</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Current Avg. CO₂"
            value="410 ppm"
            change="+5.2%"
            changeType="negative"
            icon={Activity}
            description="Above WHO safe limit"
            variant="co2-unhealthy"
          />
          <KPICard
            title="% Above WHO Limit"
            value="68%"
            change="-2.1%"
            changeType="positive"
            icon={AlertTriangle}
            description="of monitored zones"
            variant="co2-hazardous"
          />
          <KPICard
            title="Hotspots Detected"
            value="12"
            change="+3"
            changeType="negative"
            icon={MapPin}
            description="critical zones identified"
            variant="co2-hazardous"
          />
          <KPICard
            title="Weather Conditions"
            value="22°C"
            change="5 km/h NE"
            changeType="neutral"
            icon={Wind}
            description="Moderate wind, clear sky"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CO₂ Heatmap */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      City CO₂ Heatmap
                    </CardTitle>
                    <CardDescription>
                      Real-time emission levels across monitoring zones
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <MapComponent co2Data={co2MapData} />
                
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-co2-safe rounded-full" />
                    <span className="text-sm">Safe (&lt;300 ppm)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-co2-moderate rounded-full" />
                    <span className="text-sm">Moderate (300-350 ppm)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-co2-unhealthy rounded-full" />
                    <span className="text-sm">Unhealthy (350-400 ppm)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-co2-hazardous rounded-full" />
                    <span className="text-sm">Hazardous (&gt;400 ppm)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Zone Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  Zone Status
                </CardTitle>
                <CardDescription>
                  Current CO₂ levels by monitoring zone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {zoneData.map((zone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        zone.status === 'safe' ? 'bg-co2-safe' :
                        zone.status === 'moderate' ? 'bg-co2-moderate' :
                        zone.status === 'unhealthy' ? 'bg-co2-unhealthy' :
                        'bg-co2-hazardous'
                      }`} />
                      <span className="font-medium">{zone.zone}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{zone.co2} ppm</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          zone.status === 'safe' ? 'text-co2-safe border-co2-safe/20' :
                          zone.status === 'moderate' ? 'text-co2-moderate border-co2-moderate/20' :
                          zone.status === 'unhealthy' ? 'text-co2-unhealthy border-co2-unhealthy/20' :
                          'text-co2-hazardous border-co2-hazardous/20'
                        }`}
                      >
                        {zone.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="w-5 h-5 mr-2 text-primary" />
                  Weather Impact
                </CardTitle>
                <CardDescription>
                  Current conditions affecting dispersion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Thermometer className="w-6 h-6 mx-auto text-primary mb-2" />
                    <div className="font-semibold">22°C</div>
                    <div className="text-xs text-muted-foreground">Temperature</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Wind className="w-6 h-6 mx-auto text-primary mb-2" />
                    <div className="font-semibold">5 km/h</div>
                    <div className="text-xs text-muted-foreground">Wind Speed</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                  <strong>Impact:</strong> Moderate wind conditions are helping with CO₂ dispersion. Higher temperatures may increase emission rates from vehicles.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* CO₂ Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                CO₂ Trend Analysis
              </CardTitle>
              <CardDescription>
                24-hour CO₂ level progression vs. target
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={co2TrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="co2" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--co2-safe))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Zone Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-primary" />
                Zone Comparison
              </CardTitle>
              <CardDescription>
                Current CO₂ levels across all monitoring zones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={zoneData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="zone" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar 
                    dataKey="co2" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;