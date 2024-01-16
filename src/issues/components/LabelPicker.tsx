import { LoadingIcon } from '../../share/components/LoadingIcon';
import { useLabels } from '../hooks/useLabels';

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker = ({ selectedLabels, onChange }: Props) => {
  const query = useLabels();

  if (query.isLoading) return <LoadingIcon />;

  return (
    <div>
      {query.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? 'label-active' : ''
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
