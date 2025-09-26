import { useState } from "react";
import Navigation from "@/components/Navigation";
import MapComponent from "@/components/MapComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Wind, 
  Thermometer,
  Activity,
  MapPin,
  Settings,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Simulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [windSpeed, setWindSpeed] = useState([5]);
  const [temperature, setTemperature] = useState([22]);
  const [emissionIntensity, setEmissionIntensity] = useState([75]);
  const { toast } = useToast();

  const runSimulation = () => {
    setIsRunning(true);
    setSimulationProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          toast({
            title: "Simulation Complete",
            description: "CO₂ dispersion simulation has finished successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    toast({
      title: "Simulation Started",
      description: "Running CO₂ dispersion analysis with current parameters.",
    });
  };

  const pauseSimulation = () => {
    setIsRunning(false);
    toast({
      title: "Simulation Paused",
      description: "You can resume or reset the simulation.",
    });
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setSimulationProgress(0);
    setWindSpeed([5]);
    setTemperature([22]);
    setEmissionIntensity([75]);
    toast({
      title: "Simulation Reset",
      description: "All parameters have been reset to default values.",
    });
  };

  const co2SimulationData = [
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
            <h1 className="text-3xl font-bold text-foreground">CO₂ Dispersion Simulation</h1>
            <p className="text-muted-foreground mt-1">Model and predict CO₂ emission patterns with weather influence</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={isRunning ? pauseSimulation : runSimulation}
              disabled={simulationProgress > 0 && simulationProgress < 100}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? "Pause" : "Run Simulation"}
            </Button>
            <Button variant="outline" onClick={resetSimulation}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Simulation Status */}
        {simulationProgress > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Simulation Progress</span>
                <span className="text-sm text-muted-foreground">{simulationProgress}%</span>
              </div>
              <Progress value={simulationProgress} className="h-2" />
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                {isRunning ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-pulse" />
                    Running dispersion analysis...
                  </>
                ) : simulationProgress === 100 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 text-success" />
                    Simulation completed successfully
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Simulation paused
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Control Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-primary" />
                  Simulation Parameters
                </CardTitle>
                <CardDescription>
                  Adjust environmental conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Wind Speed */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center">
                      <Wind className="w-4 h-4 mr-2 text-primary" />
                      Wind Speed
                    </label>
                    <Badge variant="outline">{windSpeed[0]} km/h</Badge>
                  </div>
                  <Slider
                    value={windSpeed}
                    onValueChange={setWindSpeed}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 km/h</span>
                    <span>50 km/h</span>
                  </div>
                </div>

                {/* Temperature */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center">
                      <Thermometer className="w-4 h-4 mr-2 text-primary" />
                      Temperature
                    </label>
                    <Badge variant="outline">{temperature[0]}°C</Badge>
                  </div>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={45}
                    min={-10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>-10°C</span>
                    <span>45°C</span>
                  </div>
                </div>

                {/* Emission Intensity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-primary" />
                      Emission Intensity
                    </label>
                    <Badge variant="outline">{emissionIntensity[0]}%</Badge>
                  </div>
                  <Slider
                    value={emissionIntensity}
                    onValueChange={setEmissionIntensity}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                  Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-1">Wind Impact</div>
                  <div className="text-xs text-muted-foreground">
                    {windSpeed[0] < 10 ? "Low dispersion - pollutants may accumulate" :
                     windSpeed[0] < 25 ? "Moderate dispersion - good mixing conditions" :
                     "High dispersion - rapid pollutant clearing"}
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-1">Temperature Effect</div>
                  <div className="text-xs text-muted-foreground">
                    {temperature[0] < 15 ? "Cool conditions - lower emission rates" :
                     temperature[0] < 30 ? "Moderate temperature - standard emission rates" :
                     "Hot conditions - increased emission rates"}
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-1">Emission Level</div>
                  <div className="text-xs text-muted-foreground">
                    {emissionIntensity[0] < 30 ? "Low traffic/industrial activity" :
                     emissionIntensity[0] < 70 ? "Moderate activity levels" :
                     "High activity - peak emission conditions"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Scenarios</CardTitle>
                <CardDescription>Pre-configured simulation scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setWindSpeed([2]);
                    setTemperature([35]);
                    setEmissionIntensity([90]);
                  }}
                >
                  🔥 Worst Case Scenario
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setWindSpeed([15]);
                    setTemperature([20]);
                    setEmissionIntensity([40]);
                  }}
                >
                  🌤️ Optimal Conditions
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setWindSpeed([25]);
                    setTemperature([10]);
                    setEmissionIntensity([60]);
                  }}
                >
                  🌬️ Windy Day
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Simulation Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      CO₂ Dispersion Visualization
                    </CardTitle>
                    <CardDescription>
                      Real-time simulation of CO₂ emission patterns and dispersion
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Wind className="w-4 h-4 mr-1 text-primary" />
                      {windSpeed[0]} km/h
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="w-4 h-4 mr-1 text-primary" />
                      {temperature[0]}°C
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <MapComponent co2Data={co2SimulationData} />
                
                {/* Simulation Results */}
                {simulationProgress === 100 && (
                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-semibold text-success mb-2">Simulation Results</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Peak CO₂ Level</div>
                        <div className="text-muted-foreground">450 ppm in Zone A</div>
                      </div>
                      <div>
                        <div className="font-medium">Dispersion Rate</div>
                        <div className="text-muted-foreground">
                          {windSpeed[0] < 10 ? "Low" : windSpeed[0] < 25 ? "Moderate" : "High"}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Risk Assessment</div>
                        <div className="text-muted-foreground">
                          {emissionIntensity[0] > 70 ? "High Risk" : emissionIntensity[0] > 40 ? "Moderate Risk" : "Low Risk"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
        </div>
      </div>
    </div>
  );
};

export default Simulation;