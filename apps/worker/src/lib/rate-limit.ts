
import { db, apiUsageLogs } from '../../../api/src/db/index.js';
import { eq, and, gt, asc } from 'drizzle-orm';
import { PlanLimits } from './plans.js';

export class RateLimitError extends Error {
  resetAt?: Date;

  constructor(message: string, resetAt?: Date) {
    super(message);
    this.name = 'RateLimitError';
    this.resetAt = resetAt;
  }
}

export async function checkRateLimits(
  installationId: string,
  repositoryId: string,
  prNumber: number,
  commitSha: string,
  limits: PlanLimits
) {
  // Rate limiting and monthly review cycle removed — no-op for cleaned build.
  return;
}

export async function logReviewUsage(
  installationId: string,
  repositoryId: string,
  prNumber: number,
  commitSha: string
) {
  // Check if already logged to avoid duplicates (although checkRateLimits handles this check, concurrent requests might race)
  const query = `pr:${prNumber}:${commitSha}`;
  const service = 'review-run';
  
  const [existing] = await db
    .select()
    .from(apiUsageLogs)
    .where(and(
      eq(apiUsageLogs.installationId, installationId),
      eq(apiUsageLogs.repositoryId, repositoryId),
      eq(apiUsageLogs.apiService, service),
      eq(apiUsageLogs.query, query)
    ))
    .limit(1);
    
  if (existing) return;

  await db.insert(apiUsageLogs).values({
    installationId,
    repositoryId,
    apiService: service,
    query: query,
    tokensUsed: 0, // Placeholder
  });
}
