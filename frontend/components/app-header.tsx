import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { WalletConnect } from "./wallet-connect";

export default function AppHeader() {
  return (
    <header className="container mx-auto">
      <nav className="flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">LiquidMesh</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="relative text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/deposit"
            className="relative text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Liquidity
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <WalletConnect />
        </div>
      </nav>

      {/* Thin divider line */}
      <div className="border-b border-border/50"></div>
    </header>
  );
}
