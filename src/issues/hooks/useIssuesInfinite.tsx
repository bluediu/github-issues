import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';

import { githubAPI } from '../../api/githubAPI';
import { sleep } from '../../helpers';

/**
 * Ref: Implement infinite scroll with browser events:
 * https://github.com/candraKriswinarto/infinite-scrolling
 */

interface Props {
  labels: string[];
  state?: State;
  page?: number;
}

interface QueryProps {
  pageParam: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({
  pageParam,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  await sleep(2);
  const [, , args] = queryKey;
  const { state, labels } = args as Props;

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelStr = labels.join(',');
    params.append('labels', labelStr);
  }

  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await githubAPI.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels }],
    queryFn: (data) => getIssues(data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  return { issuesQuery };
};
