// Quotas and plan-based repo limits have been removed per project cleanup.
// Keep no-op helpers for compatibility with existing callers.

export class QuotaError extends Error {
  status: number;
  code: string;
  constructor(message: string, status = 402, code = 'REPO_LIMIT') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function assertRepoQuotaByInstallationId(_installationId: string) {
  // No-op: quotas removed
  return;
}

export async function assertRepoQuotaByGithubInstallationId(_githubInstallationId: number) {
  // No-op: quotas removed
  return;
}

export async function getRepoQuotaByInstallationId(installationId: string) {
  // Return a permissive quota structure to maintain compatibility
  return {
    installationId,
    githubInstallationId: null,
    planId: 0,
    planName: 'Unlimited',
    expiresAt: null,
    maxRepos: 1000000000,
    usedRepos: 0,
    remaining: 1000000000,
  };
}

export async function getRepoQuotaByGithubInstallationId(_githubInstallationId: number) {
  // No-op wrapper — callers can still invoke this
  return {
    installationId: 'unknown',
    githubInstallationId: _githubInstallationId,
    planId: 0,
    planName: 'Unlimited',
    expiresAt: null,
    maxRepos: 1000000000,
    usedRepos: 0,
    remaining: 1000000000,
  };
}
