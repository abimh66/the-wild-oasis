import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import useCabins from './useCabins.js';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1. FILTER
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);

  // 2. SORTING
  const sortValue = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortValue.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin, idx) => <CabinRow key={idx} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
