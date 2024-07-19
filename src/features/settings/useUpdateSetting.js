import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting } from '../../services/apiSettings.js';

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Setting successfully edited');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSettings, isUpdating };
}

export default useUpdateSetting;
