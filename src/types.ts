export interface CryptoPulseConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
}

export interface WhaleMovement {
  id: string;
  chain: string;
  from: string;
  to: string;
  token: string;
  amount: string;
  amountUsd: number;
  txHash: string;
  timestamp: string;
  type: 'transfer' | 'swap' | 'bridge';
}

export interface WalletInfo {
  address: string;
  label?: string;
  totalValueUsd: number;
  chains: string[];
  recentMoves: WhaleMovement[];
  tags: string[];
}

export interface Chain {
  id: string;
  name: string;
  active: boolean;
  whaleCount: number;
}

export interface MarketOverview {
  totalWhales: number;
  activeChains: number;
  last24hMoves: number;
  topChain: string;
  biggestMove: WhaleMovement;
}

export interface RoastResult {
  address: string;
  roast: string;
  score: number;
}

export interface NarratorResult {
  address: string;
  narrative: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
