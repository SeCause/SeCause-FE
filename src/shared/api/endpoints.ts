export const ENDPOINTS = {
  auth: {
    githubLogin: 'auth/github/login',
    refresh: 'auth/refresh',
    logout: 'auth/logout',
  },

  users: {
    me: 'users',
    updateImage: 'users/image',
  },

  repositories: {
    list: 'repositories',
    dashboard: (repositoryId: number) => `repositories/${repositoryId}`,
    delete: (repositoryId: number) => `repositories/${repositoryId}`,
  },

  issues: {
    list: (repositoryId: number) => `repositories/${repositoryId}/analysis/issues`,
    files: (repositoryId: number) => `repositories/${repositoryId}/analysis/files`,
    detail: (repositoryId: number, analysisResultId: number) =>
      `repositories/${repositoryId}/analysis/issues/${analysisResultId}`,
  },

  analysis: {
    availableRepositories: 'analysis/request',
    request: (repositoryId: number) => `analysis/request/${repositoryId}`,
    status: (repositoryId: number) => `analysis/request/${repositoryId}/status`,
  },
} as const;
