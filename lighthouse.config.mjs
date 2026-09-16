export const lighthouseConfig = {
  runs: 3,
  categories: ['performance', 'accessibility', 'best-practices', 'seo'],
  thresholds: {
    largestContentfulPaint: 2500,
    cumulativeLayoutShift: 0.1,
    totalBlockingTime: 200,
  },
};
