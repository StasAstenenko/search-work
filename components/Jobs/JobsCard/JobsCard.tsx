'use client';

import { useFavorite } from '@/hooks/favoriteHook';
import { Results } from '@/types/Jobs.type';
import { Building2, Briefcase, Banknote, Heart } from 'lucide-react';
import Link from 'next/link';

interface JobsCardProps {
  result: Results;
}

const JobsCard = ({ result }: JobsCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorite(result);

  return (
    <div
      className='
        group
        h-full
        bg-white/90 backdrop-blur-xl
        rounded-3xl
        shadow-xl
        border border-white/40
        p-6
        flex flex-col
        justify-between
        transition-all duration-500
        hover:scale-[1.02]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      '
    >
      {/* TOP */}
      <div className='space-y-3'>
        {/* favorite */}
        <div className='flex justify-end '>
          <button
            onClick={() => toggleFavorite(result)}
            className='
              p-2 rounded-full
              border border-black/10
              transition
              hover:scale-110
              hover:bg-orange-100
              cursor-pointer
            '
          >
            <Heart
              size={18}
              className={`
                transition
                ${
                  isFavorite
                    ? 'fill-orange-500 text-orange-500'
                    : 'text-gray-400'
                }
              `}
            />
          </button>
        </div>

        {/* category */}
        <div className='flex items-center gap-2 text-xs text-gray-500'>
          <Briefcase size={14} />
          <span className='truncate'>{result.category.label}</span>
        </div>

        {/* title */}
        <h2
          className='
            text-lg font-semibold text-gray-800
            line-clamp-2
            min-h-14
            group-hover:text-orange-600
            transition-colors
          '
        >
          {result.title}
        </h2>

        {/* company */}
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Building2 size={15} />

          <span className='truncate'>{result.company.display_name}</span>
        </div>

        {/* description */}
        <p className='text-sm text-gray-600 line-clamp-3 min-h-15'>
          {result.description}
        </p>
      </div>

      {/* BOTTOM */}
      <div className='space-y-4 mt-4'>
        {/* salary */}
        {(result.salary_min || result.salary_max) && (
          <div
            className='
              flex items-center gap-2
              bg-linear-to-r from-amber-500 to-orange-500
              text-white
              px-3 py-1.5
              rounded-full
              text-xs
              w-fit
            '
          >
            <Banknote size={14} />
            {result.salary_min ?? '—'} — {result.salary_max ?? '—'}
          </div>
        )}

        {/* link */}
        {result.redirect_url && (
          <Link
            href={result.redirect_url}
            target='_blank'
            className='
              block
              text-center
              text-sm
              font-medium
              border border-black/10
              rounded-xl
              py-2
              transition
              hover:bg-black
              hover:text-white
              hover:scale-[1.02]
            '
          >
            Перейти до вакансії
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobsCard;
