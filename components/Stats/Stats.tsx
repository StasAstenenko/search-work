'use client';

import {
  getHistogram,
  getHistory,
  getTopCompanies,
} from '@/services/jobs/jobs.service';
import { useQuery } from '@tanstack/react-query';
import Histogram from './Histogram/Histogram';
import Select from '../Select/Select';
import { COUNTRIES, FIVE_MINUTES } from '@/constant/constants';
import { useRouter } from 'next/navigation';
import TopCompanies from './TopCompanies/TopCompanies';
import StatsSkeleton from './StatsSkeleton';
import History from './History/History';

interface StatsComponentProps {
  country: string;
}

const StatsComponent = ({ country }: StatsComponentProps) => {
  const router = useRouter();

  const { data: histogram, isLoading: histogramLoading } = useQuery({
    queryKey: ['histogram', country],
    queryFn: () => getHistogram(country),
    staleTime: FIVE_MINUTES,
  });

  const { data: top_companies, isLoading: top_companiesLoading } = useQuery({
    queryKey: ['top_companies', country],
    queryFn: () => getTopCompanies(country),
    staleTime: FIVE_MINUTES,
  });

  const { data: history } = useQuery({
    queryKey: ['history', country],
    queryFn: () => getHistory(country),
    staleTime: FIVE_MINUTES,
  });

  if (histogramLoading || top_companiesLoading) {
    return <StatsSkeleton length={top_companies?.leaderboard?.length} />;
  }

  if (!histogram || !history) {
    return null;
  }

  return (
    <main className='min-h-screen bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300 px-6 py-12'>
      {/* Title */}
      <h1 className='text-4xl font-bold text-center mb-10 bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent'>
        Статистика вакансій
      </h1>

      <div className='max-w-7xl mx-auto space-y-10'>
        {/* Country Select */}
        <div className='max-w-xs'>
          <Select
            label='Країна'
            items={COUNTRIES}
            value={country}
            getValue={(c) => c.code}
            getLabel={(c) => c.name}
            onChange={(code) => router.push(`/stats/${code}`)}
          />
        </div>

        {/* Dashboard grid */}
        <div className='grid lg:grid-cols-2 gap-8'>
          <div className='bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-8'>
            <h2 className='text-xl font-bold mb-6'>Розподіл зарплат</h2>
            <Histogram histogram={histogram} />
          </div>

          <div className='bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-8'>
            <h2 className='text-xl font-bold mb-6'>Топ компаній</h2>

            <ul className='space-y-4'>
              {top_companies?.leaderboard.map((top_company) => (
                <TopCompanies
                  key={top_company.canonical_name}
                  canonical_name={top_company.canonical_name}
                  count={top_company.count}
                />
              ))}
            </ul>
          </div>

          <div className='lg:col-span-2 bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-8'>
            <History month={history} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default StatsComponent;
