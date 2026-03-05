import { CryptoPulse } from '../src';

async function main() {
  const cp = new CryptoPulse({ apiKey: process.env.CRYPTOPULSE_API_KEY });

  // Fetch latest whale moves
  const whales = await cp.getWhales({ limit: 5 });
  console.log(`🐋 ${whales.total} whale movements tracked\n`);

  for (const w of whales.data) {
    console.log(`  ${w.chain} | ${w.token} | $${w.amountUsd.toLocaleString()} | ${w.type}`);
  }

  // List chains
  const chains = await cp.getChains();
  console.log(`\n🔗 ${chains.length} chains supported`);
}

main().catch(console.error);
