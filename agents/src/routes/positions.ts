import { Hono } from "hono";
import { getMockLiquidityPositions, getMockPoolMetrics } from "../data";
import type { Environment } from "../env";

const positionsRouter = new Hono<Environment>();

positionsRouter.get("/", async (c) => {
	const positions = getMockLiquidityPositions();
	return c.json({ positions });
});

positionsRouter.get("/pools", async (c) => {
	const pools = getMockPoolMetrics();
	return c.json({ pools });
});

export { positionsRouter };
