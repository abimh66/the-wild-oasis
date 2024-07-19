import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully updated');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isUpdating };
}

export default useUpdateCabin;
