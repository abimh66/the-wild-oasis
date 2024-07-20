import CabinTable from '../features/cabins/CabinTable.jsx';
import Filter from '../ui/Filter.jsx';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AddCabin from '../features/cabins/AddCabin.jsx';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Filter />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
