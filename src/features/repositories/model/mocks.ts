import type { Repository } from './types';

const MOCK_REPO_NAMES = [
  'my-portfolio-page',
  'spring-practice',
  'secause-frontend',
  'secause-backend',
  'AI-Dectector-Project',
];

export const MOCK_REPOSITORIES: Repository[] = Array.from({ length: 25 }, (_, i) => ({
  repositoryId: i + 1,
  title: MOCK_REPO_NAMES[i % MOCK_REPO_NAMES.length],
  githubLink: `https://github.com/chaeyoungwon/${MOCK_REPO_NAMES[i % MOCK_REPO_NAMES.length]}`,
  branch: 'main',
  totalFiles: 32 + i,
  createdAt: '2026-04-01T09:00:00.000Z',
  analysis: {
    analysisId: i + 1,
    analysisStatus: 'COMPLETED',
    criticalCount: 8,
    highCount: 12,
    mediumCount: 4,
    lowCount: 10,
    totalIssues: 34,
    completedAt: '2026-04-03T15:13:00.000Z',
  },
}));
