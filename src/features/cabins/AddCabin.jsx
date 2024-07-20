import Button from '../../ui/Button.jsx';
import Modal from '../../ui/Modal.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="form-cabin">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="form-cabin">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
