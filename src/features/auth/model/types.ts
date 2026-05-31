export interface LoginRequest {
  code: string;
}

export interface GithubLoginResponse {
  userId: number;
  githubId: number;
  githubLoginId: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface GetUserResponse {
  userId: number;
  githubLoginId: string;
  email: string;
  name: string;
  avatarUrl: string;
}

export type UserProfile = GetUserResponse;
