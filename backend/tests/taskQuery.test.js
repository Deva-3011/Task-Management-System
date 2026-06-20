import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { normalizeTaskQuery } = require('../src/utils/taskQuery');

describe('normalizeTaskQuery', () => {
  it('applies defaults and sanitizes inputs', () => {
    const query = normalizeTaskQuery({ page: '2', limit: '5', search: '  ui  ', order: 'asc' });

    expect(query).toEqual({
      page: 2,
      limit: 5,
      offset: 5,
      search: 'ui',
      status: '',
      sort: 'created_at',
      order: 'ASC'
    });
  });

  it('caps the maximum page size', () => {
    const query = normalizeTaskQuery({ limit: '999' });

    expect(query.limit).toBe(100);
  });
});
