import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Satellite, 
  Database, 
  Users, 
  Code, 
  Zap,
  Shield,
  Award,
  ExternalLink,
  Mail,
  Github,
  Linkedin
} from "lucide-react";

const About = () => {
  const dataSources = [
    {
      name: "NASA OCO-2/3",
      description: "Orbiting Carbon Observatory satellite data for global CO₂ measurements",
      icon: Satellite,
      coverage: "Global",
      accuracy: "99.8%"
    },
    {
      name: "CPCB Air Quality",
      description: "Central Pollution Control Board real-time air quality monitoring",
      icon: Database,
      coverage: "India",
      accuracy: "98.5%"
    },
    {
      name: "OpenWeatherMap",
      description: "Comprehensive weather data including wind patterns and temperature",
      icon: Globe,
      coverage: "Worldwide",
      accuracy: "97.2%"
    },
    {
      name: "OpenStreetMap",
      description: "Detailed city mapping data for accurate geographical representation",
      icon: Globe,
      coverage: "Global",
      accuracy: "99.1%"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Environmental Data Scientist",
      bio: "PhD in Atmospheric Physics, 10+ years in climate modeling",
      icon: Satellite
    },
    {
      name: "Marcus Rodriguez",
      role: "AI/ML Engineer",
      bio: "Specialist in machine learning for environmental applications",
      icon: Zap
    },
    {
      name: "Priya Sharma",
      role: "Urban Planning Expert",
      bio: "15 years experience in sustainable city development",
      icon: Users
    },
    {
      name: "James Thompson",
      role: "Full-Stack Developer",
      bio: "Expert in geospatial applications and data visualization",
      icon: Code
    }
  ];

  const technologies = [
    { name: "React.js", purpose: "Frontend user interface", icon: Code },
    { name: "TypeScript", purpose: "Type-safe development", icon: Shield },
    { name: "Mapbox GL JS", purpose: "Interactive mapping", icon: Globe },
    { name: "TailwindCSS", purpose: "Modern styling", icon: Zap },
    { name: "Python", purpose: "AI algorithms & simulations", icon: Zap },
    { name: "NumPy/Pandas", purpose: "Data processing", icon: Database },
    { name: "PostgreSQL", purpose: "Geospatial data storage", icon: Database },
    { name: "TensorFlow", purpose: "Machine learning models", icon: Zap }
  ];

  const achievements = [
    {
      title: "Best Climate Tech Solution 2024",
      organization: "Global Climate Innovation Awards",
      icon: Award
    },
    {
      title: "Smart City Technology Excellence",
      organization: "Urban Planning Institute",
      icon: Award
    },
    {
      title: "Environmental Impact Recognition",
      organization: "Green Tech Foundation",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About Urban Digital Twin
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pioneering the future of urban air quality management through advanced simulation, 
            AI-powered insights, and community engagement for sustainable cities.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-gradient-card">
          <CardContent className="pt-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower cities worldwide with cutting-edge digital twin technology that simulates, 
                analyzes, and optimizes CO₂ emissions, enabling data-driven decisions for a cleaner, 
                healthier urban environment. We believe that every city can achieve carbon neutrality 
                through intelligent planning and community participation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Trusted Data Sources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataSources.map((source, index) => {
              const Icon = source.icon;
              return (
                <Card key={index} className="hover:shadow-card transition-all duration-200">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      {source.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Coverage:</span>
                        <Badge variant="outline">{source.coverage}</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Accuracy:</span>
                        <Badge variant="outline" className="text-success border-success/20">
                          {source.accuracy}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Technology Stack</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {technologies.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{tech.name}</div>
                        <div className="text-xs text-muted-foreground">{tech.purpose}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Team */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <div className="space-y-4">
              {teamMembers.map((member, index) => {
                const Icon = member.icon;
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-primary text-sm mb-2">{member.role}</p>
                          <p className="text-sm text-muted-foreground">{member.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Achievements & Recognition */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Recognition</h2>
            <div className="space-y-4 mb-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="bg-gradient-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-warning" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Metrics</CardTitle>
                <CardDescription>Our contribution to global climate action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">50+</div>
                    <div className="text-sm text-muted-foreground">Cities Served</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">35%</div>
                    <div className="text-sm text-muted-foreground">Avg CO₂ Reduction</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">1M+</div>
                    <div className="text-sm text-muted-foreground">Citizens Engaged</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">$2.1B</div>
                    <div className="text-sm text-muted-foreground">Climate Investment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Source & Community */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Open Source & Community</CardTitle>
            <CardDescription>
              We believe in collaborative development for global climate solutions
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our platform is built with open-source principles, encouraging contributions from 
              developers, researchers, and climate scientists worldwide. Together, we can build 
              better tools for environmental monitoring and urban planning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="flex items-center">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="outline" className="flex items-center">
                <Code className="w-4 h-4 mr-2" />
                API Documentation
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="outline" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Join Community
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get In Touch</CardTitle>
            <CardDescription>
              Partner with us to bring digital twin technology to your city
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-sm text-muted-foreground">contact@urbandtwin.com</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Send Message
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Contribute</h3>
                  <p className="text-sm text-muted-foreground">github.com/urbandtwin</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Repository
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Connect</h3>
                  <p className="text-sm text-muted-foreground">LinkedIn Community</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Follow Us
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Urban Digital Twin. Built with passion for a sustainable future. 
                Licensed under MIT for open collaboration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;