import StatsComponent from '@/components/Stats/Stats';
import { FIVE_MINUTES } from '@/constant/constants';
import {
  getHistogram,
  getHistory,
  getTopCompanies,
} from '@/services/jobs/jobs.service';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface StatsProps {
  params: Promise<{
    country: string;
  }>;
}

const Stats = async ({ params }: StatsProps) => {
  const { country } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['histogram', country],
      queryFn: () => getHistogram(country),
      staleTime: FIVE_MINUTES,
    }),
    queryClient.prefetchQuery({
      queryKey: ['top_companies', country],
      queryFn: () => getTopCompanies(country),
      staleTime: FIVE_MINUTES,
    }),
    queryClient.prefetchQuery({
      queryKey: ['history', country],
      queryFn: () => getHistory(country),
      staleTime: FIVE_MINUTES,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsComponent country={country} />
    </HydrationBoundary>
  );
};

export default Stats;
