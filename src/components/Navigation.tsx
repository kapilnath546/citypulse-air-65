import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChartBar, 
  Map, 
  Settings, 
  FileText, 
  Brain, 
  Users, 
  Info,
  Home,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: ChartBar },
    { path: "/simulation", label: "Simulation", icon: Map },
    { path: "/interventions", label: "Interventions", icon: Settings },
    { path: "/ai-suggestions", label: "AI Suggestions", icon: Brain, badge: "AI" },
    { path: "/reports", label: "Reports", icon: FileText },
    { path: "/citizen-mode", label: "Citizen Mode", icon: Users },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Map className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary">Urban Digital Twin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="h-9 px-3 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Link to="/simulation">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                Start Simulation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-slide-up">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start h-10"
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border">
              <Link to="/simulation" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Start Simulation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;