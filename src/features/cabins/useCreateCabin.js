import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Successfully create a new cabin');
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
