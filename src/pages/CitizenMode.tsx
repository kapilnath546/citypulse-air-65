import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Leaf, 
  Home, 
  Car,
  Recycle,
  TreePine,
  Award,
  Target,
  TrendingUp,
  MapPin,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";

interface CitizenAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  co2Impact: number;
  cost: number;
  difficulty: "easy" | "medium" | "hard";
  category: "home" | "transport" | "community";
  points: number;
}

const CitizenMode = () => {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [userLevel, setUserLevel] = useState(1);
  const [userPoints, setUserPoints] = useState(150);
  const [totalImpact, setTotalImpact] = useState(12);
  const { toast } = useToast();

  const citizenActions: CitizenAction[] = [
    {
      id: "rooftop-garden",
      title: "Add a Rooftop Garden",
      description: "Install plants and small trees on your rooftop to absorb CO₂",
      icon: Leaf,
      co2Impact: 8,
      cost: 200,
      difficulty: "medium",
      category: "home",
      points: 25
    },
    {
      id: "tree-planting",
      title: "Plant Trees on Your Street",
      description: "Organize neighborhood tree planting to improve local air quality",
      icon: TreePine,
      co2Impact: 15,
      cost: 50,
      difficulty: "easy",
      category: "community",
      points: 30
    },
    {
      id: "energy-efficient",
      title: "Switch to LED Lighting",
      description: "Replace all home lighting with energy-efficient LED bulbs",
      icon: Zap,
      co2Impact: 5,
      cost: 100,
      difficulty: "easy",
      category: "home",
      points: 15
    },
    {
      id: "bike-commute",
      title: "Bike to Work Challenge",
      description: "Commit to biking to work 3 days per week for a month",
      icon: Car,
      co2Impact: 12,
      cost: 0,
      difficulty: "medium",
      category: "transport",
      points: 35
    },
    {
      id: "home-composting",
      title: "Start Home Composting",
      description: "Reduce organic waste and create natural fertilizer",
      icon: Recycle,
      co2Impact: 4,
      cost: 30,
      difficulty: "easy",
      category: "home",
      points: 20
    },
    {
      id: "solar-panels",
      title: "Install Solar Panels",
      description: "Generate clean energy for your home",
      icon: Zap,
      co2Impact: 25,
      cost: 5000,
      difficulty: "hard",
      category: "home",
      points: 100
    }
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first eco-action", points: 10, unlocked: true },
    { title: "Green Warrior", description: "Reduce 50kg CO₂ equivalent", points: 50, unlocked: true },
    { title: "Community Leader", description: "Complete 3 community actions", points: 75, unlocked: false },
    { title: "Carbon Neutral", description: "Achieve net-zero personal impact", points: 200, unlocked: false },
  ];

  const selectAction = (actionId: string) => {
    if (selectedActions.includes(actionId)) {
      setSelectedActions(prev => prev.filter(id => id !== actionId));
    } else {
      setSelectedActions(prev => [...prev, actionId]);
    }
  };

  const commitToActions = () => {
    const newPoints = selectedActions.reduce((sum, actionId) => {
      const action = citizenActions.find(a => a.id === actionId);
      return sum + (action?.points || 0);
    }, 0);

    const newImpact = selectedActions.reduce((sum, actionId) => {
      const action = citizenActions.find(a => a.id === actionId);
      return sum + (action?.co2Impact || 0);
    }, 0);

    setUserPoints(prev => prev + newPoints);
    setTotalImpact(prev => prev + newImpact);
    
    // Check for level up
    if (userPoints + newPoints > userLevel * 200) {
      setUserLevel(prev => prev + 1);
      toast({
        title: "🎉 Level Up!",
        description: `Congratulations! You've reached Level ${userLevel + 1}!`,
      });
    }

    toast({
      title: "Actions Committed!",
      description: `You'll reduce CO₂ by ${newImpact}kg and earn ${newPoints} points!`,
    });

    setSelectedActions([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-success border-success/20 bg-success/10";
      case "medium": return "text-warning border-warning/20 bg-warning/10";
      case "hard": return "text-destructive border-destructive/20 bg-destructive/10";
      default: return "text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "home": return Home;
      case "transport": return Car;
      case "community": return Users;
      default: return Target;
    }
  };

  const progressToNextLevel = ((userPoints % 200) / 200) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center justify-center">
            <Users className="w-8 h-8 mr-3 text-primary" />
            Citizen Climate Action
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Make a personal impact on your neighborhood's air quality. Every small action counts towards a cleaner, healthier city.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* User Profile & Progress */}
          <div className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle>Eco Champion Level {userLevel}</CardTitle>
                <CardDescription>{userPoints} Climate Points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to Level {userLevel + 1}</span>
                    <span>{userPoints % 200}/200</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 mx-auto text-success mb-1" />
                    <div className="text-lg font-bold text-success">{totalImpact}kg</div>
                    <div className="text-xs text-muted-foreground">CO₂ Reduced</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-lg font-bold text-primary">{selectedActions.length}</div>
                    <div className="text-xs text-muted-foreground">Active Goals</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-warning" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      achievement.unlocked ? 'bg-success/10' : 'bg-muted/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement.unlocked ? <CheckCircle className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.points}pts
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Your Neighborhood Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-success">-{totalImpact}%</div>
                  <div className="text-sm text-muted-foreground">Your CO₂ reduction contribution</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Personal Impact:</span>
                    <span className="font-medium">{totalImpact}kg CO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Neighborhood Rank:</span>
                    <span className="font-medium">#47 of 1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Community Total:</span>
                    <span className="font-medium">2,847kg CO₂</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Selection */}
          <div className="lg:col-span-3 space-y-6">
            {/* Selected Actions Summary */}
            {selectedActions.length > 0 && (
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Your Climate Goals
                    </div>
                    <Button onClick={commitToActions} className="bg-gradient-primary hover:opacity-90">
                      Commit to Actions
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 mx-auto text-success mb-1" />
                      <div className="font-bold text-success">
                        -{selectedActions.reduce((sum, id) => {
                          const action = citizenActions.find(a => a.id === id);
                          return sum + (action?.co2Impact || 0);
                        }, 0)}kg
                      </div>
                      <div className="text-xs text-muted-foreground">CO₂ Reduction</div>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <Award className="w-6 h-6 mx-auto text-primary mb-1" />
                      <div className="font-bold text-primary">
                        +{selectedActions.reduce((sum, id) => {
                          const action = citizenActions.find(a => a.id === id);
                          return sum + (action?.points || 0);
                        }, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Climate Points</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Target className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                      <div className="font-bold">
                        ${selectedActions.reduce((sum, id) => {
                          const action = citizenActions.find(a => a.id === id);
                          return sum + (action?.cost || 0);
                        }, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Cost</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Leaf className="w-6 h-6 mr-2 text-primary" />
                Choose Your Climate Actions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {citizenActions.map((action) => {
                  const CategoryIcon = getCategoryIcon(action.category);
                  const ActionIcon = action.icon;
                  const isSelected = selectedActions.includes(action.id);
                  
                  return (
                    <Card 
                      key={action.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-card'
                      }`}
                      onClick={() => selectAction(action.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              <ActionIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{action.title}</CardTitle>
                              <div className="flex items-center space-x-2">
                                <CategoryIcon className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground capitalize">
                                  {action.category}
                                </span>
                                <Badge className={getDifficultyColor(action.difficulty)} variant="outline">
                                  {action.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {isSelected && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {action.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-2 bg-success/10 rounded">
                            <div className="font-semibold text-success">-{action.co2Impact}kg</div>
                            <div className="text-xs text-muted-foreground">CO₂</div>
                          </div>
                          <div className="p-2 bg-primary/10 rounded">
                            <div className="font-semibold text-primary">+{action.points}</div>
                            <div className="text-xs text-muted-foreground">Points</div>
                          </div>
                          <div className="p-2 bg-muted/50 rounded">
                            <div className="font-semibold">${action.cost}</div>
                            <div className="text-xs text-muted-foreground">Cost</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Community Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Community Impact Dashboard
                </CardTitle>
                <CardDescription>
                  See how your neighborhood is working together for cleaner air
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">2,847</div>
                    <div className="text-sm text-muted-foreground">Active Citizens</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">18,392kg</div>
                    <div className="text-sm text-muted-foreground">CO₂ Reduced</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">156</div>
                    <div className="text-sm text-muted-foreground">Trees Planted</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">-15%</div>
                    <div className="text-sm text-muted-foreground">Area Improvement</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">This Week's Community Challenge</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Plant 50 trees across the neighborhood to reduce CO₂ by 500kg this month!
                  </p>
                  <div className="flex items-center justify-between">
                    <Progress value={72} className="flex-1 mr-4" />
                    <Badge variant="outline">36/50 trees</Badge>
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

export default CitizenMode;