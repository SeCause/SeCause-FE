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

// avatarUrl: null이면 삭제, 생략하면 기존 값 유지.
export interface UpdateUserRequest {
  name?: string;
  avatarUrl?: string | null;
}
