import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { validateTaskPayload } = require('../src/utils/taskValidation');

describe('validateTaskPayload', () => {
  it('accepts valid create payloads', () => {
    const result = validateTaskPayload({
      title: 'Design onboarding flow',
      description: 'Create a clear onboarding flow for new users and map every screen.',
      status: 'Pending'
    });

    expect(result.isValid).toBe(true);
  });

  it('rejects short descriptions and missing titles', () => {
    const result = validateTaskPayload({
      title: ' ',
      description: 'too short',
      status: 'Pending'
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Title is required.');
    expect(result.errors).toContain('Description must be at least 20 characters.');
  });
});
