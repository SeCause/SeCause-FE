export const ENDPOINTS = {
  auth: {
    githubLogin: 'auth/github/login',
    reissue: 'auth/reissue',
    logout: 'auth/logout',
  },

  users: {
    me: 'users/me',
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
    accounts: 'analysis/request/accounts',
    repositories: 'analysis/request/repositories',
    branches: (ownerName: string, repositoryName: string) =>
      `analysis/request/repositories/${ownerName}/${repositoryName}/branches`,
    request: 'analysis/request',
  },
} as const;
