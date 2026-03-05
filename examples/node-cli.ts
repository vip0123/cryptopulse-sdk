import { CryptoPulse } from '../src';

const cp = new CryptoPulse({ apiKey: process.env.CRYPTOPULSE_API_KEY });

async function watchWhales() {
  console.log('🐋 CryptoPulse Whale Monitor\n');

  const poll = async () => {
    const { data } = await cp.getWhales({ limit: 3 });
    console.clear();
    console.log('🐋 CryptoPulse — Latest Whale Moves\n');
    console.log('Chain        | Token    | Value          | Type');
    console.log('-------------|----------|----------------|--------');
    for (const w of data) {
      console.log(
        `${w.chain.padEnd(13)}| ${w.token.padEnd(9)}| $${w.amountUsd.toLocaleString().padEnd(15)}| ${w.type}`
      );
    }
    console.log(`\nUpdated: ${new Date().toLocaleTimeString()}`);
  };

  await poll();
  setInterval(poll, 60_000);
}

watchWhales().catch(console.error);
