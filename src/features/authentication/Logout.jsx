import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon.jsx';
import { useLogout } from './useLogout.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
