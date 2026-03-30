import { FIVE_MINUTES } from '@/constant/constants';
import { getUser } from '@/services/auth.services';
import { addToFavorite, deleteFavorite } from '@/services/jobs/jobs.service';
import { Results } from '@/types/Jobs.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFavorite = (result?: Results) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getUser,
    staleTime: FIVE_MINUTES,
    refetchOnMount: false,
  });

  const isFavorite = data?.user?.favorites?.some(
    (fav) => fav.jobId === result?.id
  );

  const addFavoriteMutate = useMutation({
    mutationFn: addToFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const deleteFavoriteMutate = useMutation({
    mutationFn: deleteFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const toggleFavorite = async (job: Results) => {
    if (isFavorite) {
      return deleteFavoriteMutate.mutate(job.id);
    } else {
      return addFavoriteMutate.mutate(job);
    }
  };

  return {
    toggleFavorite,
    data,
    error,
    isLoading,
    isFavorite,
    deleteFavoriteMutate,
  };
};
