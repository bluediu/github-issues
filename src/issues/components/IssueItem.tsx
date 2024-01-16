import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getIssueComment, getIssueInfo } from '../hooks/useIssue';
import { Issue, State } from '../interfaces';

import { useQueryClient } from '@tanstack/react-query';

export const IssueItem = ({ issue }: { issue: Issue }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /*
   Use prefetchQuery for preloading data into the cache,
   optimizing future queries.
   */
  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number],
      queryFn: () => getIssueInfo(issue.number),
    });

    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number, 'comments'],
      queryFn: () => getIssueComment(issue.number),
    });
  };

  /*
    `setQueryData` updates the cache with new data. 
    `prefetchQuery` is proactive, while `setQueryData` is reactive. 
    Use `prefetchQuery` for performance and `setQueryData` for updating
    cache post-query.

    Reuse data from the issue list to optimize the Issue Item component, 
    leveraging the identical dataset for efficiency.
  */
  const presetData = () => {
    queryClient.setQueryData(['issue', issue.number], issue, {
      updatedAt: new Date().getTime() + 100_000,
    });
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={presetData}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiCheckCircle size={30} color="green" />
        ) : (
          <FiInfo size={30} color="red" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened 2 days ago by{' '}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
