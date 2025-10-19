import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          LiquidMesh
        </h1>
        <p className="text-muted-foreground max-w-2xl text-xl mx-auto">
          The AI orchestration layer for concentrated liquidity on Somnia.
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Multi-Agent Framework</CardTitle>
            <CardDescription>
              Specialized AI agents (Watcher, Strategist, Executor) with modular
              architecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Continuously monitor pool metrics, reason about market changes,
              and autonomously execute liquidity strategies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autonomous Management</CardTitle>
            <CardDescription>
              Fully automated liquidity optimization for maximum capital
              efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Constantly optimizes range positions for better returns.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Somnia Native</CardTitle>
            <CardDescription>
              Optimized for low-latency execution on Somnia ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Built specifically for the Somnia ecosystem.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild>
          <Link href="https://github.com/samueldanso/liquidmesh-somnia-ai">
            Source
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://github.com/samueldanso/liquidmesh-somnia-ai">
            Docs
          </Link>
        </Button>
      </div>
    </div>
  );
}
