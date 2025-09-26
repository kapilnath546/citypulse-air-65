import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingDown,
  BarChart3,
  FileSpreadsheet,
  Printer,
  Share,
  CheckCircle,
  Target,
  DollarSign,
  Users
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState("comprehensive");
  const [timeRange, setTimeRange] = useState("month");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Sample data
  const co2TrendData = [
    { month: 'Jan', before: 420, after: 380, target: 350 },
    { month: 'Feb', before: 435, after: 375, target: 350 },
    { month: 'Mar', before: 440, after: 365, target: 350 },
    { month: 'Apr', before: 450, after: 360, target: 350 },
    { month: 'May', before: 445, after: 355, target: 350 },
    { month: 'Jun', before: 455, after: 350, target: 350 },
  ];

  const interventionData = [
    { intervention: 'Algae Scrubbers', reduction: 40, cost: 120000, zones: 2 },
    { intervention: 'Air Filters', reduction: 25, cost: 75000, zones: 3 },
    { intervention: 'Vertical Gardens', reduction: 15, cost: 50000, zones: 4 },
    { intervention: 'Bio Walls', reduction: 20, cost: 40000, zones: 2 },
    { intervention: 'Green Roofs', reduction: 12, cost: 30000, zones: 5 },
  ];

  const zoneImpactData = [
    { name: 'Zone A', value: 35, color: '#ef4444' },
    { name: 'Zone B', value: 25, color: '#f97316' },
    { name: 'Zone C', value: 20, color: '#f59e0b' },
    { name: 'Zone D', value: 15, color: '#10b981' },
    { name: 'Zone E', value: 5, color: '#22c55e' },
  ];

  const generateReport = async (format: 'pdf' | 'excel') => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    toast({
      title: "Report Generated",
      description: `${format.toUpperCase()} report has been prepared and is ready for download.`,
    });
  };

  const shareReport = () => {
    toast({
      title: "Report Shared",
      description: "Report link has been copied to clipboard and sent to stakeholders.",
    });
  };

  const reportTypes = [
    { value: "comprehensive", label: "Comprehensive Analysis" },
    { value: "intervention", label: "Intervention Impact" },
    { value: "policy", label: "Policy Recommendations" },
    { value: "budget", label: "Budget & Cost Analysis" },
    { value: "citizen", label: "Citizen Engagement" },
  ];

  const timeRanges = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
    { value: "custom", label: "Custom Range" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Generate comprehensive reports and policy recommendations</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <FileText className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total CO₂ Reduction</p>
                  <p className="text-2xl font-bold text-success">-28.5%</p>
                </div>
                <TrendingDown className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Interventions</p>
                  <p className="text-2xl font-bold text-primary">16</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Investment</p>
                  <p className="text-2xl font-bold text-foreground">$1.2M</p>
                </div>
                <DollarSign className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Citizens Engaged</p>
                  <p className="text-2xl font-bold text-warning">2,847</p>
                </div>
                <Users className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* CO₂ Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  CO₂ Levels: Before vs After Interventions
                </CardTitle>
                <CardDescription>
                  Monthly progression showing intervention effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={co2TrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
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
                      dataKey="before" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      name="Before Interventions"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="after" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      name="After Interventions"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#6b7280" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="WHO Target"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Intervention Effectiveness */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Intervention Effectiveness Analysis
                </CardTitle>
                <CardDescription>
                  CO₂ reduction by intervention type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={interventionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="intervention" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar 
                      dataKey="reduction" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      name="CO₂ Reduction %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Zone Impact Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2 text-primary" />
                  Impact Distribution by Zone
                </CardTitle>
                <CardDescription>
                  Percentage of total CO₂ reduction by monitoring zone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={zoneImpactData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {zoneImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Generation Panel */}
          <div className="space-y-6">
            {/* Report Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2 text-primary" />
                  Generate Report
                </CardTitle>
                <CardDescription>
                  Download comprehensive analysis reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => generateReport('pdf')}
                  disabled={isGenerating}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF Report
                </Button>
                
                <Button 
                  onClick={() => generateReport('excel')}
                  disabled={isGenerating}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Download Excel Data
                </Button>
                
                <Button 
                  onClick={shareReport}
                  className="w-full justify-start bg-gradient-primary hover:opacity-90"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share with Stakeholders
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Summary
                </Button>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-success" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="font-medium text-success mb-1">Excellent Progress</div>
                  <div className="text-sm text-muted-foreground">
                    CO₂ levels reduced by 28.5% across all monitored zones, exceeding quarterly targets.
                  </div>
                </div>
                
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="font-medium text-primary mb-1">Cost Efficiency</div>
                  <div className="text-sm text-muted-foreground">
                    Average cost per ton of CO₂ reduced: $4,200, well below industry benchmark.
                  </div>
                </div>
                
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="font-medium text-warning mb-1">Optimization Opportunity</div>
                  <div className="text-sm text-muted-foreground">
                    Zone A shows highest potential for additional interventions with 40% expected improvement.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policy Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Policy Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-2 bg-muted/50 rounded text-sm">
                  <strong>1. Expand Bio Wall Program:</strong> Scale successful bio wall installations to highway corridors citywide.
                </div>
                
                <div className="p-2 bg-muted/50 rounded text-sm">
                  <strong>2. Green Building Incentives:</strong> Implement tax benefits for buildings installing green roof systems.
                </div>
                
                <div className="p-2 bg-muted/50 rounded text-sm">
                  <strong>3. Industrial Partnerships:</strong> Mandate algae scrubber installations in high-emission industrial zones.
                </div>
                
                <div className="p-2 bg-muted/50 rounded text-sm">
                  <strong>4. Citizen Engagement:</strong> Launch community challenge program to increase participation by 50%.
                </div>
                
                <Badge variant="outline" className="w-full justify-center mt-4">
                  View Complete Policy Document →
                </Badge>
              </CardContent>
            </Card>

            {/* Report History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div>
                    <div className="text-sm font-medium">Q2 Comprehensive Analysis</div>
                    <div className="text-xs text-muted-foreground">June 15, 2024</div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div>
                    <div className="text-sm font-medium">Intervention Impact Study</div>
                    <div className="text-xs text-muted-foreground">May 28, 2024</div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div>
                    <div className="text-sm font-medium">Budget Analysis Q1</div>
                    <div className="text-xs text-muted-foreground">April 10, 2024</div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;