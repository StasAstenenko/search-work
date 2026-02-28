'use client';

import { getJobs, getJobsCategory } from '@/services/jobs/jobs.service';
import { useQuery } from '@tanstack/react-query';
import JobsNextPage from './JobsNextPage/JobsNextPage';
import JobsList from './JobsList/JobsList';
import Loader from '@/components/Loader/Loader';
import RadioButtonSearch from '../RadioButtonSearch/RadioButtonSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

interface JobsProps {
  country: string;
  page: string;
}

const JobsComponent = ({ country, page }: JobsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get('category');
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['jobs', { country, page, searchCategory }],
    queryFn: () =>
      getJobs({ country, page: Number(page), category: searchCategory }),
  });

  const { data: category } = useQuery({
    queryKey: ['categories', country],
    queryFn: () => getJobsCategory(country),
  });

  if (isLoading) return <Loader />;

  if (error || !jobs) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500 text-lg'>Сталася помилка 😔</p>
      </div>
    );
  }

  return (
    <main
      className='min-h-screen px-6 py-12
    bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-300'
    >
      <h1
        className='text-4xl font-bold text-center mb-12
      bg-gradient-to-r from-amber-600 to-orange-500 
      bg-clip-text text-transparent'
      >
        Вакансії
      </h1>

      <div className='w-72 p-6 bg-white/80 backdrop-blur-xl border border-black/10 rounded-2xl shadow-lg space-y-3 animate-fadeIn'>
        <h3 className='text-xl font-bold mb-4'>Категорії</h3>

        {category?.results.map((result, indx) => {
          return (
            <RadioButtonSearch
              key={indx}
              label={result.label}
              tag={result.tag}
              onChange={() =>
                router.push(`/jobs/${country}/1?category=${result.tag}`)
              }
            />
          );
        })}

        <Button
          onClick={() => router.push(`/jobs/${country}/1`)}
          className='w-full mt-4 rounded-xl bg-black text-white hover:bg-white hover:text-black border transition-all duration-300 hover:scale-105'
        >
          Скинути категорії
        </Button>
      </div>

      <JobsList results={jobs.results} />

      <div className='mt-12 flex justify-center'>
        <JobsNextPage
          country={country}
          page={Number(page)}
          category={searchCategory}
        />
      </div>
    </main>
  );
};

export default JobsComponent;
