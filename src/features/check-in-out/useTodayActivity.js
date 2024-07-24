import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings.js';

export function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['todays-activity'],
  });

  return { activities, isPending };
}
