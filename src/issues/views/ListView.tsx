import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingIcon } from '../../share/components/LoadingIcon';

import { useIssues } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}

        <div className="d-flex align-items-center mt-2">
          <button
            className="btn btn-outline-light"
            onClick={prevPage}
            disabled={issuesQuery.isFetching}
          >
            Previous
          </button>
          <span className="p-4 fw-bold">{page}</span>
          <button
            className="btn btn-outline-light"
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
          >
            Next
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
      </div>
    </div>
  );
};
