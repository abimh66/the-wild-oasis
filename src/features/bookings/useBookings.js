import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.js';
import { useSearchParams } from 'react-router-dom';

function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // SORT
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortValue.split('-');
  const sort = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });

  return { isLoading, bookings, error };
}

export default useBookings;
