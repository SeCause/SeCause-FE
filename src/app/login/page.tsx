import GithubLoginButton from '@/features/auth/ui/GithubLoginButton';

const FEATURES = [
  '신뢰도 높은 보안 도구 기반의 실시간 저장소 분석',
  '취약점의 원인과 영향을 설명하는 AI 기반 인사이트',
  '즉시 적용 가능한 스마트 수정 가이드 제공',
  '다양한 언어와 환경을 아우르는 통합 보안 탐지',
  '불필요한 노이즈를 줄인 정확한 분석 결과',
];

export default function Login() {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 md:flex-row md:gap-14 md:px-20 md:py-0">
      <div className="flex w-full flex-col items-center gap-10 md:flex-1 md:justify-center md:gap-8">
        <div className="flex flex-col gap-4 md:text-left">
          <h1 className="text-heading-md whitespace-pre-line text-gray-900">
            코드를 더 안전하게 관리하세요.
          </h1>
          <p className="text-body-md md:text-body-lg text-gray-700">
            취약점을 탐지하는 것을 넘어,
            <br />
            원인을 이해하고 빠르게 해결할 수 있도록 돕습니다.
          </p>
        </div>

        <ul className="flex flex-col gap-3 md:gap-4">
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="text-body-md flex items-center gap-4 font-medium text-gray-900"
            >
              <span aria-hidden="true" className="bg-blue h-4 w-4 shrink-0 rounded-full blur-xs" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <GithubLoginButton />
        </div>
      </div>

      <div className="hidden flex-col items-center justify-center gap-16 border-gray-300 md:flex md:flex-1">
        <div className="text-body-md flex h-50 w-50 items-center justify-center rounded-md border border-dashed border-current text-gray-500">
          로고
        </div>
        <GithubLoginButton />
      </div>
    </div>
  );
}
