import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { repositoryIssueDetailKey } from '@/features/repositories/model/queryKeys';
import type { RepositoryIssueDetail } from '@/features/repositories/model/types';

import IssueDetailPanel from './IssueDetailPanel';

const detail: RepositoryIssueDetail = {
  analysisResultId: 1,
  vulnerabilityType: 'SQL Injection',
  severity: 'CRITICAL',
  filePath: 'api/users.ts',
  lineStart: 16,
  lineEnd: 16,
  codeSnippet: 'const users = await db.query(`SELECT * FROM users WHERE name = "${name}"`);',
  description: '사용자 입력값을 SQL 쿼리에 직접 삽입하고 있습니다.',
  summary: '사용자 입력값으로 SQL Injection이 발생할 수 있습니다.',
  attackScenario: '입력값에 SQL 구문을 삽입하면 다른 사용자의 정보가 조회될 수 있습니다.',
  fixCode: 'const users = await db.query("SELECT * FROM users WHERE name = ?", [name]);',
  fixSummary: 'Prepared Statement를 사용하여 사용자 입력값을 바인딩하세요.',
  references: [],
};

function Preview({ fixCode }: { fixCode: string }) {
  const [client] = useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { enabled: false, staleTime: Infinity, retry: false } },
    });
    queryClient.setQueryData(repositoryIssueDetailKey(1, 1), { ...detail, fixCode });
    return queryClient;
  });

  return (
    <QueryClientProvider client={client}>
      <div className="bg-background mx-auto max-w-6xl p-6">
        <IssueDetailPanel repositoryId={1} analysisResultId={1} />
      </div>
    </QueryClientProvider>
  );
}

const meta = {
  title: 'Features/Repositories/IssueDetailPanel',
  component: IssueDetailPanel,
  args: { repositoryId: 1, analysisResultId: 1 },
  parameters: { layout: 'fullscreen' },
  render: (_, { name }) => (
    <Preview key={name} fixCode={name === 'Generated' ? detail.fixCode : ''} />
  ),
} satisfies Meta<typeof IssueDetailPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Generated = {} satisfies Story;

export const GenerationFailed = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('수정 코드 생성 실패')).toBeVisible();
    await expect(canvas.getByRole('link', { name: '분석 설정으로 이동' })).toHaveAttribute(
      'href',
      '/analysis',
    );
    await expect(canvas.queryByRole('button', { name: '코드 복사' })).not.toBeInTheDocument();
    await expect(canvas.getByText(detail.codeSnippet)).toBeVisible();
  },
} satisfies Story;
