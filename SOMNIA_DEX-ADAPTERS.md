# DEX Adapters on Somnia — Implementation

This document summarizes the adapters implemented for Somnia DEXes and how they are wired into AgentMesh for autonomous liquidity management.

## Implemented

-   Somnia Exchange V2 (Testnet)
    -   Adapter: `agents/src/adapters/somnia-exchangev2.ts`
    -   Pattern: Uniswap V2-style Router (add/remove liquidity)
    -   Contracts (Testnet):
        -   wSTT: `0xF22eF0085fc511f70b01a68F360dCc56261F768a`
        -   Factory V2: `0x31015A978c58515EdE29D0F969a17e116BC1866B1`
        -   Router V2: `0xb98c15a0dC1e271132e341250703c7e94c059e8D`
    -   Supported operations:
        -   `ensureApprovals(token, spender, amount)`
        -   `deposit(token0, token1, amount0, amount1, to)`
        -   `withdraw(token0, token1, liquidity, to)`

## Prepared (stubs)

-   Somnex V3 (Concentrated Liquidity)
    -   Adapter: `agents/src/adapters/somnex-v3.ts`
    -   Status: Interface scaffolded; awaiting position manager/factory addresses on Somnia Testnet.
    -   Planned operations: mint/increase/decrease/collect via position manager.

-   QuickSwap V3
    -   Adapter: `agents/src/adapters/quickswap-v3.ts`
    -   Status: Interface scaffolded; to be wired when V3 modules are available on Somnia.

## Unified Adapter Interface

```ts
export interface VenueAdapter {
	venueId: 'somnia-v2' | 'somnex-v3' | 'quickswap-v3'
	getPoolState(params: { token0: string; token1: string; fee?: number }): Promise<PoolState>
	ensureApprovals(params: { token: string; owner: string; spender: string; amount: bigint }): Promise<string>
	deposit(params: DepositParams): Promise<{ txHash: string }>
	withdraw(params: WithdrawParams): Promise<{ txHash: string }>
}
```

## Wiring Guide

1. Choose venue adapter in the executor strategy (Somnia V2 by default).
2. Ensure tokens are approved for the venue spender (router or position manager).
3. Execute deposit/withdraw via adapter; surface explorer links in UI.
4. Store venue metadata in the vault (pair, venueId, optional positionId for V3).

## Curated Pair

-   wSTT / USDC on Somnia Testnet.

## Security & Limits

-   Use minimal, per-venue allowances.
-   Validate token decimals/ratios before execution.
-   Isolate the agent wallet and rotate keys for demos.

## References

-   Somnex Liquidity Layer: https://docs.somnex.xyz/product-guides/liquidity-layer
-   QuickSwap Smart Contracts: https://docs.quickswap.exchange/concepts/protocol-overview/03-smart-contracts
-   Somnia Exchange GitBook: https://somniaexchange.gitbook.io/nia/
