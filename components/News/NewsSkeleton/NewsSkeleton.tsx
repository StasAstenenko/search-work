const NewsSkeleton = () => {
  return (
    <div
      className='bg-white/90 backdrop-blur-xl
    rounded-3xl shadow-xl border border-white/40
    overflow-hidden animate-pulse'
    >
      <div className='h-52 bg-orange-200/60'></div>

      <div className='p-5 space-y-3'>
        <div className='h-4 w-24 bg-orange-200/60 rounded'></div>
        <div className='h-5 w-3/4 bg-orange-200/60 rounded'></div>
        <div className='h-4 w-full bg-orange-200/60 rounded'></div>
        <div className='h-4 w-5/6 bg-orange-200/60 rounded'></div>
      </div>
    </div>
  );
};

export default NewsSkeleton;
