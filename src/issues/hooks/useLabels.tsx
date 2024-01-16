import { useQuery } from '@tanstack/react-query';
import { githubAPI } from '../../api/githubAPI';
import { Label } from '../interfaces/label';
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data } = await githubAPI.get<Label[]>('/labels');
  return data;
};

export const useLabels = () => {
  const labelQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 791921801,
        node_id: 'MDU6TGFiZWw3OTE5MjE4MDE=',
        url: 'https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F',
        name: '❤️',
        color: 'ffffff',
        default: false,
      },
      {
        id: 69105383,
        node_id: 'MDU6TGFiZWw2OTEwNTM4Mw==',
        url: 'https://api.github.com/repos/facebook/react/labels/Browser:%20IE',
        name: 'Browser: IE',
        color: 'c7def8',
        default: false,
      },
    ],
  });

  return labelQuery;
};
