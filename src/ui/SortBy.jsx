import { useSearchParams } from 'react-router-dom';
import Select from './Select.jsx';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSelected = searchParams.get('sortBy') || options.at(0).value;

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={currentSelected}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
