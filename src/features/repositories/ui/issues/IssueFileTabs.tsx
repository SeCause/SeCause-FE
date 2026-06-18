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
    <div className="scrollbar-custom-gray flex max-h-168 flex-col gap-1.5 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2.5">
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
              'text-body-sm flex w-full items-center gap-1 rounded-md px-2.5 py-2.5 text-left transition-colors',
              selectedFilePath === file.filePath
                ? 'bg-blue/10 text-blue font-semibold'
                : 'font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700',
            )}
            title={file.filePath}
          >
            <span className="min-w-0 flex-1 truncate">{file.filePath}</span>
            <span className="shrink-0 text-gray-400">({file.issueCount})</span>
          </button>
        ))
      ) : (
        <p className="text-body-sm px-2 py-3 text-gray-500">표시할 파일이 없습니다.</p>
      )}
    </div>
  );
}
