'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface JobsNextPageProps {
  country: string;
  page: number;
}

const JobsNextPage = ({ page, country }: JobsNextPageProps) => {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  return (
    <div className='flex gap-4'>
      {page > 1 && (
        <Link
          href={`/jobs/${country}/${page - 1}?${params.toString()}`}
          className='flex items-center gap-2 px-4 py-2 rounded-full
          bg-white/80 backdrop-blur-xl shadow-md
          hover:scale-105 hover:bg-orange-500 hover:text-white
          transition-all duration-300'
        >
          <ChevronLeft size={16} />
          Минула
        </Link>
      )}

      <Link
        href={`/jobs/${country}/${page + 1}?${params.toString()}`}
        className='flex items-center gap-2 px-4 py-2 rounded-full
        bg-gradient-to-r from-amber-500 to-orange-500 text-white
        shadow-lg hover:scale-105 transition-all duration-300'
      >
        Наступна
        <ChevronRight size={16} />
      </Link>
    </div>
  );
};

export default JobsNextPage;
