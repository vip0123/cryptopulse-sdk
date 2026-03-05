# @cryptopulse/sdk

[![npm](https://img.shields.io/npm/v/@cryptopulse/sdk)](https://www.npmjs.com/package/@cryptopulse/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Official SDK for **[CryptoPulse](https://cryptopulse.uno)** — Real-time whale wallet tracker across 34+ EVM chains.

Track whale movements, analyze wallets, and get AI-powered insights — all from a simple API.

## Install

```bash
npm install @cryptopulse/sdk
```

## Quick Start

```typescript
import { CryptoPulse } from '@cryptopulse/sdk';

const cp = new CryptoPulse({ apiKey: 'your-api-key' });

// Get recent whale movements
const whales = await cp.getWhales({ chain: 'ethereum', limit: 10 });
console.log(whales.data);

// Look up a wallet
const wallet = await cp.getWallet('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log(wallet);

// AI roast a wallet 🔥
const roast = await cp.roastWallet('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log(roast.roast);
```

## API Reference

### `new CryptoPulse(config?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | — | Your API key from [cryptopulse.uno](https://cryptopulse.uno) |
| `baseUrl` | `string` | `https://cryptopulse.uno` | API base URL |
| `timeout` | `number` | `10000` | Request timeout in ms |

### Methods

| Method | Description |
|--------|-------------|
| `getWhales({ chain?, limit?, page? })` | Recent whale movements |
| `getWallet(address)` | Wallet details + recent activity |
| `getChains()` | List supported chains |
| `getMarket()` | Market overview & stats |
| `roastWallet(address)` | AI-generated wallet roast 🔥 |
| `narrateWallet(address)` | AI narrative of wallet activity |

## Supported Chains

Ethereum, BSC, Polygon, Arbitrum, Optimism, Base, Avalanche, Fantom, and 26+ more EVM chains.

## Get an API Key

Sign up at [cryptopulse.uno](https://cryptopulse.uno) to get your free API key.

## License

MIT © [CryptoPulse](https://cryptopulse.uno)
