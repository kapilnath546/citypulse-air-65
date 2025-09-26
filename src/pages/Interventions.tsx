import { useState } from "react";
import Navigation from "@/components/Navigation";
import MapComponent from "@/components/MapComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Leaf, 
  Filter, 
  TreePine, 
  Building, 
  MapPin,
  Plus,
  Minus,
  BarChart3,
  DollarSign,
  Zap,
  CheckCircle,
  TrendingDown
} from "lucide-react";

interface Intervention {
  id: string;
  type: string;
  name: string;
  icon: any;
  efficiency: number;
  cost: number;
  description: string;
  co2Reduction: number;
  coverage: number;
}

interface PlacedIntervention {
  id: string;
  type: string;
  lat: number;
  lng: number;
  efficiency: number;
}

const Interventions = () => {
  const [placedInterventions, setPlacedInterventions] = useState<PlacedIntervention[]>([]);
  const [selectedIntervention, setSelectedIntervention] = useState<string>("");
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const interventionTypes: Intervention[] = [
    {
      id: "vertical-gardens",
      type: "Vertical Gardens",
      name: "Vertical Gardens",
      icon: Leaf,
      efficiency: 85,
      cost: 50000,
      description: "Living walls that absorb CO₂ and improve air quality",
      co2Reduction: 15,
      coverage: 500
    },
    {
      id: "roadside-filters",
      type: "Roadside Filters",
      name: "Air Filtration Systems",
      icon: Filter,
      efficiency: 75,
      cost: 75000,
      description: "Advanced filtration systems for high-traffic areas",
      co2Reduction: 25,
      coverage: 800
    },
    {
      id: "bio-walls",
      type: "Bio Walls",
      name: "Bio Walls",
      icon: TreePine,
      efficiency: 90,
      cost: 40000,
      description: "Natural bio-walls with high CO₂ absorption capacity",
      co2Reduction: 20,
      coverage: 400
    },
    {
      id: "algae-scrubbers",
      type: "Algae Scrubbers",
      name: "Algae CO₂ Scrubbers",
      icon: Zap,
      efficiency: 95,
      cost: 120000,
      description: "Advanced algae-based carbon capture technology",
      co2Reduction: 40,
      coverage: 1000
    },
    {
      id: "green-roofs",
      type: "Green Roofs",
      name: "Green Roof Systems",
      icon: Building,
      efficiency: 70,
      cost: 30000,
      description: "Rooftop gardens that reduce building emissions",
      co2Reduction: 12,
      coverage: 300
    }
  ];

  const handleInterventionPlace = (lat: number, lng: number) => {
    if (!selectedIntervention) {
      toast({
        title: "No Intervention Selected",
        description: "Please select an intervention type first.",
        variant: "destructive",
      });
      return;
    }

    const intervention = interventionTypes.find(i => i.id === selectedIntervention);
    if (!intervention) return;

    const newIntervention: PlacedIntervention = {
      id: `${selectedIntervention}-${Date.now()}`,
      type: intervention.name,
      lat,
      lng,
      efficiency: intervention.efficiency
    };

    setPlacedInterventions(prev => [...prev, newIntervention]);
    
    toast({
      title: "Intervention Placed",
      description: `${intervention.name} has been placed successfully.`,
    });
  };

  const removeIntervention = (id: string) => {
    setPlacedInterventions(prev => prev.filter(i => i.id !== id));
    toast({
      title: "Intervention Removed",
      description: "The intervention has been removed from the map.",
    });
  };

  const runAnalysis = () => {
    if (placedInterventions.length === 0) {
      toast({
        title: "No Interventions Placed",
        description: "Please place at least one intervention before running analysis.",
        variant: "destructive",
      });
      return;
    }

    // Simulate analysis
    const totalReduction = placedInterventions.reduce((sum, intervention) => {
      const type = interventionTypes.find(t => t.name === intervention.type);
      return sum + (type?.co2Reduction || 0);
    }, 0);

    const totalCost = placedInterventions.reduce((sum, intervention) => {
      const type = interventionTypes.find(t => t.name === intervention.type);
      return sum + (type?.cost || 0);
    }, 0);

    setAnalysisResults({
      totalReduction,
      totalCost,
      hotspotsReduced: Math.min(placedInterventions.length * 2, 8),
      airQualityImprovement: Math.min(totalReduction * 2, 45),
      costPerTon: Math.round(totalCost / Math.max(totalReduction, 1))
    });

    setShowBeforeAfter(true);

    toast({
      title: "Analysis Complete",
      description: `Predicted CO₂ reduction: ${totalReduction}% with ${placedInterventions.length} interventions.`,
    });
  };

  const totalEfficiency = placedInterventions.reduce((sum, intervention) => {
    const type = interventionTypes.find(t => t.name === intervention.type);
    return sum + (type?.efficiency || 0);
  }, 0) / Math.max(placedInterventions.length, 1);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Intervention Planning</h1>
            <p className="text-muted-foreground mt-1">Design and test carbon capture solutions for optimal placement</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={runAnalysis}
              disabled={placedInterventions.length === 0}
              className="bg-gradient-primary hover:opacity-90"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Run Analysis
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowBeforeAfter(!showBeforeAfter)}
              disabled={!analysisResults}
            >
              {showBeforeAfter ? "Hide" : "Show"} Before/After
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Intervention Types */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-primary" />
                  Available Interventions
                </CardTitle>
                <CardDescription>
                  Select and place carbon capture solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {interventionTypes.map((intervention) => {
                  const Icon = intervention.icon;
                  const isSelected = selectedIntervention === intervention.id;
                  
                  return (
                    <Card 
                      key={intervention.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-card'
                      }`}
                      onClick={() => setSelectedIntervention(intervention.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{intervention.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {intervention.description}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline" className="text-xs">
                                {intervention.efficiency}% efficient
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                ${(intervention.cost / 1000).toFixed(0)}k
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>

            {/* Placed Interventions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Placed Solutions
                  </div>
                  <Badge variant="outline">{placedInterventions.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {placedInterventions.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No interventions placed yet. Select a type and click on the map.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {placedInterventions.map((intervention, index) => (
                      <div key={intervention.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="text-sm font-medium">{intervention.type}</div>
                          <div className="text-xs text-muted-foreground">
                            Position {index + 1} • {intervention.efficiency}% efficient
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIntervention(intervention.id)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {placedInterventions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Efficiency</span>
                      <span>{Math.round(totalEfficiency)}%</span>
                    </div>
                    <Progress value={totalEfficiency} className="h-2" />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{placedInterventions.length}</div>
                      <div className="text-xs text-muted-foreground">Solutions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">
                        {placedInterventions.reduce((sum, intervention) => {
                          const type = interventionTypes.find(t => t.name === intervention.type);
                          return sum + (type?.coverage || 0);
                        }, 0)}m²
                      </div>
                      <div className="text-xs text-muted-foreground">Coverage</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map and Analysis */}
          <div className="lg:col-span-3 space-y-6">
            {/* Instructions */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">How to Use</h4>
                    <p className="text-sm text-muted-foreground">
                      1. Select an intervention type from the left panel
                      2. Click on the map to place the intervention
                      3. Repeat to add multiple solutions
                      4. Click "Run Analysis" to see the impact
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Intervention Placement Map
                  </div>
                  {selectedIntervention && (
                    <Badge variant="outline" className="text-primary border-primary/20">
                      Placing: {interventionTypes.find(i => i.id === selectedIntervention)?.name}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Click on the map to place selected interventions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapComponent 
                  showInterventions={true}
                  interventions={placedInterventions}
                  onInterventionPlace={handleInterventionPlace}
                />
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingDown className="w-5 h-5 mr-2 text-success" />
                    Impact Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Predicted effectiveness of placed interventions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <CheckCircle className="w-8 h-8 mx-auto text-success mb-2" />
                      <div className="text-2xl font-bold text-success">
                        -{analysisResults.totalReduction}%
                      </div>
                      <div className="text-sm text-muted-foreground">CO₂ Reduction</div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <BarChart3 className="w-8 h-8 mx-auto text-primary mb-2" />
                      <div className="text-2xl font-bold text-primary">
                        +{analysisResults.airQualityImprovement}%
                      </div>
                      <div className="text-sm text-muted-foreground">Air Quality</div>
                    </div>
                    
                    <div className="text-center p-4 bg-warning/10 rounded-lg">
                      <MapPin className="w-8 h-8 mx-auto text-warning mb-2" />
                      <div className="text-2xl font-bold text-warning">
                        {analysisResults.hotspotsReduced}
                      </div>
                      <div className="text-sm text-muted-foreground">Hotspots Reduced</div>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <DollarSign className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <div className="text-2xl font-bold text-foreground">
                        ${(analysisResults.totalCost / 1000).toFixed(0)}k
                      </div>
                      <div className="text-sm text-muted-foreground">Total Cost</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Cost-Benefit Analysis</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        The proposed interventions would reduce CO₂ emissions by approximately{" "}
                        <strong>{analysisResults.totalReduction}%</strong> at a total cost of{" "}
                        <strong>${(analysisResults.totalCost / 1000).toFixed(0)}k</strong>.
                        This equals approximately{" "}
                        <strong>${analysisResults.costPerTon.toLocaleString()}</strong> per ton of CO₂ reduced annually.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interventions;