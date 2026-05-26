export interface PlanLimits {
  tier: 'FREE';
  allowAI: boolean;
  allowRAG: boolean;
  ragK: number;
  allowCustomPrompts: boolean;
  allowOrg: boolean;
  cooldownMinutes: number;
  monthlyReviewsLimit: number;
}

export function getPlanLimits(_planId: number | null, _expiresAt?: Date | null): PlanLimits {
  return {
    tier: 'FREE',
    allowAI: true,
    allowRAG: true,
    ragK: 16,
    allowCustomPrompts: true,
    allowOrg: true,
    cooldownMinutes: 0,
    monthlyReviewsLimit: Infinity,
  };
}

