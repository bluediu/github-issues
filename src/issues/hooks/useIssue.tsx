import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces';
import { githubAPI } from '../../api/githubAPI';
import { sleep } from '../../helpers';

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubAPI.get<Issue>(`issues/${issueNumber}`);
  return data;
};

export const getIssueComment = async (
  issueNumber: number
): Promise<Issue[]> => {
  await sleep(1);
  const { data } = await githubAPI.get<Issue[]>(
    `issues/${issueNumber}/comments`
  );
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  const issueCommentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComment(issueQuery.data!.number),
    // Query resolution step.
    enabled: issueQuery.data !== undefined,
  });

  return { issueQuery, issueCommentsQuery };
};
