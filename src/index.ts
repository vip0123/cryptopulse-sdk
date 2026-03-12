import type {
  CryptoPulseConfig,
  WhaleMovement,
  WhaleParams,
  WhaleResponse,
  WalletInfo,
  WalletParams,
  Chain,
  ChainsResponse,
  MarketOverview,
  DexSwap,
  DexParams,
  DexResponse,
  RoastResult,
  NarratorResult,
  SmartMoneyScore,
  BotStatus,
  BotSignal,
  BotSignalsResponse,
  ApiKey,
  GiveawayEntry,
  GiveawayStatus,
  ReferralInfo,
} from './types';

export * from './types';

export class CryptoPulse {
  private baseUrl: string;
  private apiKey?: string;
  private timeout: number;

  constructor(config: CryptoPulseConfig = {}) {
    this.baseUrl = (config.baseUrl || 'https://cryptopulse.uno').replace(/\/$/, '');
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 15000;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.apiKey ? { 'x-api-key': this.apiKey } : {}),
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        headers: { ...headers, ...(options.headers as Record<string, string>) },
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`CryptoPulse API ${res.status}: ${body || res.statusText}`);
      }

      return res.json() as Promise<T>;
    } finally {
      clearTimeout(timer);
    }
  }

  private qs(params: Record<string, any>): string {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) q.set(k, String(v));
    }
    const s = q.toString();
    return s ? `?${s}` : '';
  }

  // ═══════════════════════════════════════════════════════════
  // 🐋 Whale Movements
  // ═══════════════════════════════════════════════════════════

  /** Get recent whale movements across all chains or filtered by chain */
  async getWhales(params?: WhaleParams): Promise<WhaleResponse> {
    return this.request(`/api/whales${this.qs(params || {})}`);
  }

  // ═══════════════════════════════════════════════════════════
  // 🔍 Wallet Lookup
  // ═══════════════════════════════════════════════════════════

  /** Look up a wallet address — supports multichain scanning */
  async getWallet(address: string, params?: WalletParams): Promise<WalletInfo> {
    return this.request(`/api/wallet/${address}${this.qs(params || {})}`);
  }

  // ═══════════════════════════════════════════════════════════
  // ⛓️ Chains
  // ═══════════════════════════════════════════════════════════

  /** List all supported blockchain networks */
  async getChains(): Promise<ChainsResponse> {
    return this.request('/api/chains');
  }

  // ═══════════════════════════════════════════════════════════
  // 📊 Market
  // ═══════════════════════════════════════════════════════════

  /** Get market overview (market cap, volume, fear/greed, prices) */
  async getMarket(): Promise<MarketOverview> {
    return this.request('/api/market');
  }

  // ═══════════════════════════════════════════════════════════
  // 🔄 DEX
  // ═══════════════════════════════════════════════════════════

  /** Get DEX swaps or trending tokens */
  async getDex(params?: DexParams): Promise<DexResponse> {
    return this.request(`/api/dex${this.qs(params || {})}`);
  }

  // ═══════════════════════════════════════════════════════════
  // 🤖 AI Features
  // ═══════════════════════════════════════════════════════════

  /** AI-powered wallet roast — get a humorous degen score */
  async roastWallet(address: string): Promise<RoastResult> {
    return this.request('/api/roast', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }

  /** AI narrator — get a plain-English summary of wallet activity */
  async narrateWallet(address: string): Promise<NarratorResult> {
    return this.request('/api/narrator', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 🧠 Smart Money
  // ═══════════════════════════════════════════════════════════

  /** Get smart money score for a wallet */
  async getSmartMoney(address: string): Promise<SmartMoneyScore> {
    return this.request(`/api/smart-money${this.qs({ address })}`);
  }

  // ═══════════════════════════════════════════════════════════
  // 📈 Trading Bot
  // ═══════════════════════════════════════════════════════════

  /** Get public bot performance status */
  async getBotStatus(): Promise<BotStatus> {
    return this.request('/api/bot/status');
  }

  /** Get trading signals (requires API key with Trader+ plan) */
  async getBotSignals(): Promise<BotSignalsResponse> {
    return this.request('/api/bot/signals');
  }

  // ═══════════════════════════════════════════════════════════
  // 🔑 API Keys
  // ═══════════════════════════════════════════════════════════

  /** List your API keys (requires authentication) */
  async getApiKeys(): Promise<{ keys: ApiKey[] }> {
    return this.request('/api/keys');
  }

  /** Create a new API key */
  async createApiKey(name: string): Promise<ApiKey> {
    return this.request('/api/keys', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 🎁 Giveaway
  // ═══════════════════════════════════════════════════════════

  /** Get current giveaway status */
  async getGiveaway(): Promise<GiveawayStatus> {
    return this.request('/api/giveaway');
  }

  /** Enter a giveaway */
  async enterGiveaway(wallet: string, email?: string, referralCode?: string): Promise<GiveawayEntry> {
    return this.request('/api/giveaway', {
      method: 'POST',
      body: JSON.stringify({ wallet, email, referralCode }),
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 🔗 Referral
  // ═══════════════════════════════════════════════════════════

  /** Get your referral info and stats */
  async getReferral(): Promise<ReferralInfo> {
    return this.request('/api/referral');
  }
}

export default CryptoPulse;
