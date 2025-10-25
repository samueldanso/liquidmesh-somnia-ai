import { app } from "./app";
import env from "./env";
import { walletAddress, watcherAgent } from "./setup";

console.log(`[🚀] Starting LiquidMesh agent loop for wallet: ${walletAddress}`);
watcherAgent.start(walletAddress);

export default {
	port: env.PORT || 8000,
	fetch: app.fetch,
};
