#!/bin/bash

echo "🔍 Verifying all contracts on Somnia Testnet..."
echo ""

# WrappedSTT (No constructor args)
echo "1️⃣ Verifying WrappedSTT..."
npx hardhat verify --network somnia \
  0x7896B9A48690957f49973E1F8E19E7976BA4c929

echo ""

# MockUSDC (No constructor args)
echo "2️⃣ Verifying MockUSDC..."
npx hardhat verify --network somnia \
  0xF5875F25ccEB2edDc57F218eaF1F71c5CF161f21

echo ""

# LiquidityVault (Constructor: wSTT address, USDC address)
echo "3️⃣ Verifying LiquidityVault..."
npx hardhat verify --network somnia \
  0xE86feD31B02D1C9B14772098F3b0Dde78dbAcc9E \
  "0x7896B9A48690957f49973E1F8E19E7976BA4c929" \
  "0xF5875F25ccEB2edDc57F218eaF1F71c5CF161f21"

echo ""

# AgentExecutor (Constructor: Vault address)
echo "4️⃣ Verifying AgentExecutor..."
npx hardhat verify --network somnia \
  0x47E8e1031c066b9B51a56bDecFc5cF0c4935891c \
  "0xE86feD31B02D1C9B14772098F3b0Dde78dbAcc9E"

echo ""
echo "✅ All contracts verified!"
