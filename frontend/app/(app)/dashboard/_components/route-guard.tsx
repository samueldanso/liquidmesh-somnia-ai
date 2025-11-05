"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { LIQUIDITY_VAULT_ABI } from "@/lib/abis";
import { CONTRACTS } from "@/lib/contracts";

export function DashboardRouteGuard() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const { data: position, isLoading } = useReadContract({
    address: CONTRACTS.LiquidityVault,
    abi: LIQUIDITY_VAULT_ABI,
    functionName: "getPosition",
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });

  useEffect(() => {
    if (!isConnected || !address) return; // wait for a real address
    if (isLoading) return;

    if (position) {
      const lpTokens = position[2];
      const active = position[9];
      const hasDeposit = lpTokens > BigInt(0) && active === true;
      if (!hasDeposit) router.replace("/deposit");
    } else {
      router.replace("/deposit");
    }
  }, [isConnected, address, isLoading, position, router]);

  // Minimal placeholder to avoid content flash while checking
  if (!isConnected || !address || isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Skeleton className="h-6 w-40" />
      </div>
    );
  }

  return null;
}
