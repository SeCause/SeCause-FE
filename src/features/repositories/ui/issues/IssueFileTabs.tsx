import type { RepositoryIssueFile } from '@/features/repositories/model/types';
import { cn } from '@/shared/lib/cn';

interface Props {
  files: RepositoryIssueFile[];
  selectedFilePath: string | null;
  isLoading: boolean;
  isError: boolean;
  onSelect: (filePath: string) => void;
}

export default function IssueFileTabs({
  files,
  selectedFilePath,
  isLoading,
  isError,
  onSelect,
}: Props) {
  return (
    <div className="scrollbar-hide lg:scrollbar-custom-gray flex max-h-34 min-h-0 flex-col gap-1.5 overflow-y-auto rounded-2xl border border-gray-900/10 bg-white p-3 lg:h-full lg:max-h-none">
      {isLoading ? (
        <p className="text-body-sm px-2 py-3 text-gray-500">불러오는 중...</p>
      ) : isError ? (
        <p className="text-body-sm px-2 py-3 text-gray-500">파일 목록을 불러오지 못했습니다.</p>
      ) : files.length > 0 ? (
        files.map((file) => (
          <button
            key={file.filePath}
            type="button"
            onClick={() => onSelect(file.filePath)}
            className={cn(
              'text-body-sm flex w-full items-center gap-1 rounded-xl px-3 py-3 text-left transition-colors',
              selectedFilePath === file.filePath
                ? 'bg-blue font-semibold text-white'
                : 'font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700',
            )}
            title={file.filePath}
          >
            <span className="min-w-0 flex-1 truncate">{file.filePath}</span>
            <span
              className={cn(
                'shrink-0',
                selectedFilePath === file.filePath ? 'text-white/60' : 'text-gray-400',
              )}
            >
              ({file.issueCount})
            </span>
          </button>
        ))
      ) : (
        <p className="text-body-sm px-2 py-3 text-gray-500">표시할 파일이 없습니다.</p>
      )}
    </div>
  );
}
