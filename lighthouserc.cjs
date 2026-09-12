/* global module, process */

const targetUrl = process.env.LIGHTHOUSE_TARGET_URL || 'http://127.0.0.1:4321/';

module.exports = {
  ci: {
    collect: {
      url: [targetUrl],
      numberOfRuns: 3,
      startServerCommand: process.env.LIGHTHOUSE_TARGET_URL
        ? undefined
        : 'npm run preview -- --host 127.0.0.1',
      startServerReadyPattern: 'Local',
      settings: {
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1 },
        throttlingMethod: 'simulate',
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      },
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
