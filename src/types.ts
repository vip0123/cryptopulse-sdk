export interface CryptoPulseConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
}

// ═══════════════════════════════════════════════════════════════
// Whale Movements
// ═══════════════════════════════════════════════════════════════

export interface WhaleMovement {
  hash: string;
  chain: string;
  chainName?: string;
  from: string;
  to: string;
  fromLabel?: string;
  toLabel?: string;
  tokenSymbol: string;
  tokenAddress?: string;
  value: string;
  valueUSD: number;
  type: "buy" | "sell" | "transfer";
  timestamp: number;
  explorerUrl?: string;
}

export interface WhaleParams {
  chain?: string;
  limit?: number;
  period?: "1h" | "6h" | "24h" | "7d" | "30d";
}

export interface WhaleResponse {
  transactions: WhaleMovement[];
  stats: {
    totalBuys: number;
    totalSells: number;
    totalTransfers: number;
    totalVolumeUSD: number;
  };
}

// ═══════════════════════════════════════════════════════════════
// Wallet
// ═══════════════════════════════════════════════════════════════

export interface WalletParams {
  chain?: string;
  multichain?: boolean;
}

export interface WalletConnection {
  address: string;
  label?: string;
  direction: string;
  count: number;
}

export interface WalletTransaction {
  hash: string;
  chain: string;
  from: string;
  to: string;
  fromLabel?: string;
  toLabel?: string;
  tokenSymbol: string;
  value: string;
  valueUSD: number;
  type: string;
  direction: "in" | "out";
  timestamp: number;
  explorerUrl?: string;
}

export interface WalletInfo {
  address: string;
  label?: string;
  totalValueUSD?: number;
  chains: string[];
  smartMoneyScore?: number;
  tags: string[];
  transactions: WalletTransaction[];
  connections: {
    topInteractions: WalletConnection[];
  };
  chainBreakdown?: Record<string, { balance: number; txCount: number }>;
}

// ═══════════════════════════════════════════════════════════════
// Chains
// ═══════════════════════════════════════════════════════════════

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  category: string;
  active?: boolean;
  whaleCount?: number;
}

export interface ChainsResponse {
  chains: Chain[];
}

// ═══════════════════════════════════════════════════════════════
// Market
// ═══════════════════════════════════════════════════════════════

export interface MarketOverview {
  marketCap: string;
  volume24h: string;
  btcDominance: string;
  fearGreed: { value: number; label: string };
  prices: Record<string, { price: number; change24h: number }>;
}

// ═══════════════════════════════════════════════════════════════
// DEX
// ═══════════════════════════════════════════════════════════════

export interface DexSwap {
  hash: string;
  chain: string;
  wallet: string;
  walletLabel?: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  valueUSD: number;
  dex: string;
  timestamp: number;
  explorerUrl?: string;
}

export interface DexParams {
  mode?: "swaps" | "trending";
  chain?: string;
  period?: "1h" | "6h" | "24h" | "7d" | "30d";
}

export interface DexResponse {
  swaps?: DexSwap[];
  trending?: Array<{
    token: string;
    symbol: string;
    buyCount: number;
    sellCount: number;
    volumeUSD: number;
    topBuyers: Array<{ label: string; wallet: string; usd: number }>;
  }>;
}

// ═══════════════════════════════════════════════════════════════
// AI Features
// ═══════════════════════════════════════════════════════════════

export interface RoastResult {
  address: string;
  roast: string;
  score: number;
  title: string;
}

export interface NarratorResult {
  address: string;
  narrative: string;
}

// ═══════════════════════════════════════════════════════════════
// Smart Money
// ═══════════════════════════════════════════════════════════════

export interface SmartMoneyScore {
  address: string;
  score: number;
  breakdown: {
    winRate: number;
    timing: number;
    sizeConsistency: number;
    networkIntel: number;
  };
  tier: string;
}

// ═══════════════════════════════════════════════════════════════
// Trading Bot
// ═══════════════════════════════════════════════════════════════

export interface BotStatus {
  version: string;
  active: boolean;
  performance: {
    totalPnlPct: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    sharpe: number;
    totalTrades: number;
  };
  lastEvolution: string;
  pair: string;
}

export interface BotSignal {
  id: string;
  pair: string;
  direction: "BUY" | "SELL";
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  confidence?: number;
  timestamp: number;
  tier: string;
  delayed?: boolean;
  available_in?: string;
}

export interface BotSignalsResponse {
  signals: BotSignal[];
  openPositions?: Array<{
    pair: string;
    direction: string;
    entryPrice: number;
    currentPrice: number;
    pnlPct: number;
    holdTimeHours: number;
  }>;
  closedTrades?: Array<{
    pair: string;
    direction: string;
    pnlPct: number;
    closedAt: number;
  }>;
}

// ═══════════════════════════════════════════════════════════════
// API Keys
// ═══════════════════════════════════════════════════════════════

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  createdAt: string;
  lastUsed?: string;
  rateLimit: number;
}

// ═══════════════════════════════════════════════════════════════
// Giveaway
// ═══════════════════════════════════════════════════════════════

export interface GiveawayEntry {
  id: string;
  wallet: string;
  email?: string;
  referralCode?: string;
  entries: number;
  createdAt: string;
}

export interface GiveawayStatus {
  active: boolean;
  prize: string;
  endsAt: string;
  totalEntries: number;
}

// ═══════════════════════════════════════════════════════════════
// Referral
// ═══════════════════════════════════════════════════════════════

export interface ReferralInfo {
  code: string;
  referrals: number;
  earnings: number;
  link: string;
}

// ═══════════════════════════════════════════════════════════════
// Generic
// ═══════════════════════════════════════════════════════════════

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
