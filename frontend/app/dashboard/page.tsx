import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  Network,
  Pause,
  Play,
  Settings,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            LiquidMesh Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered autonomous liquidity management on Somnia
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Value Locked
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">
                +0.00% from last hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Positions
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                No positions active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net APY</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">
                No active positions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Agent Status
              </CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Inactive</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Connect wallet to activate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Agent Status */}
        <div className="grid gap-6 mb-8 lg:grid-cols-3">
          {/* Watcher Agent */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Watcher Agent
                </CardTitle>
                <Badge variant="outline">Monitoring</Badge>
              </div>
              <CardDescription>
                Continuously tracks pool metrics and market conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Price Tracking</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Volume Analysis</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Volatility Monitor</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Range Status</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategist Agent */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Strategist Agent
                </CardTitle>
                <Badge variant="outline">Reasoning</Badge>
              </div>
              <CardDescription>
                AI reasoning for optimal liquidity range and rebalance strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Strategy Analysis</span>
                  <span className="text-muted-foreground">Pending</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Range Optimization</span>
                  <span className="text-muted-foreground">Pending</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Risk Assessment</span>
                  <span className="text-muted-foreground">Pending</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Yield Projection</span>
                  <span className="text-muted-foreground">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Executor Agent */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Executor Agent
                </CardTitle>
                <Badge variant="outline">Ready</Badge>
              </div>
              <CardDescription>
                Executes transactions and manages liquidity positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Transaction Prep</span>
                  <span className="text-muted-foreground">Ready</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Position Management</span>
                  <span className="text-muted-foreground">Ready</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Execution Engine</span>
                  <span className="text-muted-foreground">Ready</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Result Tracking</span>
                  <span className="text-muted-foreground">Ready</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liquidity Management */}
        <div className="grid gap-6 mb-8 lg:grid-cols-2">
          {/* Your Holdings */}
          <Card>
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>
                Current liquidity positions and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Positions Active</h3>
                  <p className="text-muted-foreground">
                    Connect your wallet and deposit tokens to start earning
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Assets */}
          <Card>
            <CardHeader>
              <CardTitle>Available Assets</CardTitle>
              <CardDescription>
                Tokens available for liquidity provision on Somnia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      E
                    </div>
                    <div>
                      <div className="font-medium">ETH</div>
                      <div className="text-sm text-muted-foreground">
                        Ethereum
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">0.00 ETH</div>
                    <div className="text-sm text-muted-foreground">
                      APY: 0.98%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      U
                    </div>
                    <div>
                      <div className="font-medium">USDT</div>
                      <div className="text-sm text-muted-foreground">
                        Tether USD
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">0.00 USDT</div>
                    <div className="text-sm text-muted-foreground">
                      APY: 1.25%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      S
                    </div>
                    <div>
                      <div className="font-medium">SOM</div>
                      <div className="text-sm text-muted-foreground">
                        Somnia
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">0.00 SOM</div>
                    <div className="text-sm text-muted-foreground">
                      APY: 2.15%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Activity Log */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agent Activity Log</CardTitle>
            <CardDescription>
              Real-time monitoring of agent decisions and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    2 minutes ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Watcher: Pool metrics updated</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Info
                </Badge>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    5 minutes ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Strategist: Analysis pending</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pending
                </Badge>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    10 minutes ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Executor: Ready for transactions
                  </span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Start Agent Orchestration
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configure Agents
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
