import { Results } from '@/types/Jobs.type';
import { Building2, Briefcase, Banknote } from 'lucide-react';

interface JobsCardProps {
  result: Results;
}

const JobsCard = ({ result }: JobsCardProps) => {
  return (
    <div
      className='group bg-white/90 backdrop-blur-xl
      rounded-3xl shadow-xl border border-white/40
      p-6 flex flex-col justify-between
      transition-all duration-500
      hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]'
    >
      <div className='space-y-3'>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Briefcase size={16} />
          <span>{result.category.label}</span>
        </div>

        <h2
          className='text-lg font-semibold text-gray-800
        group-hover:text-orange-600 transition-colors duration-300'
        >
          {result.title}
        </h2>

        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Building2 size={16} />
          <span>{result.company.display_name}</span>
        </div>

        <p className='text-sm text-gray-600 line-clamp-3'>
          {result.description}
        </p>
      </div>

      {(result.salary_min || result.salary_max) && (
        <div
          className='mt-4 flex items-center gap-2 
        bg-linear-to-r from-amber-500 to-orange-500 
        text-white px-3 py-1 rounded-full text-sm w-fit'
        >
          <Banknote size={14} />
          {result.salary_min ?? '—'} - {result.salary_max ?? '—'}
        </div>
      )}
    </div>
  );
};

export default JobsCard;
