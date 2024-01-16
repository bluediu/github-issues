import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces';
import { githubAPI } from '../../api/githubAPI';

const getIssue = async (): Promise<Issue[]> => {
  const { data } = await githubAPI.get<Issue[]>('/issues');
  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery({ queryKey: ['issues'], queryFn: getIssue });

  return { issuesQuery };
};
