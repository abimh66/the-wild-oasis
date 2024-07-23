import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser.js';
import Spinner from './Spinner.jsx';
import styled from 'styled-components';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isAuthenticated, isPending } = useUser();

  // 2. If there is no authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isPending) return navigate('/login');
  }, [isAuthenticated, isPending]);

  // 3. Show spinner while loading
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
