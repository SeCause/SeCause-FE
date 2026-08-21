export interface paths {
  '/api/auth/reissue': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['reissue'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/auth/logout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['logout'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/auth/github/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['loginWithGithub'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/analysis/request': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 분석 요청 생성
     * @description 프론트에서 선택한 GitHub owner, 레포지토리 이름, 브랜치를 검증한 뒤 분석 요청을 생성하고 FastAPI 분석 서버에 비동기로 전달합니다.
     */
    post: operations['createAnalysisRequest'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/users/me': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 내 정보 조회
     * @description 로그인한 사용자의 기본 정보를 조회합니다.
     */
    get: operations['getMe'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /**
     * 내 정보 수정
     * @description 로그인한 사용자의 이름과 프로필 이미지 URL을 수정합니다.
     *
     *     name 또는 avatarUrl을 빈 문자열로 보내면 기존 값을 유지합니다.
     *
     *     avatarUrl을 null로 보내면 프로필 이미지를 삭제하고, 필드를 보내지 않으면 기존 값을 유지합니다.
     *
     *     GitHub 연동 이메일은 수정 대상이 아닙니다.
     */
    patch: operations['updateMe'];
    trace?: never;
  };
  '/health-check': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['healthCheck'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/repositories': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 레포지토리 목록 조회
     * @description 로그인한 사용자가 분석한 레포지토리 목록을 GitHub 계정과 검색어로 필터링하여 조회합니다.
     */
    get: operations['getRepositories'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/repositories/{repositoryId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 레포지토리 대시보드 조회
     * @description 로그인한 사용자가 소유한 레포지토리의 코드 정보, 분석 상태 및 보안 이슈 통계를 조회합니다.
     */
    get: operations['getRepositoryDashboard'];
    put?: never;
    post?: never;
    /**
     * 레포지토리 삭제
     * @description 로그인한 사용자가 소유한 레포지토리를 삭제 처리합니다.
     */
    delete: operations['deleteRepository'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/repositories/{repositoryId}/analysis/issues': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 레포지토리 이슈 목록 조회
     * @description 레포지토리 분석 결과에서 발견된 코드/인프라 보안 이슈 목록을 취약도 기준으로 필터링하여 페이지네이션 조회합니다.
     */
    get: operations['getRepositoryIssues'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/repositories/{repositoryId}/analysis/issues/{analysisResultId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 이슈 상세 조회
     * @description 레포지토리 분석 이슈의 상세 정보와 관련 보안 레퍼런스를 조회합니다.
     */
    get: operations['getRepositoryIssueDetail'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/repositories/{repositoryId}/analysis/files': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 취약 파일 목록 조회
     * @description 레포지토리 분석 결과에서 취약점이 발견된 파일 목록과 파일별 이슈 수, CRITICAL 이슈 수를 조회합니다.
     */
    get: operations['getVulnerableFiles'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/analysis/request/{analysisId}/status': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 분석 상태 조회
     * @description 분석 요청 생성 시 반환받은 analysisId로 분석 진행 상태, 진행률, 실패 사유를 조회합니다.
     */
    get: operations['getAnalysisRequestStatus'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/analysis/request/repositories': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 선택한 GitHub 계정의 레포지토리 목록 조회
     * @description Select Github Account에서 선택한 내 계정 또는 조직의 GitHub 레포지토리 목록을 조회합니다.
     */
    get: operations['getLinkableRepositories'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/analysis/request/repositories/{ownerName}/{repositoryName}/branches': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * GitHub 레포지토리 브랜치 목록 조회
     * @description 선택한 레포지토리의 브랜치 목록을 조회합니다.
     */
    get: operations['getLinkableRepositoryBranches'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/analysis/request/accounts': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 연동 가능 GitHub 계정 목록 조회
     * @description 분석 요청 페이지의 Select Github Account 드롭다운에 표시할 내 GitHub 계정과 소속 조직 목록을 조회합니다.
     */
    get: operations['getLinkableGithubAccounts'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    ApiResponseVoid: {
      isSuccess?: boolean;
      code?: string;
      message?: string;
      result?: unknown;
      error?: components['schemas']['ErrorDto'];
    };
    ErrorDto: {
      reason?: string;
      validation?: {
        [key: string]: string;
      };
    };
    GithubLoginRequest: {
      code: string;
    };
    ApiResponseGithubLoginResponse: {
      isSuccess?: boolean;
      code?: string;
      message?: string;
      result?: components['schemas']['GithubLoginResponse'];
      error?: components['schemas']['ErrorDto'];
    };
    GithubLoginResponse: {
      /** Format: int64 */
      userId?: number;
      /** Format: int64 */
      githubId?: number;
      githubLoginId?: string;
      name?: string;
      email?: string;
      avatarUrl?: string;
    };
    AnalysisRequestCreateRequest: {
      owner: string;
      repositoryName: string;
      branch: string;
    };
    ApiResponse: {
      isSuccess?: boolean;
      code?: string;
      message?: string;
      result?: unknown;
      error?: components['schemas']['ErrorDto'];
    };
    UserUpdateRequest: {
      name?: string;
      avatarUrl?: string;
    };
    ApiResponseString: {
      isSuccess?: boolean;
      code?: string;
      message?: string;
      result?: string;
      error?: components['schemas']['ErrorDto'];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  reissue: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: {
        refresh_token?: string;
      };
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponseVoid'];
        };
      };
    };
  };
  logout: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: {
        refresh_token?: string;
      };
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponseVoid'];
        };
      };
    };
  };
  loginWithGithub: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['GithubLoginRequest'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponseGithubLoginResponse'];
        };
      };
    };
  };
  createAnalysisRequest: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['AnalysisRequestCreateRequest'];
      };
    };
    responses: {
      /** @description 분석 요청 생성 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 요청 값 검증 실패 */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 또는 GitHub 토큰 문제 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description GitHub 레포지토리 또는 브랜치를 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description GitHub API 호출 실패 */
      502: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getMe: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 내 정보 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 사용자를 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  updateMe: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UserUpdateRequest'];
      };
    };
    responses: {
      /** @description 내 정보 수정 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 요청 값 검증 실패 */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 사용자를 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  healthCheck: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponseString'];
        };
      };
    };
  };
  getRepositories: {
    parameters: {
      query?: {
        /**
         * @description 개인 또는 조직 GitHub 계정명
         * @example secause
         */
        accountName?: string;
        /**
         * @description 레포지토리명 또는 계정명 검색어
         * @example backend
         */
        keyword?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 레포지토리 목록 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getRepositoryDashboard: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /**
         * @description 레포지토리 ID
         * @example 1
         */
        repositoryId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 레포지토리 대시보드 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 레포지토리를 찾을 수 없거나 접근 권한이 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  deleteRepository: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /**
         * @description 레포지토리 ID
         * @example 1
         */
        repositoryId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 레포지토리 삭제 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 레포지토리를 찾을 수 없거나 접근 권한이 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getRepositoryIssues: {
    parameters: {
      query?: {
        /**
         * @description 필터링할 이슈 취약도 수준
         * @example ALL
         */
        severity?: 'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
        /**
         * @description 페이지 번호. 1부터 시작합니다.
         * @example 1
         */
        page?: number;
        /**
         * @description 한 페이지에 보여질 이슈 수
         * @example 20
         */
        size?: number;
      };
      header?: never;
      path: {
        /**
         * @description 레포지토리 ID
         * @example 1
         */
        repositoryId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 레포지토리 이슈 목록 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 잘못된 요청 */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 레포지토리를 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getRepositoryIssueDetail: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /**
         * @description 레포지토리 ID
         * @example 1
         */
        repositoryId: number;
        /**
         * @description 분석 결과 ID
         * @example 1
         */
        analysisResultId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 이슈 상세 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 레포지토리 또는 이슈를 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getVulnerableFiles: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /**
         * @description 레포지토리 ID
         * @example 1
         */
        repositoryId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 취약 파일 목록 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 레포지토리를 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getAnalysisRequestStatus: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /**
         * @description 분석 요청 ID
         * @example 1
         */
        analysisId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 분석 상태 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 분석 결과를 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getLinkableRepositories: {
    parameters: {
      query: {
        /**
         * @description 조회할 GitHub 계정 또는 조직 이름
         * @example SeCause
         */
        accountName: string;
        /**
         * @description 레포지토리 이름 또는 owner 기준 검색어
         * @example backend
         */
        keyword?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 레포지토리 목록 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 잘못된 요청 */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description GitHub 계정을 찾을 수 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description GitHub API 호출 실패 */
      502: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getLinkableRepositoryBranches: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /**
         * @description 레포지토리 ownerName 로그인명
         * @example SeCause
         */
        ownerName: string;
        /**
         * @description 레포지토리 이름
         * @example SeCause-BE
         */
        repositoryName: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 브랜치 목록 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 또는 GitHub 토큰 문제 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description GitHub API 호출 실패 */
      502: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
  getLinkableGithubAccounts: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 연동 가능 GitHub 계정 목록 조회 성공 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description 인증 실패 또는 GitHub 토큰 문제 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
      /** @description GitHub API 호출 실패 */
      502: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['ApiResponse'];
        };
      };
    };
  };
}
