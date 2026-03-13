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
    sort_by: string;
    salary_min: number;
    salary_max: number;
  }>;
}

const Jobs = async ({ params, searchParams }: JobsProps) => {
  const { country, page } = await params;

  const searchCategory = (await searchParams).category;
  const sort_by = (await searchParams).sort_by;
  const salary_min = (await searchParams).salary_min;
  const salary_max = (await searchParams).salary_max;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [
        'jobs',
        country,
        page,
        searchCategory,
        sort_by,
        salary_max,
        salary_min,
      ],
      queryFn: () =>
        getJobs({
          country,
          page: Number(page),
          category: searchCategory,
          sort_by,
          salary_max,
          salary_min,
        }),
      staleTime: FIVE_MINUTES,
    }),

    queryClient.prefetchQuery({
      queryKey: ['categories', country],
      queryFn: () => getJobsCategory(country),
      staleTime: FIVE_MINUTES,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsComponent country={country} page={page} />
    </HydrationBoundary>
  );
};

export default Jobs;
