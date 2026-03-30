'use client';

import { useFavorite } from '@/hooks/favoriteHook';
import { Favorite } from '@/types/Favorite.type';
import { Building2, Briefcase, Banknote, Heart } from 'lucide-react';
import Link from 'next/link';

interface FavoriteCardProps {
  data: Favorite;
}

const FavoriteCard = ({ data }: FavoriteCardProps) => {
  const { deleteFavoriteMutate } = useFavorite();

  return (
    <div
      className='
        group
        min-w-70
        max-w-70
        max-h-85
        overflow-hidden
        bg-white/90 backdrop-blur-xl
        rounded-3xl
        shadow-xl
        border border-white/40
        p-5
        flex flex-col justify-between
        transition-all duration-500
        hover:scale-[1.03]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        snap-start
      '
    >
      {/* top */}
      <div className='space-y-3'>
        {/* remove */}
        <div className='flex justify-end'>
          <button
            onClick={() => deleteFavoriteMutate.mutate(data.jobId)}
            className='
              p-2 rounded-full
              border border-black/10
              transition
              hover:scale-110
              hover:bg-orange-100
            '
          >
            <Heart size={18} className='fill-orange-500 text-orange-500' />
          </button>
        </div>

        <div className='flex items-center gap-2 text-xs text-gray-500'>
          <Briefcase size={14} />
          <span className='truncate'>{data.category}</span>
        </div>

        <h2 className='text-lg font-semibold text-gray-800 line-clamp-2 min-h-13 group-hover:text-orange-600 transition'>
          {data.title}
        </h2>

        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Building2 size={15} />
          <span className='truncate'>{data.companyName}</span>
        </div>

        <p className='text-sm text-gray-600 line-clamp-3 min-h-15'>
          {data.description}
        </p>
      </div>

      {/* bottom */}
      <div className='space-y-3'>
        {(data.minSalary || data.maxSalary) && (
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
            {data.minSalary ?? '—'} — {data.maxSalary ?? '—'}
          </div>
        )}

        {data.redirectUrl && (
          <Link
            href={data.redirectUrl}
            target='_blank'
            className='
              block text-center
              text-sm font-medium
              border border-black/10
              rounded-xl
              py-2
              transition
              hover:bg-black
              hover:text-white
            '
          >
            Перейти
          </Link>
        )}
      </div>
    </div>
  );
};

export default FavoriteCard;
