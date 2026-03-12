import CryptoPulse from '../src/index';

async function main() {
  const cp = new CryptoPulse({ apiKey: process.env.CRYPTOPULSE_API_KEY });

  // 1. Whale movements
  console.log('=== 🐋 Whale Movements (last 24h) ===');
  const whales = await cp.getWhales({ period: '24h', limit: 5 });
  for (const tx of whales.transactions) {
    console.log(`  ${tx.type.toUpperCase()} ${tx.value} ${tx.tokenSymbol} ($${tx.valueUSD.toLocaleString()}) on ${tx.chainName}`);
  }

  // 2. Wallet lookup
  console.log('\n=== 🔍 Wallet Lookup ===');
  const wallet = await cp.getWallet('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', { multichain: true });
  console.log(`  Label: ${wallet.label || 'Unknown'}`);
  console.log(`  Chains: ${wallet.chains.join(', ')}`);
  console.log(`  Smart Money Score: ${wallet.smartMoneyScore || 'N/A'}`);

  // 3. Market overview
  console.log('\n=== 📊 Market ===');
  const market = await cp.getMarket();
  console.log(`  Market Cap: ${market.marketCap}`);
  console.log(`  Fear/Greed: ${market.fearGreed.value} — ${market.fearGreed.label}`);

  // 4. Chains
  console.log('\n=== ⛓️ Supported Chains ===');
  const { chains } = await cp.getChains();
  console.log(`  ${chains.length} chains: ${chains.map(c => c.name).join(', ')}`);

  // 5. DEX trending
  console.log('\n=== 🔄 DEX Trending ===');
  const dex = await cp.getDex({ mode: 'trending', period: '24h' });
  if (dex.trending) {
    for (const t of dex.trending.slice(0, 5)) {
      console.log(`  ${t.symbol}: ${t.buyCount} buys / ${t.sellCount} sells ($${t.volumeUSD.toLocaleString()})`);
    }
  }

  // 6. Bot status
  console.log('\n=== 🤖 Alpha Bot ===');
  const bot = await cp.getBotStatus();
  console.log(`  Version: ${bot.version}`);
  console.log(`  P&L: +${bot.performance.totalPnlPct}% | Win Rate: ${bot.performance.winRate}%`);

  // 7. AI Roast
  console.log('\n=== 🔥 Roast My Wallet ===');
  const roast = await cp.roastWallet('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  console.log(`  Score: ${roast.score}/100 — ${roast.title}`);
  console.log(`  ${roast.roast.slice(0, 200)}...`);
}

main().catch(console.error);
