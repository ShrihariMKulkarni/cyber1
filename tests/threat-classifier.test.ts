/**
 * Tests for Threat Classifier and Scoring Engine
 */

import { classifyThreat, combineScores } from '../lib/security/threat-classifier';
import { clampScore, getRiskLevel } from '../lib/security/scoring-weights';

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (e) {
    console.log(`❌ FAIL: ${name} — ${e}`);
    failed++;
  }
}

function expect(actual: unknown) {
  return {
    toBe: (expected: unknown) => {
      if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toBeGreaterThan: (n: number) => {
      if (typeof actual !== 'number' || actual <= n) throw new Error(`Expected > ${n}, got ${actual}`);
    },
    toBeTruthy: () => {
      if (!actual) throw new Error(`Expected truthy, got ${actual}`);
    },
    toBeFalsy: () => {
      if (actual) throw new Error(`Expected falsy, got ${actual}`);
    },
    toContain: (item: string) => {
      if (Array.isArray(actual) && !actual.includes(item)) throw new Error(`Array does not contain "${item}"`);
    },
  };
}

// 1. Safe classification
test('classifyThreat: identifies safe content when score is 0 and no signals', () => {
  const result = classifyThreat([], [], 0);
  expect(result.classification).toBe('safe');
  expect(result.confidence).toBe('high');
});

// 2. Credential theft classification
test('classifyThreat: classifies credential request as credential_theft', () => {
  const result = classifyThreat(['credential_request', 'urgency'], [], 75);
  expect(result.classification).toBe('credential_theft');
  expect(result.displayName).toBe('Credential Theft');
});

// 3. OTP Scam
test('classifyThreat: prioritizes OTP scam when OTP pattern present', () => {
  const result = classifyThreat(['otp_request'], [], 65);
  expect(result.classification).toBe('otp_scam');
  expect(result.displayName).toBe('OTP Scam');
});

// 4. Financial Scam
test('classifyThreat: classifies financial manipulation as financial_scam', () => {
  const result = classifyThreat(['financial', 'urgency'], [], 55);
  expect(result.classification).toBe('financial_scam');
  expect(result.displayName).toBe('Financial Scam');
});

// 5. Job Scam
test('classifyThreat: classifies job scam indicators', () => {
  const result = classifyThreat(['job_scam'], [], 45);
  expect(result.classification).toBe('job_scam');
  expect(result.displayName).toBe('Job Scam');
});

// 6. Risk level mapping
test('getRiskLevel: correctly maps boundaries', () => {
  expect(getRiskLevel(0)).toBe('LOW');
  expect(getRiskLevel(20)).toBe('LOW');
  expect(getRiskLevel(21)).toBe('MODERATE');
  expect(getRiskLevel(40)).toBe('MODERATE');
  expect(getRiskLevel(41)).toBe('SUSPICIOUS');
  expect(getRiskLevel(60)).toBe('SUSPICIOUS');
  expect(getRiskLevel(61)).toBe('HIGH');
  expect(getRiskLevel(80)).toBe('HIGH');
  expect(getRiskLevel(81)).toBe('CRITICAL');
  expect(getRiskLevel(100)).toBe('CRITICAL');
});

// 7. Clamp score bounds
test('clampScore: keeps values within 0 to 100', () => {
  expect(clampScore(-15)).toBe(0);
  expect(clampScore(125)).toBe(100);
  expect(clampScore(42)).toBe(42);
});

// 8. Combine scores
test('combineScores: correctly weighs primary and secondary scores', () => {
  const combined = combineScores(50, 40);
  expect(combined).toBe(62);
  expect(combined).toBeGreaterThan(50);
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests\n`);
if (failed > 0) process.exit(1);
