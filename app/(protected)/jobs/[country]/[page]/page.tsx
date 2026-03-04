import JobsComponent from '@/components/Jobs/Jobs';
import { FIVE_MINUTES } from '@/constant/constants';
import { getJobs, getJobsCategory } from '@/services/jobs/jobs.service';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface JobsProps {
  params: Promise<{
    country: string;
    page: string;
  }>;
  searchParams: Promise<{
    category: string;
  }>;
}

const Jobs = async ({ params, searchParams }: JobsProps) => {
  const { country, page } = await params;

  const searchCategory = (await searchParams).category;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['jobs', { country, page, searchCategory }],
      queryFn: () =>
        getJobs({
          country,
          page: Number(page),
          category: searchCategory,
        }),
      staleTime: FIVE_MINUTES,
    }),

    queryClient.prefetchQuery({
      queryKey: ['categories', country],
      queryFn: () => getJobsCategory(country),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsComponent country={country} page={page} />
    </HydrationBoundary>
  );
};

export default Jobs;
