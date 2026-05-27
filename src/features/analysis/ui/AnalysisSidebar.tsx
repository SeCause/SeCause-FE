const INFO_BULLETS = [
  '본 프로젝트는 SemGrep, CodeQL, Vector DB를 사용하여 포괄적으로 검사합니다.',
  '분석 결과는 실시간으로 확인 가능하며, 완료 후 상세 보고서가 제공됩니다.',
];

interface Props {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export default function AnalysisSidebar({ label, disabled, onClick }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-blue-50 p-4">
        <p className="text-label-md mb-2 text-gray-900">분석 정보</p>
        <ul className="flex flex-col gap-2">
          {INFO_BULLETS.map((bullet) => (
            <li key={bullet} className="text-caption flex gap-2 text-gray-700">
              <span className="mt-0.5 shrink-0">•</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={disabled}
        onClick={onClick}
        className={`text-label-lg h-12 w-full rounded-xl transition-colors ${
          disabled
            ? 'cursor-not-allowed bg-gray-100 text-gray-500'
            : 'bg-blue cursor-pointer text-white'
        }`}
      >
        {label}
      </button>
    </div>
  );
}
