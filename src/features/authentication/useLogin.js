import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      // Set data to react query cache
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Invalid email or password');
    },
  });

  return { login, isPending };
}
