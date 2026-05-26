import { createHash } from 'crypto';
import type { EmbeddingOptions, EmbeddingProvider } from '@reviewscope/llm-core';

class LocalEmbeddingProvider implements EmbeddingProvider {
  name = 'local';
  defaultModel = 'local-hash-embedding';
  defaultSize = 768;

  async embed(text: string, options: EmbeddingOptions): Promise<number[]> {
    return this.embedText(text, options.dimensions || this.defaultSize);
  }

  async embedBatch(texts: string[], options: EmbeddingOptions): Promise<number[][]> {
    return texts.map((text) => this.embedText(text, options.dimensions || this.defaultSize));
  }

  private embedText(text: string, dimensions: number): number[] {
    const vector = new Array(dimensions).fill(0);
    const tokens = text
      .toLowerCase()
      .split(/[^a-z0-9_]+/g)
      .filter(Boolean);

    for (const token of tokens) {
      const hash = createHash('sha256').update(token).digest();
      const index = hash.readUInt32BE(0) % dimensions;
      const weight = 1 + (hash[4] / 255);
      vector[index] += weight;
    }

    const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
    if (norm === 0) {
      return vector;
    }

    return vector.map((value) => value / norm);
  }
}

export function createRagEmbeddingProvider(): EmbeddingProvider {
  return new LocalEmbeddingProvider();
}

export function resolveEmbeddingModel(): string {
  return 'local-hash-embedding';
}

export function shouldSkipEmbeddings(): boolean {
  return false;
}
