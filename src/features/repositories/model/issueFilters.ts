import type { RepositoryIssueFile } from './types';

export function filterIssueFiles(files: RepositoryIssueFile[], keyword: string) {
  const normalizedKeyword = keyword.trim().toLocaleLowerCase();
  if (!normalizedKeyword) return files;

  return files.filter((file) => file.filePath.toLocaleLowerCase().includes(normalizedKeyword));
}
