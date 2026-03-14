import { LeaderBoard } from '@/types/TopCompanies.type';

const TopCompanies = ({ canonical_name, count }: LeaderBoard) => {
  return (
    <li
      className='
        p-4 rounded-xl
        border border-black/10
        bg-white
        flex flex-col gap-2
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-md
      '
    >
      <div className='flex justify-between items-center'>
        <h3 className='font-semibold text-gray-800'>{canonical_name}</h3>

        <span className='text-sm font-bold text-amber-600'>{count}</span>
      </div>

      {/* progress bar */}
      <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className='h-full bg-linear-to-r from-amber-500 to-orange-500 transition-all duration-700'
          style={{ width: `${Math.min(count * 10, 100)}%` }}
        />
      </div>
    </li>
  );
};

export default TopCompanies;
