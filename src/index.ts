import type {
  CryptoPulseConfig,
  WhaleMovement,
  WalletInfo,
  Chain,
  MarketOverview,
  RoastResult,
  NarratorResult,
  PaginatedResponse,
} from './types';

export * from './types';

export class CryptoPulse {
  private baseUrl: string;
  private apiKey?: string;
  private timeout: number;

  constructor(config: CryptoPulseConfig = {}) {
    this.baseUrl = (config.baseUrl || 'https://cryptopulse.uno').replace(/\/$/, '');
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 10000;
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

  /** Get recent whale movements, optionally filtered by chain */
  async getWhales(params?: { chain?: string; limit?: number; page?: number }): Promise<PaginatedResponse<WhaleMovement>> {
    const q = new URLSearchParams();
    if (params?.chain) q.set('chain', params.chain);
    if (params?.limit) q.set('limit', String(params.limit));
    if (params?.page) q.set('page', String(params.page));
    const qs = q.toString();
    return this.request(`/api/whales${qs ? `?${qs}` : ''}`);
  }

  /** Look up a specific wallet */
  async getWallet(address: string): Promise<WalletInfo> {
    return this.request(`/api/wallet/${address}`);
  }

  /** List all supported chains */
  async getChains(): Promise<Chain[]> {
    return this.request('/api/chains');
  }

  /** Get market overview */
  async getMarket(): Promise<MarketOverview> {
    return this.request('/api/market');
  }

  /** AI-powered wallet roast */
  async roastWallet(address: string): Promise<RoastResult> {
    return this.request('/api/roast', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }

  /** AI narrator for wallet activity */
  async narrateWallet(address: string): Promise<NarratorResult> {
    return this.request('/api/narrator', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }
}

export default CryptoPulse;
