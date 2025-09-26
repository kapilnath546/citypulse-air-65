import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "co2-safe" | "co2-moderate" | "co2-unhealthy" | "co2-hazardous";
}

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon, 
  description,
  variant = "default"
}: KPICardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "co2-safe":
        return "border-co2-safe/20 bg-co2-safe/5";
      case "co2-moderate":
        return "border-co2-moderate/20 bg-co2-moderate/5";
      case "co2-unhealthy":
        return "border-co2-unhealthy/20 bg-co2-unhealthy/5";
      case "co2-hazardous":
        return "border-co2-hazardous/20 bg-co2-hazardous/5";
      default:
        return "border-border bg-card";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "co2-safe":
        return "text-co2-safe";
      case "co2-moderate":
        return "text-co2-moderate";
      case "co2-unhealthy":
        return "text-co2-unhealthy";
      case "co2-hazardous":
        return "text-co2-hazardous";
      default:
        return "text-primary";
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success bg-success/10";
      case "negative":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-elevated", getVariantStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", getIconColor())} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {value}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {change && (
            <Badge variant="outline" className={cn("text-xs", getChangeColor())}>
              {change}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;