import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(8000),
	SUPABASE_URL: z.string(),
	SUPABASE_KEY: z.string(),
	PRIVATE_KEY: z.string(),
	OPENAI_API_KEY: z.string(),
	SOMNIA_RPC_URL: z.string().default("https://dream-rpc.somnia.network"),
	CHAIN_ID: z.string().default("50312"),
	CHAIN_NAME: z.string().default("somnia-testnet"),
	MODEL_NAME: z.string().default("gpt-4o"),
	AGENT_INTERVAL: z.coerce.number().default(60000), // 1 minute
});

export const env = envSchema.parse(process.env);

export type Environment = {
	Bindings: z.infer<typeof envSchema>;
};

export default env;
