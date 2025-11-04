"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { LIQUIDITY_VAULT_ABI } from "@/lib/abis";
import { CONTRACTS } from "@/lib/contracts";

export default function AppPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const { data: position, isLoading } = useReadContract({
    address: CONTRACTS.LiquidityVault,
    abi: LIQUIDITY_VAULT_ABI,
    functionName: "getPosition",
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  useEffect(() => {
    if (!isConnected) {
      // Wait a bit for wallet connection
      return;
    }

    if (isLoading) {
      // Still loading position data
      return;
    }

    if (position) {
      // Position is a tuple: [wsttAmount, usdcAmount, lpTokens, rangeLower, rangeUpper, feesEarnedWSTT, feesEarnedUSDC, depositTime, lastFeeUpdate, active]
      // Index 2 = lpTokens, Index 9 = active
      const lpTokens = position[2];
      const active = position[9];

      // Check if user has an active deposit
      const hasDeposit = lpTokens > BigInt(0) && active === true;

      if (hasDeposit) {
        // User has deposits, redirect to dashboard
        router.push("/dashboard");
      } else {
        // New user, redirect to deposit onboarding
        router.push("/deposit");
      }
    } else {
      // No position data, assume new user
      router.push("/deposit");
    }
  }, [isConnected, isLoading, position, router]);

  // Show loading state while checking position
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <div className="space-y-4 text-center">
        <Skeleton className="size-12 mx-auto" />
        <p className="text-muted-foreground">Checking your position...</p>
      </div>
    </div>
  );
}
