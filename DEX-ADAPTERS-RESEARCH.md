# DEX Adapters on Somnia — Research & Recommendation

Goal: Manage concentrated liquidity (CLM) on Somnia DEXes autonomously via AgentMesh. We need an on-chain adapter that can mint/burn/re-range liquidity positions and read pool state for strategies.

## Candidates Evaluated

-   Somnex (native Somnia DEX + aggregator)

    -   Overview: V2 (volatile), V3 (concentrated), Perp SPLP; aggregates other venues too.
    -   Docs:
        -   Overview: https://docs.somnex.xyz/overview
        -   Liquidity Layer (V2/V3/SPLP): https://docs.somnex.xyz/product-guides/liquidity-layer
        -   Fundamentals (security/contracts): https://docs.somnex.xyz/fundamentals
    -   Signals for adapter:
        -   V3-like CLM supported; routing layer exists.
        -   Likely Uniswap-style API surface (factory/router/quoter). Confirm position manager/pool ABIs.

-   Somnia Exchange (GingerLabs)

    -   Overview: V2 AMM, gamified DEX.
    -   Docs: https://somniaexchange.gitbook.io/nia/
        -   Testnet addresses page lists Factory/Router/WSTT for V2 stack.
    -   Signals for adapter:
        -   V2 router/factory documented on testnet → fastest path for a working demo.

-   QuickSwap on Somnia
    -   Overview: Multi-chain Uniswap fork; V2/V3 support on supported networks.
    -   Docs:
        -   Smart Contracts (V2/V3 modules): https://docs.quickswap.exchange/concepts/protocol-overview/03-smart-contracts
        -   API overview (data/subgraph; not required for transactions): https://docs.quickswap.exchange/technical-reference/api/api-overview
    -   Signals for adapter:
        -   If Somnia testnet V3 modules are deployed (factory, position manager, pool deployer, quoter, router), we can reuse standard flows.

## What We Need for CLM (V3-style)

-   Read: current price, tick spacing, tick↔price math, liquidity in range.
-   Write: approve tokens, mint (tokenId), increase/decrease liquidity, collect fees, burn.
-   Vault stores: position tokenId, venue, pair, fee tier, range, share accounting.

## Testnet Reality Check

-   Somnex: confirm V3 addresses on Somnia Testnet (docs list core modules; need position manager specifics).
-   Somnia Exchange: V2 testnet addresses confirmed → safest immediate venue.
-   QuickSwap: verify Somnia testnet V3 deployment; otherwise keep as secondary target.

## Recommendation (MVP → Iterative)

1. MVP Adapter v1 (ship now)

    - Venue: Somnia Exchange V2 (testnet).
    - Scope: approve → addLiquidity/removeLiquidity → LP receipt in Vault; explorer links.
    - Rationale: reliable testnet path; proves agent-triggered on-chain execution.

2. Adapter v2 (CLM proper)

    - Venue: Somnex V3 (preferred) or QuickSwap V3 once addresses confirmed.
    - Scope: Uniswap-V3-compatible position manager flows; tick math utilities.

3. UI
    - Keep “Curated Auto”; later add “Execution Venue” dropdown (Auto, SomniaEx V2, Somnex V3, QuickSwap V3).

## Adapter Interface (proposed)

```ts
export interface VenueAdapter {
	venueId: 'somnia-v2' | 'somnex-v3' | 'quickswap-v3'
	getPoolState(params: { token0: string; token1: string; fee?: number }): Promise<PoolState>
	ensureApprovals(params: {
		account: string
		token: string
		spender: string
		amount: bigint
	}): Promise<string>
	deposit(params: DepositParams): Promise<{ txHash: string; positionId?: bigint }>
	withdraw(params: WithdrawParams): Promise<{ txHash: string }>
	collectFees?(params: { positionId: bigint }): Promise<{ txHash: string }>
}
```

We will implement `somnia-v2` first, then `somnex-v3` behind the same interface.

## Curated Pair (initial)

-   wSTT / USDC on Somnia Testnet. Map to venue tokens as needed; if not present, use our test tokens in a test pool.

## Risks & Mitigations

-   V3 not available on testnet → fall back to SomniaEx V2 for MVP; keep V3 scaffold ready.
-   Token ratio/decimals → centralize token config; validate pre-tx.
-   Agent key exposure → minimal allowances; restrict spender per venue.

## Sources

-   Somnex Liquidity Layer: https://docs.somnex.xyz/product-guides/liquidity-layer
-   Somnex Overview: https://docs.somnex.xyz/overview
-   Somnex Fundamentals: https://docs.somnex.xyz/fundamentals
-   QuickSwap Smart Contracts: https://docs.quickswap.exchange/concepts/protocol-overview/03-smart-contracts
-   QuickSwap API Overview: https://docs.quickswap.exchange/technical-reference/api/api-overview
-   Somnia Exchange GitBook: https://somniaexchange.gitbook.io/nia/
