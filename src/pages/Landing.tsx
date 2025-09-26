import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  ChartBar, 
  Map, 
  Settings, 
  FileText, 
  Brain, 
  Users,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const features = [
    {
      icon: ChartBar,
      title: "Real-time Dashboard",
      description: "Monitor CO₂ levels across your city with live data visualization and KPI tracking.",
    },
    {
      icon: Map,
      title: "Interactive Simulation",
      description: "Run CO₂ dispersion simulations with weather patterns and emission sources.",
    },
    {
      icon: Settings,
      title: "Smart Interventions",
      description: "Place and test carbon capture solutions with drag-and-drop simplicity.",
    },
    {
      icon: Brain,
      title: "AI-Powered Suggestions",
      description: "Get optimal placement recommendations for maximum CO₂ reduction.",
    },
    {
      icon: FileText,
      title: "Comprehensive Reports",
      description: "Generate detailed analytics and policy recommendations for stakeholders.",
    },
    {
      icon: Users,
      title: "Citizen Engagement",
      description: "Simplified interface for community members to participate in climate action.",
    },
  ];

  const benefits = [
    "Reduce urban CO₂ emissions by up to 35%",
    "Data-driven policy recommendations",
    "Real-time air quality monitoring",
    "Cost-effective intervention planning",
    "Community engagement platform",
    "Compliance with environmental standards"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Digital Twin Technology
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Urban Digital Twin for{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    CO₂ Management
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Simulate, analyze, and optimize urban carbon emissions with AI-powered insights and interactive decision-making tools.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/simulation">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-primary text-lg px-8">
                    Start Simulation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    View Dashboard
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">35%</div>
                  <div className="text-sm text-muted-foreground">CO₂ Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Urban Digital Twin CO₂ Management" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Floating Stats Cards */}
              <Card className="absolute -bottom-4 -left-4 w-48 bg-gradient-card shadow-elevated">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-co2-safe rounded-full animate-pulse-soft" />
                    <span className="text-sm font-medium">Real-time Data</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mt-1">420 ppm</div>
                  <div className="text-xs text-muted-foreground">Current CO₂ Level</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <BarChart3 className="w-3 h-3 mr-1" />
              Comprehensive Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Complete CO₂ Management Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From real-time monitoring to AI-powered optimization, our platform provides everything you need for effective urban carbon management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-elevated transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-success border-success/20">
                  <Shield className="w-3 h-3 mr-1" />
                  Proven Results
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Transform Your City's{" "}
                  <span className="text-primary">Carbon Footprint</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join leading cities worldwide in the fight against climate change with data-driven carbon management strategies.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="mt-8">
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-card shadow-elevated">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Impact Metrics</h3>
                    <p className="text-muted-foreground">Real results from deployed solutions</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-co2-safe/10 rounded-lg">
                      <div className="text-3xl font-bold text-co2-safe">-35%</div>
                      <div className="text-sm text-muted-foreground">CO₂ Emissions</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-3xl font-bold text-primary">98%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-warning/10 rounded-lg">
                      <div className="text-3xl font-bold text-warning">50+</div>
                      <div className="text-sm text-muted-foreground">Cities</div>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-3xl font-bold text-success">24/7</div>
                      <div className="text-sm text-muted-foreground">Monitoring</div>
                    </div>
                  </div>

                  <Link to="/citizen-mode" className="block">
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Get Started Today
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Transform Your City?
            </h2>
            <p className="text-xl opacity-90">
              Start your journey towards sustainable urban development with our comprehensive CO₂ management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/simulation">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Launch Simulation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;