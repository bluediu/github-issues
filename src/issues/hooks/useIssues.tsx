import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';

import { githubAPI } from '../../api/githubAPI';
import { sleep } from '../../helpers';

interface Props {
  labels: string[];
  state?: State;
  page?: number;
}

const getIssue = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelStr = labels.join(',');
    params.append('labels', labelStr);
  }

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubAPI.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels, page }],
    queryFn: () => getIssue({ labels, page, state }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const nextPage = () => {
    if (!issuesQuery.data?.length) return;

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'Loading' : page,
    nextPage,
    prevPage,
  };
};
