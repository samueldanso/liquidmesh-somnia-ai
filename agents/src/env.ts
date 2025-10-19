// Environment Configuration
// Environment variables for LiquidMesh agents

export const env = {
	// OpenAI Configuration
	OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',

	// Supabase Configuration
	SUPABASE_URL: process.env.SUPABASE_URL || '',
	SUPABASE_KEY: process.env.SUPABASE_KEY || '',

	// Somnia Configuration
	SOMNIA_RPC_URL: process.env.SOMNIA_RPC_URL || 'https://rpc.somnia.network',
	SOMNIA_CHAIN_ID: process.env.SOMNIA_CHAIN_ID || '1',

	// Wallet Configuration
	PRIVATE_KEY: process.env.PRIVATE_KEY || '',
	WALLET_ADDRESS: process.env.WALLET_ADDRESS || '',

	// Server Configuration
	PORT: process.env.PORT || '8000',

	// Agent Configuration
	AGENT_INTERVAL: process.env.AGENT_INTERVAL || '300000', // 5 minutes
	MAX_GAS_PRICE: process.env.MAX_GAS_PRICE || '1000000000', // 1 gwei
}
