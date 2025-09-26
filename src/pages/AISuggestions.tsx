import { useState } from "react";
import Navigation from "@/components/Navigation";
import MapComponent from "@/components/MapComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Sparkles, 
  Target, 
  CheckCircle,
  XCircle,
  MapPin,
  TrendingUp,
  Zap,
  Shield,
  DollarSign,
  Clock
} from "lucide-react";

interface AISuggestion {
  id: string;
  zone: string;
  intervention: string;
  priority: "high" | "medium" | "low";
  confidence: number;
  expectedReduction: number;
  cost: number;
  reasoning: string;
  coordinates: { lat: number; lng: number };
}

const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI analysis
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          generateSuggestions();
          return 100;
        }
        return prev + 12.5;
      });
    }, 400);

    toast({
      title: "AI Analysis Started",
      description: "Analyzing CO₂ patterns and generating optimal intervention suggestions.",
    });
  };

  const generateSuggestions = () => {
    const mockSuggestions: AISuggestion[] = [
      {
        id: '1',
        zone: 'Zone A - Central Business District',
        intervention: 'Algae CO₂ Scrubbers',
        priority: 'high',
        confidence: 95,
        expectedReduction: 40,
        cost: 120000,
        reasoning: 'Highest CO₂ concentration (450 ppm) with high traffic density. Algae scrubbers provide maximum efficiency for this critical hotspot.',
        coordinates: { lat: 28.6139, lng: 77.2090 }
      },
      {
        id: '2',
        zone: 'Zone B - Industrial Area',
        intervention: 'Air Filtration Systems',
        priority: 'high',
        confidence: 88,
        expectedReduction: 25,
        cost: 75000,
        reasoning: 'Industrial emissions combined with limited natural dispersion. Strategic placement near emission sources for optimal capture.',
        coordinates: { lat: 28.6339, lng: 77.1890 }
      },
      {
        id: '3',
        zone: 'Zone C - Residential Complex',
        intervention: 'Vertical Gardens',
        priority: 'medium',
        confidence: 82,
        expectedReduction: 15,
        cost: 50000,
        reasoning: 'Moderate CO₂ levels with good natural dispersion. Vertical gardens provide cost-effective solution with aesthetic benefits.',
        coordinates: { lat: 28.5939, lng: 77.2290 }
      },
      {
        id: '4',
        zone: 'Zone D - Highway Corridor',
        intervention: 'Bio Walls',
        priority: 'medium',
        confidence: 78,
        expectedReduction: 20,
        cost: 40000,
        reasoning: 'Linear emission source from vehicle traffic. Bio walls along highway provide effective CO₂ absorption with lower maintenance.',
        coordinates: { lat: 28.6239, lng: 77.2490 }
      },
      {
        id: '5',
        zone: 'Zone E - Mixed Development',
        intervention: 'Green Roof Systems',
        priority: 'low',
        confidence: 72,
        expectedReduction: 12,
        cost: 30000,
        reasoning: 'Lower priority due to existing moderate air quality. Green roofs provide long-term benefits and building efficiency gains.',
        coordinates: { lat: 28.6539, lng: 77.1690 }
      }
    ];

    setSuggestions(mockSuggestions);
    
    toast({
      title: "AI Analysis Complete",
      description: `Generated ${mockSuggestions.length} optimization suggestions based on current CO₂ patterns.`,
    });
  };

  const acceptSuggestion = (suggestionId: string) => {
    setAcceptedSuggestions(prev => [...prev, suggestionId]);
    toast({
      title: "Suggestion Accepted",
      description: "The AI recommendation has been added to your intervention plan.",
    });
  };

  const rejectSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    toast({
      title: "Suggestion Dismissed",
      description: "The AI recommendation has been removed from the list.",
    });
  };

  const acceptAllSuggestions = () => {
    const remainingSuggestions = suggestions.filter(s => !acceptedSuggestions.includes(s.id));
    setAcceptedSuggestions(prev => [...prev, ...remainingSuggestions.map(s => s.id)]);
    toast({
      title: "All Suggestions Accepted",
      description: `Added ${remainingSuggestions.length} interventions to your plan.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive border-destructive/20 bg-destructive/10';
      case 'medium': return 'text-warning border-warning/20 bg-warning/10';
      case 'low': return 'text-success border-success/20 bg-success/10';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return Target;
      case 'medium': return Clock;
      case 'low': return Shield;
      default: return Target;
    }
  };

  const totalExpectedReduction = suggestions
    .filter(s => acceptedSuggestions.includes(s.id))
    .reduce((sum, s) => sum + s.expectedReduction, 0);

  const totalCost = suggestions
    .filter(s => acceptedSuggestions.includes(s.id))
    .reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Brain className="w-8 h-8 mr-3 text-primary" />
              AI-Powered Suggestions
            </h1>
            <p className="text-muted-foreground mt-1">Machine learning optimization for maximum CO₂ reduction efficiency</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={runAIAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Run AI Analysis
                </>
              )}
            </Button>
            {suggestions.length > 0 && (
              <Button 
                variant="outline"
                onClick={acceptAllSuggestions}
                disabled={acceptedSuggestions.length === suggestions.length}
              >
                Accept All
              </Button>
            )}
          </div>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-primary" />
                  AI Analysis Progress
                </span>
                <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              <div className="text-sm text-muted-foreground mt-2">
                {analysisProgress < 25 ? "Analyzing CO₂ distribution patterns..." :
                 analysisProgress < 50 ? "Processing weather and dispersion data..." :
                 analysisProgress < 75 ? "Calculating optimal intervention placements..." :
                 analysisProgress < 100 ? "Generating efficiency recommendations..." :
                 "Analysis complete!"}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* AI Insights Panel */}
          <div className="space-y-6">
            {suggestions.length > 0 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-success" />
                      Impact Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        -{totalExpectedReduction}%
                      </div>
                      <div className="text-sm text-muted-foreground">Expected CO₂ Reduction</div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {acceptedSuggestions.length}/{suggestions.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Accepted Suggestions</div>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        ${(totalCost / 1000).toFixed(0)}k
                      </div>
                      <div className="text-sm text-muted-foreground">Total Investment</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-warning" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="font-medium text-primary mb-1">Optimization Strategy</div>
                      <div className="text-muted-foreground text-xs">
                        AI prioritizes high-traffic zones with poor natural dispersion for maximum impact.
                      </div>
                    </div>
                    
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="font-medium text-success mb-1">Cost Efficiency</div>
                      <div className="text-muted-foreground text-xs">
                        Current suggestions provide 95% of maximum possible reduction at 60% cost.
                      </div>
                    </div>
                    
                    <div className="p-3 bg-warning/10 rounded-lg">
                      <div className="font-medium text-warning mb-1">Weather Factor</div>
                      <div className="text-muted-foreground text-xs">
                        Seasonal wind patterns considered for optimal placement timing.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {suggestions.length === 0 && !isAnalyzing && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Ready for AI Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click "Run AI Analysis" to generate optimized intervention recommendations based on current CO₂ patterns.
                  </p>
                  <Button onClick={runAIAnalysis} variant="outline" size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Analysis
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map and Suggestions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recommendations Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  AI Recommendation Map
                </CardTitle>
                <CardDescription>
                  Highlighted zones show optimal placement for carbon capture interventions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapComponent 
                  interventions={suggestions.map(s => ({
                    id: s.id,
                    type: s.intervention,
                    lat: s.coordinates.lat,
                    lng: s.coordinates.lng,
                    efficiency: s.expectedReduction
                  }))}
                />
              </CardContent>
            </Card>

            {/* Suggestions List */}
            {suggestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  AI Recommendations
                </h3>
                
                {suggestions.map((suggestion) => {
                  const PriorityIcon = getPriorityIcon(suggestion.priority);
                  const isAccepted = acceptedSuggestions.includes(suggestion.id);
                  
                  return (
                    <Card 
                      key={suggestion.id} 
                      className={`transition-all duration-200 ${
                        isAccepted ? 'ring-2 ring-success bg-success/5' : 'hover:shadow-card'
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <CardTitle className="text-lg">{suggestion.zone}</CardTitle>
                              <Badge className={getPriorityColor(suggestion.priority)}>
                                <PriorityIcon className="w-3 h-3 mr-1" />
                                {suggestion.priority} priority
                              </Badge>
                            </div>
                            <CardDescription className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Zap className="w-4 h-4 mr-1" />
                                {suggestion.intervention}
                              </span>
                              <span className="flex items-center">
                                <Brain className="w-4 h-4 mr-1" />
                                {suggestion.confidence}% confidence
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            {!isAccepted ? (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => acceptSuggestion(suggestion.id)}
                                  className="bg-success hover:bg-success/90"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Accept
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => rejectSuggestion(suggestion.id)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Dismiss
                                </Button>
                              </>
                            ) : (
                              <Badge variant="outline" className="text-success border-success/20">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Accepted
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-success/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 mx-auto text-success mb-1" />
                            <div className="font-semibold text-success">-{suggestion.expectedReduction}%</div>
                            <div className="text-xs text-muted-foreground">CO₂ Reduction</div>
                          </div>
                          <div className="text-center p-3 bg-primary/10 rounded-lg">
                            <DollarSign className="w-5 h-5 mx-auto text-primary mb-1" />
                            <div className="font-semibold text-primary">${(suggestion.cost / 1000).toFixed(0)}k</div>
                            <div className="text-xs text-muted-foreground">Investment</div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <Brain className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                            <div className="font-semibold">{suggestion.confidence}%</div>
                            <div className="text-xs text-muted-foreground">Confidence</div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium mb-1">AI Reasoning:</div>
                          <div className="text-sm text-muted-foreground">
                            {suggestion.reasoning}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;