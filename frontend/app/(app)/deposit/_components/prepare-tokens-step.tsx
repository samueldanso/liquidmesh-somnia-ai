"use client";

import { CheckCircle, Info, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { parseUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_USDC_ABI, WRAPPED_STT_ABI } from "@/lib/abis";
import { CONTRACTS } from "@/lib/contracts";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";

export function PrepareTokensStep() {
  const { address, isConnected } = useAccount();

  const {
    wsttAmount,
    usdcAmount,
    setWsttAmount,
    setUsdcAmount,
    setWrapCompleted,
    setMintCompleted,
    setCurrentStep,
    wrapCompleted,
    mintCompleted,
  } = useOnboardingStore();

  // Contract interactions
  const { writeContract: writeWrappedSTT, data: wrapHash } = useWriteContract();
  const { writeContract: writeMockUSDC, data: mintHash } = useWriteContract();

  // Transaction receipts
  const { isLoading: isWrapping, isSuccess: isWrapSuccess } =
    useWaitForTransactionReceipt({
      hash: wrapHash,
    });
  const { isLoading: isMinting, isSuccess: isMintSuccess } =
    useWaitForTransactionReceipt({
      hash: mintHash,
    });

  // Update store when transactions complete
  useEffect(() => {
    if (isWrapSuccess) setWrapCompleted(true);
  }, [isWrapSuccess, setWrapCompleted]);

  useEffect(() => {
    if (isMintSuccess) setMintCompleted(true);
  }, [isMintSuccess, setMintCompleted]);

  const handleWrapSTT = async () => {
    if (!address || !wsttAmount) return;

    try {
      const amount = parseUnits(wsttAmount, 18);
      await writeWrappedSTT({
        address: CONTRACTS.WrappedSTT,
        abi: WRAPPED_STT_ABI,
        functionName: "deposit",
        value: amount,
      });
      toast.success("STT wrapping initiated");
    } catch (error) {
      toast.error("Failed to wrap STT");
      console.error("Wrap STT error:", error);
    }
  };

  const handleMintUSDC = async () => {
    if (!address || !usdcAmount) return;

    try {
      const amount = parseUnits(usdcAmount, 6);
      await writeMockUSDC({
        address: CONTRACTS.MockUSDC,
        abi: MOCK_USDC_ABI,
        functionName: "mint",
        args: [address, amount],
      });
      toast.success("USDC minting initiated");
    } catch (error) {
      toast.error("Failed to mint USDC");
      console.error("Mint USDC error:", error);
    }
  };


  const canContinue = wrapCompleted && mintCompleted && wsttAmount && usdcAmount;

  const handleContinue = () => {
    if (canContinue) {
      setCurrentStep(2);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prepare Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please connect your wallet to prepare tokens
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prepare Your Tokens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="size-4" />
          <AlertDescription>
            Before depositing, you need to prepare your tokens. Wrap STT to
            wSTT and mint test USDC. Token approvals will be handled automatically when you deposit.
          </AlertDescription>
        </Alert>

        {/* Wrap STT */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="wstt-amount">Wrap STT to wSTT</Label>
            {wrapCompleted && <CheckCircle className="size-4 text-green-600" />}
          </div>
          <div className="flex gap-2">
            <Input
              id="wstt-amount"
              type="number"
              placeholder="0.0"
              value={wsttAmount}
              onChange={(e) => setWsttAmount(e.target.value)}
              disabled={isWrapping || wrapCompleted}
            />
            <Button
              onClick={handleWrapSTT}
              disabled={isWrapping || !wsttAmount || wrapCompleted}
              size="sm"
              variant="outline"
            >
              {isWrapping ? (
                <Loader2 className="size-4 animate-spin" />
              ) : wrapCompleted ? (
                <CheckCircle className="size-4" />
              ) : (
                "Wrap"
              )}
            </Button>
          </div>
        </div>

        {/* Mint USDC */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="usdc-amount">Mint Test USDC</Label>
            {mintCompleted && <CheckCircle className="size-4 text-green-600" />}
          </div>
          <div className="flex gap-2">
            <Input
              id="usdc-amount"
              type="number"
              placeholder="0.0"
              value={usdcAmount}
              onChange={(e) => setUsdcAmount(e.target.value)}
              disabled={isMinting || mintCompleted}
            />
            <Button
              onClick={handleMintUSDC}
              disabled={isMinting || !usdcAmount || mintCompleted}
              size="sm"
              variant="outline"
            >
              {isMinting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : mintCompleted ? (
                <CheckCircle className="size-4" />
              ) : (
                "Mint"
              )}
            </Button>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          variant="gradient"
          size="lg"
          className="w-full px-8 py-3 rounded-md text-base font-medium"
        >
          Continue to Deposit
        </Button>
      </CardContent>
    </Card>
  );
}
