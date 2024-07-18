import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable.jsx';
import Filter from '../ui/Filter.jsx';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Button from '../ui/Button.jsx';
import CreateCabinForm from '../features/cabins/CreateCabinForm.jsx';

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Filter />
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>Show Form</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
