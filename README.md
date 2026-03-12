# CryptoPulse SDK

> Official TypeScript/JavaScript SDK for the [CryptoPulse](https://cryptopulse.uno) API — real-time whale tracking across 34+ EVM chains.

[![npm](https://img.shields.io/npm/v/@cryptopulse/sdk)](https://www.npmjs.com/package/@cryptopulse/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Install

```bash
npm install @cryptopulse/sdk
```

## Quick Start

```typescript
import CryptoPulse from '@cryptopulse/sdk';

const cp = new CryptoPulse({ apiKey: 'your-api-key' });

// Get whale movements
const whales = await cp.getWhales({ chain: 'ethereum', period: '24h', limit: 20 });
console.log(whales.transactions);

// Look up a wallet
const wallet = await cp.getWallet('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log(wallet.label, wallet.smartMoneyScore);
```

## API Coverage

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getWhales(params?)` | `GET /api/whales` | Whale movements (chain, period, limit filters) |
| `getWallet(address, params?)` | `GET /api/wallet/:address` | Wallet lookup with multichain support |
| `getChains()` | `GET /api/chains` | List all 34+ supported chains |
| `getMarket()` | `GET /api/market` | Market overview (cap, volume, fear/greed) |
| `getDex(params?)` | `GET /api/dex` | DEX swaps and trending tokens |
| `roastWallet(address)` | `POST /api/roast` | AI-powered wallet roast with degen score |
| `narrateWallet(address)` | `POST /api/narrator` | AI plain-English wallet summary |
| `getSmartMoney(address)` | `GET /api/smart-money` | Smart money scoring (0-100) |
| `getBotStatus()` | `GET /api/bot/status` | Self-evolving trading bot performance |
| `getBotSignals()` | `GET /api/bot/signals` | Live trading signals (Trader+ plans) |
| `getApiKeys()` | `GET /api/keys` | List your API keys |
| `createApiKey(name)` | `POST /api/keys` | Create new API key |
| `getGiveaway()` | `GET /api/giveaway` | Current giveaway status |
| `enterGiveaway(wallet)` | `POST /api/giveaway` | Enter a giveaway |
| `getReferral()` | `GET /api/referral` | Referral stats and link |

## Examples

### Whale Tracking
```typescript
const cp = new CryptoPulse({ apiKey: 'your-key' });

// All chains, last hour
const recent = await cp.getWhales({ period: '1h' });

// Polygon only, last 7 days
const polygon = await cp.getWhales({ chain: 'polygon', period: '7d', limit: 50 });

for (const tx of polygon.transactions) {
  console.log(`${tx.type.toUpperCase()} ${tx.value} ${tx.tokenSymbol} ($${tx.valueUSD})`);
  console.log(`  ${tx.fromLabel || tx.from} → ${tx.toLabel || tx.to}`);
}
```

### Multichain Wallet Scan
```typescript
const wallet = await cp.getWallet('0x...', { multichain: true });
console.log(`Active on ${wallet.chains.length} chains`);
console.log(`Smart Money Score: ${wallet.smartMoneyScore}/100`);
console.log(`Top interactions:`, wallet.connections.topInteractions);
```

### DEX Intelligence
```typescript
// Recent swaps
const swaps = await cp.getDex({ mode: 'swaps', chain: 'ethereum', period: '24h' });

// Trending tokens by whale activity
const trending = await cp.getDex({ mode: 'trending', period: '7d' });
```

### Trading Bot Signals
```typescript
// Public performance (no key needed)
const status = await cp.getBotStatus();
console.log(`Bot ${status.version}: +${status.performance.totalPnlPct}% P&L`);

// Live signals (requires Trader+ API key)
const signals = await cp.getBotSignals();
for (const sig of signals.signals) {
  console.log(`${sig.direction} ${sig.pair} @ $${sig.entryPrice} (${sig.confidence}% confidence)`);
}
```

### AI Features
```typescript
// Roast a wallet
const roast = await cp.roastWallet('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log(`Score: ${roast.score}/100 — ${roast.title}`);
console.log(roast.roast);

// AI Narrator
const narrative = await cp.narrateWallet('0x...');
console.log(narrative.narrative);
```

## Configuration

```typescript
const cp = new CryptoPulse({
  apiKey: 'your-api-key',       // Required for rate-limited/paid endpoints
  baseUrl: 'https://cryptopulse.uno', // Default
  timeout: 15000,               // Request timeout in ms (default: 15s)
});
```

## Pricing & Rate Limits

| Plan | Price | Lookups/day | Signals | API Access |
|------|-------|------------|---------|------------|
| Free | $0 | 10 | Direction only (1h delay) | Read-only |
| Pro | $19/mo | Unlimited | Full, real-time | Full |
| Trader | $49/mo | Unlimited | Full + push alerts | Full |
| API | $99/mo | Unlimited | Full + webhooks + historical | Full |

Get your API key at [cryptopulse.uno/pricing](https://cryptopulse.uno/pricing)

## Links

- 🌐 [cryptopulse.uno](https://cryptopulse.uno)
- 📦 [npm](https://www.npmjs.com/package/@cryptopulse/sdk)
- 🐦 [@Cryptopulse_uno](https://x.com/Cryptopulse_uno)
- 💬 [Telegram](https://t.me/cryptopulse_uno)

## License

MIT
