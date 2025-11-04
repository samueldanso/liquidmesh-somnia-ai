# LiquidMesh Onboarding & Deposit Flow Redesign Plan

## 📋 Current State Analysis

### Issues Identified

1. **Deposit page shows everything at once** - All actions (wrap, mint, approve, deposit, automation) visible simultaneously
2. **No step-by-step guidance** - Users don't know what to do first
3. **No routing logic** - Doesn't check if user has existing deposits/positions
4. **Missing context** - No instructions or information boxes explaining each step
5. **Poor UX flow** - Users can get lost in the current interface

### Current Structure

-   `/deposit` - Shows all forms at once (Prepare Tokens, Deposit, Withdraw, Automation)
-   `/dashboard` - Shows agent activity, positions, stats
-   No check for existing positions before routing

---

## 🎯 Proposed Solution

### 1. Entry Point & Routing Logic

**Decision Tree:**

```
User lands on protected route (/app)
  ↓
Check wallet connection
  ↓
If not connected → Show connect wallet prompt
  ↓
If connected → Check if user has position (vault.getPosition(address))
  ↓
  ├─ Has position (lpTokens > 0 && active) → Redirect to /dashboard
  └─ No position → Redirect to /deposit (onboarding flow)
```

**Implementation:**

-   Create a root `/app` page that handles routing logic
-   Use `useReadContract` to call `vault.getPosition(address)`
-   Check `lpTokens > 0` and `active === true` to determine if user has deposits

### 2. Step-by-Step Deposit Flow

**Three-Step Process (similar to ARMA):**

#### Step 1: Prepare Tokens

-   **Purpose:** Get tokens ready for deposit
-   **Actions:**
    -   Wrap STT to wSTT
    -   Mint test USDC
    -   Approve wSTT for vault
    -   Approve USDC for vault
-   **UI:**
    -   Single focused card showing only preparation actions
    -   Clear instructions: "Prepare your tokens before depositing"
    -   Info box explaining why each step is needed
    -   Progress indicators showing completion status (✓ for each completed action)
    -   "Continue" button appears when all approvals are done

#### Step 2: Deposit Liquidity

-   **Purpose:** Deposit tokens into vault
-   **Actions:**
    -   Enter deposit amounts (wSTT and USDC)
    -   Show current balances
    -   Show minimum deposit requirements
    -   Execute deposit transaction
-   **UI:**
    -   Clean deposit form with amount inputs
    -   Balance display
    -   Info box with minimum deposit info
    -   "Deposit" button (disabled until amounts valid)
    -   Success state with "Continue to Automation" button

#### Step 3: Enable Automation

-   **Purpose:** Activate AI agents
-   **Actions:**
    -   Configure automation settings (interval, cooldown)
    -   Start automation
    -   Redirect to dashboard on success
-   **UI:**
    -   Automation configuration form
    -   Info box explaining automation benefits
    -   "Enable Automation" button
    -   On success → Redirect to `/dashboard`

### 3. Progress Indicator Component

**Visual Design (like ARMA):**

```
[Step 1: Prepare] → [Step 2: Deposit] → [Step 3: Activate]
   ✓ (green)          ✓ (green)           ○ (gray)
```

**Features:**

-   Shows current step (highlighted)
-   Completed steps (checkmark)
-   Upcoming steps (grayed out)
-   Clickable completed steps (allow going back)

### 4. UI/UX Improvements

**Context & Information:**

-   Add info boxes at each step explaining:
    -   What this step does
    -   Why it's necessary
    -   What happens next
-   Use `Alert` component with info variant for instructions
-   Show minimum requirements clearly
-   Display gas fee estimates (if applicable)

**State Management:**

-   Use React state to track current step
-   Track completion status of each action (wrap, mint, approve, deposit)
-   Persist step progress (optional - can use localStorage)

**Visual Hierarchy:**

-   Only show current step's UI (hide others)
-   Use card-based layout for each step
-   Consistent spacing and typography
-   Use gradient buttons for primary actions

---

## 🛠️ Technical Implementation Plan

### Components to Create

1. **`StepProgressIndicator`** - Progress bar component

    ```tsx
    interface Step {
    	id: number
    	title: string
    	status: 'completed' | 'current' | 'upcoming'
    }
    ```

2. **`PrepareTokensStep`** - Step 1 component

    - Extract from current DepositForm
    - Add completion tracking
    - Add info boxes

3. **`DepositStep`** - Step 2 component

    - Clean deposit form
    - Balance display
    - Validation

4. **`AutomationStep`** - Step 3 component (already exists, needs refinement)

    - Add info context
    - Better success handling

5. **`OnboardingLayout`** - Wrapper for step-based flow
    - Contains progress indicator
    - Manages step state
    - Handles navigation between steps

### Routing Logic

**New `/app/page.tsx`:**

```tsx
// Check if user has position
const { data: position } = useReadContract({
	address: CONTRACTS.LiquidityVault,
	abi: LIQUIDITY_VAULT_ABI,
	functionName: 'getPosition',
	args: address ? [address] : undefined,
})

// Route based on position
useEffect(() => {
	if (isConnected && position) {
		const hasDeposit = position.lpTokens > 0n && position.active
		if (hasDeposit) {
			router.push('/dashboard')
		} else {
			router.push('/deposit')
		}
	}
}, [isConnected, position, router])
```

### Libraries & Approaches

**State Management:**

-   React `useState` for step management (simple, no need for Zustand here)
-   React Query for contract reads (already in use)

**UI Components:**

-   Shadcn/ui components (Card, Alert, Button, Progress)
-   Custom progress indicator component
-   Existing LiquidGlassCard for consistency

**Step Navigation:**

-   Forward-only navigation (can't skip steps)
-   Auto-advance on completion (optional)
-   Manual "Continue" button for better UX

---

## 📐 Component Structure

```
app/(app)/
├── page.tsx                    # Entry point with routing logic
├── deposit/
│   ├── page.tsx                # Step-based deposit flow
│   └── _components/
│       ├── step-progress.tsx   # Progress indicator
│       ├── prepare-tokens-step.tsx
│       ├── deposit-step.tsx
│       ├── automation-step.tsx (refactored)
│       └── onboarding-layout.tsx
└── dashboard/
    └── page.tsx                # Existing dashboard
```

---

## ✅ Success Criteria

1. ✅ New users see step-by-step onboarding
2. ✅ Existing users with positions go straight to dashboard
3. ✅ Each step is clear and focused
4. ✅ Progress is visible and understandable
5. ✅ Context and instructions provided at each step
6. ✅ Clean, modern UI matching ARMA/agentathon examples
7. ✅ Smooth transitions between steps
8. ✅ No overwhelming information dump

---

## 🎨 Design Inspiration

**ARMA Flow:**

-   Step indicator at top
-   Single focused card per step
-   Clear instructions in info boxes
-   Minimum deposit requirements shown
-   "Continue" button for progression

**Key Elements to Adopt:**

-   Progress indicator with checkmarks
-   Info boxes with instructions
-   Clean, focused UI per step
-   Success states with auto-redirect
-   Contextual help text

---

## 📝 Next Steps

1. **Review & Approve** this plan
2. **Implement routing logic** in `/app/page.tsx`
3. **Create step components** with progress tracking
4. **Refactor deposit page** to use step-based flow
5. **Add context/info boxes** at each step
6. **Test flow** with new and existing users
7. **Polish UI** to match design system

---

## Questions for Clarification

1. Should we allow users to go back to previous steps? (Recommendation: Yes, for flexibility)
2. Should we persist step progress in localStorage? (Recommendation: No, keep it simple)
3. Minimum deposit amount? (Need to check contract or set a reasonable default)
4. Should automation step be mandatory? (Recommendation: Yes, for full onboarding)
5. Should we show a "Skip" option for automation? (Recommendation: No, keep it as final step)

---

**Ready for implementation once approved!** 🚀
