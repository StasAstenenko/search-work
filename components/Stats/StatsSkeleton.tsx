import Skeleton from '../Skeleton/Skeleton';

interface StatsSkeletonProps {
  length?: number;
}

const StatsSkeleton = ({ length = 6 }: StatsSkeletonProps) => {
  return (
    <main className='min-h-screen bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300 px-6 py-12'>
      <div className='max-w-7xl mx-auto space-y-10'>
        <Skeleton className='w-64 h-12 rounded-xl' />

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* chart skeleton */}
          <div className='bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-8 space-y-6'>
            <Skeleton className='w-40 h-6' />
            <Skeleton className='w-full h-80 rounded-xl' />
          </div>

          {/* companies skeleton */}
          <div className='bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-8 space-y-4'>
            <Skeleton className='w-40 h-6 mb-4' />

            {Array.from({ length }).map((_, i) => (
              <Skeleton key={i} className='w-full h-14 rounded-xl' />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StatsSkeleton;
