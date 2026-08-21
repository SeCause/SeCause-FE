import { RepositoryDashboardHeader } from '@/features/repositories';
import { MOCK_DASHBOARD } from '@/widgets/landing/model/mockHowItWorksData';

export default function MockRepositoryHeader() {
  return (
    <RepositoryDashboardHeader
      repositoryId={MOCK_DASHBOARD.repositoryId}
      owner={MOCK_DASHBOARD.owner}
      name={MOCK_DASHBOARD.name}
      githubUrl={MOCK_DASHBOARD.githubUrl}
    />
  );
}
