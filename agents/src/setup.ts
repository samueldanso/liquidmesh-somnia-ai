import { privateKeyToAccount } from "viem/accounts";
import { registerAgents } from "./agents";
import { EventBus } from "./comms/event-bus";
import env from "./env";

// Initialize the event bus
const eventBus = new EventBus();

// Register the agents
const { executorAgent, watcherAgent, strategistAgent } =
	registerAgents(eventBus);

// Derive wallet address from private key
const account = privateKeyToAccount(env.PRIVATE_KEY as `0x${string}`);
const walletAddress = account.address;

export {
	eventBus,
	executorAgent,
	watcherAgent,
	strategistAgent,
	walletAddress,
};
