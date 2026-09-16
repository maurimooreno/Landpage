import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { lighthouseConfig } from '../lighthouse.config.mjs';

const outputDirectory = new URL('../.lighthouseci/', import.meta.url);
const externalTarget = process.env.LIGHTHOUSE_TARGET_URL?.trim();
const targetUrl = externalTarget || 'http://127.0.0.1:4321/';
const playwrightChrome = chromium.executablePath();
const chromePath =
  process.env.CHROME_PATH || (existsSync(playwrightChrome) ? playwrightChrome : undefined);
let server;

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Preview did not become ready at ${url}`);
}

if (!externalTarget) {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  server = spawn(npmCommand, ['run', 'preview', '--', '--host', '127.0.0.1'], {
    stdio: 'ignore',
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  });
  await waitForServer(targetUrl);
}

await mkdir(outputDirectory, { recursive: true });
const summary = [];

try {
  for (let run = 1; run <= lighthouseConfig.runs; run += 1) {
    const chromeProfile = new URL(`../.astro/lighthouse-profile-${run}/`, import.meta.url);
    await mkdir(chromeProfile, { recursive: true });
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
      userDataDir: fileURLToPath(chromeProfile),
      ...(chromePath ? { chromePath } : {}),
    });
    try {
      const result = await lighthouse(targetUrl, {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttlingMethod: 'simulate',
        onlyCategories: lighthouseConfig.categories,
      });
      if (!result) throw new Error(`Lighthouse produced no result for run ${run}`);
      const metrics = {
        run,
        url: result.lhr.finalDisplayedUrl,
        performance: Math.round((result.lhr.categories.performance?.score ?? 0) * 100),
        accessibility: Math.round((result.lhr.categories.accessibility?.score ?? 0) * 100),
        bestPractices: Math.round((result.lhr.categories['best-practices']?.score ?? 0) * 100),
        seo: Math.round((result.lhr.categories.seo?.score ?? 0) * 100),
        lcp:
          result.lhr.audits['largest-contentful-paint']?.numericValue ?? Number.POSITIVE_INFINITY,
        cls: result.lhr.audits['cumulative-layout-shift']?.numericValue ?? Number.POSITIVE_INFINITY,
        tbt: result.lhr.audits['total-blocking-time']?.numericValue ?? Number.POSITIVE_INFINITY,
      };
      summary.push(metrics);
      await writeFile(
        new URL(`run-${run}.json`, outputDirectory),
        JSON.stringify(result.lhr, null, 2),
      );
    } finally {
      chrome.kill();
    }
  }
} finally {
  server?.kill();
}

await writeFile(new URL('summary.json', outputDirectory), JSON.stringify(summary, null, 2));
const failures = summary.filter(
  (run) =>
    run.lcp > lighthouseConfig.thresholds.largestContentfulPaint ||
    run.cls > lighthouseConfig.thresholds.cumulativeLayoutShift ||
    run.tbt > lighthouseConfig.thresholds.totalBlockingTime,
);
console.table(summary);
if (failures.length) {
  console.error(`Lighthouse thresholds failed in ${failures.length} of ${summary.length} runs.`);
  process.exit(1);
}
process.exit(0);
