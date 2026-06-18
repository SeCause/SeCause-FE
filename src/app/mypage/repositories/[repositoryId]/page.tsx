'use client';

import { useParams } from 'next/navigation';

import RepositoryDashboard from '@/features/repositories/ui/dashboard/RepositoryDashboard';

export default function RepositoryDetailPage() {
  const params = useParams<{ repositoryId: string }>();
  const repositoryId = Number(params.repositoryId);

  return <RepositoryDashboard repositoryId={repositoryId} />;
}
