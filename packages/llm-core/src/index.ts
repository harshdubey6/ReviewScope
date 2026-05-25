// Types
export * from './types';

// Model budgets and selection
export {
  MODEL_CONTEXT_BUDGET,
  getContextBudget,
  isModelSupported,
} from './modelBudgets';

export {
  selectModel,
  getContextBudgetForModel,
  estimateCost,
  compareCosts,
  type ModelRoute,
} from './selectModel';

export type { Complexity } from './selectModel';

// Prompts
export {
  REVIEW_SYSTEM_PROMPT,
  PR_SUMMARY_SYSTEM_PROMPT,
  CHAT_SYSTEM_PROMPT,
  buildReviewPrompt,
  buildPRSummaryPrompt,
  parseReviewResponse,
  parsePRSummaryResponse,
  prioritizeComments,
  DEFAULT_MAX_COMMENTS,
  type ReviewComment,
  type ReviewResult,
  type PRSummaryResult,
  type RuleValidation,
  type RuleValidationStatus,
} from './prompts';

// Providers
import { OpenAIProvider } from './providers/openai';
import { GeminiProvider } from './providers/gemini';
import { SarvamProvider } from './providers/sarvam';

export { OpenAIProvider, GeminiProvider, SarvamProvider };

// Provider factory
import type { LLMProvider } from './types';

export type ProviderName = 'openai' | 'gemini' | 'sarvam';

export function createProvider(
  name: ProviderName,
  apiKey: string
): LLMProvider {
  switch (name) {
    case 'openai':
      return new OpenAIProvider(apiKey);

    case 'gemini':
      return new GeminiProvider(apiKey);

    case 'sarvam':
      return new SarvamProvider(apiKey);

    default:
      throw new Error(`Unknown provider: ${name}`);
  }
}