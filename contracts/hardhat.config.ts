import type { HardhatUserConfig } from 'hardhat/config'

import hardhatToolboxViemPlugin from '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-verify'
import { configVariable } from 'hardhat/config'

const config: HardhatUserConfig = {
	plugins: [hardhatToolboxViemPlugin],
	solidity: {
		profiles: {
			default: {
				version: '0.8.28',
			},
			production: {
				version: '0.8.28',
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				},
			},
		},
	},
	networks: {
		hardhatMainnet: {
			type: 'edr-simulated',
			chainType: 'l1',
		},
		hardhatOp: {
			type: 'edr-simulated',
			chainType: 'op',
		},
		somnia: {
			type: 'http',
			chainType: 'l1',
			url: 'https://dream-rpc.somnia.network',
			accounts: [configVariable('SOMNIA_PRIVATE_KEY')],
			chainId: 50312,
		},
	},
	sourcify: {
		enabled: false,
	},
	etherscan: {
		apiKey: {
			somnia: 'ETHERSCAN_API_KEY', // Placeholder - Shannon Explorer doesn't need real key
		},
		customChains: [
			{
				network: 'somnia',
				chainId: 50312,
				urls: {
					apiURL: 'https://shannon-explorer.somnia.network/api',
					browserURL: 'https://shannon-explorer.somnia.network',
				},
			},
		],
	},
}

export default config
