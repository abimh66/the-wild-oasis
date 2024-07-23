import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth.js';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      // set new cache
      queryClient.setQueryData(['user'], user);

      // invalidate query to refetch data
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User successfully updated');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
