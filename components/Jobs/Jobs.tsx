'use client';

import { getJobs, getJobsCategory } from '@/services/jobs/jobs.service';
import { useQuery } from '@tanstack/react-query';
import JobsNextPage from './JobsNextPage/JobsNextPage';
import JobsList from './JobsList/JobsList';
import Loader from '@/components/Loader/Loader';
import RadioButtonSearch from '../RadioButtonSearch/RadioButtonSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import Select from '../Select/Select';
import { COUNTRIES, SORT_BY } from '@/constant/constants';
import { useState } from 'react';
import Input from '../Input/Input';

interface JobsProps {
  country: string;
  page: string;
}

const JobsComponent = ({ country, page }: JobsProps) => {
  const router = useRouter();
  const [minSalaryInput, setMinSalaryInput] = useState(0);
  const [maxSalaryInput, setMaxSalaryInput] = useState(0);
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get('category');
  const sort_by = searchParams.get('sort_by');
  const salary_max = searchParams.get('salary_max');
  const salary_min = searchParams.get('salary_min');

  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
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
        salary_max: Number(salary_max),
        salary_min: Number(salary_min),
      }),
  });

  const { data: category } = useQuery({
    queryKey: ['categories', country],
    queryFn: () => getJobsCategory(country),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (maxSalaryInput > 0 && maxSalaryInput >= minSalaryInput)
      params.set('salary_max', maxSalaryInput.toString());

    if (minSalaryInput > 0) params.set('salary_min', minSalaryInput.toString());

    router.push(`/jobs/${country}/1?${params.toString()}`);
  };

  if (isLoading) return <Loader />;

  if (error || !jobs) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500 text-lg'>Сталася помилка 😔</p>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-300 px-6 py-12'>
      <h1 className='text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent'>
        Вакансії
      </h1>

      <div className='max-w-7xl mx-auto flex gap-8'>
        {/* 🔥 Sidebar */}
        <aside className='hidden lg:block w-80'>
          <Select
            label='Країна'
            items={COUNTRIES}
            value={country}
            getValue={(c) => c.code}
            getLabel={(c) => c.name}
            onChange={(code) => router.push(`/jobs/${code}/1`)}
          />
          <div>
            <Select
              label='Сортування'
              items={SORT_BY}
              value={sort_by}
              getValue={(s) => s.key}
              getLabel={(s) => s.value}
              onChange={(sorted) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('sort_by', sorted);

                router.push(`/jobs/${country}/1?${params.toString()}`);
              }}
            />
          </div>
          <form onSubmit={handleSubmit} className='mb-6'>
            <Input
              type='number'
              label='Мінімальна зарплата'
              placeholder='Наприклад 2000'
              onChange={(val) => setMinSalaryInput(Number(val))}
            />

            <Input
              type='number'
              label='Максимальна зарплата'
              placeholder='Наприклад 8000'
              onChange={(val) => setMaxSalaryInput(Number(val))}
            />

            <Button className='w-full mt-2 cursor-pointer'>Пошук</Button>
          </form>
          <div className='top-28 bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-6 space-y-4'>
            <h3 className='text-xl font-bold mb-4'>Категорії</h3>

            <div className='space-y-2 max-h-[55vh] overflow-y-auto pr-2'>
              {category?.results?.map((result, indx) => (
                <RadioButtonSearch
                  key={indx}
                  label={result.label}
                  tag={result.tag}
                  onChange={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('category', result.tag);

                    router.push(`/jobs/${country}/1?${params.toString()}`);
                  }}
                />
              ))}
            </div>

            <Button
              onClick={() => router.push(`/jobs/${country}/1`)}
              className='w-full mt-4 rounded-xl bg-black text-white hover:bg-white hover:text-black border transition-all duration-300 hover:scale-105'
            >
              Скинути категорії
            </Button>
          </div>
        </aside>

        {/* 🔥 Jobs Section */}
        <section className='flex-1 space-y-8'>
          <JobsList results={jobs.results} />

          <div className='flex justify-center pt-8'>
            <JobsNextPage country={country} page={Number(page)} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default JobsComponent;
