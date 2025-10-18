# LiquidMesh - Web

A modern, production-ready starter template for building decentralized applications with sensible defaults.


## ✨ Features

-   **Next.js 15** with App Router and React 19
-   **Web3 Integration** with Wagmi v2 and Privy
-   **React Query** for data fetching
-   **Somnia Network** support (Tesnet)
-   **TypeScript** for type safety
-   **Tailwind CSS** with theming and dark mode support
-   **Shadcn/ui** for a large range of fully customizable and themable components
-   **Error Boundaries** for graceful error handling

## 🚀 Quick Start

1. **Clone or use as template**

    ```bash
    git clone https://github.com/samueldanso/web3-app-template.git
    cd liquidmesh-somnia-ai
    ```

2. **Install dependencies**

    ```bash
    bun install
    ```

3. **Set up environment variables**

    ```bash
    cp .env-example .env
    ```

    Fill in your environment variables:

    - `NEXT_PUBLIC_PRIVY_APP_ID`: Get from [Privy](https://dashboard.privy.io/)
    - `NEXT_PUBLIC_CHAIN_ID`: Use `11155111` for Sepolia or `1` for Mainnet

4. **Start development server**

    ```bash
    bun dev
    ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

-   `bun dev` - Start development server with Turbopack
-   `bun build` - Build for production
-   `bun start` - Start production server
-   `bun lint` - Run biome lint
-   `bun format` - Run biome format
-   `bun check` - Run biome format and lint
-   `bun type-check` - Run TypeScript type checking

### Web3 Integration

The template includes examples of Web3 integration:

-   Wallet connection with RainbowKit
-   Balance fetching with custom hooks
-   Chain switching and network detection
-   Error handling for Web3 operations

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

## 📚 Documentation

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Wagmi Documentation](https://wagmi.sh)
-   [Privy Documentation](https://docs.privy.io/basics/react/installation)
-   [Shadcn/ui Documentation](https://ui.shadcn.com)
