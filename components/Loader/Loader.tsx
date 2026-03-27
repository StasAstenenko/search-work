const Loader = () => {
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center
    bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300'
    >
      <div className='relative'>
        {/* Outer glow */}
        <div
          className='absolute inset-0 rounded-full blur-2xl 
        bg-linear-to-r from-amber-400 to-orange-500 
        opacity-40 animate-pulse'
        ></div>

        {/* Spinner */}
        <div
          className='w-20 h-20 rounded-full border-4 
        border-orange-200 border-t-orange-600 
        animate-spin'
        ></div>
      </div>

      <p className='mt-6 text-lg font-medium text-gray-700 animate-pulse'>
        Завантаження...
      </p>
    </div>
  );
};

export default Loader;
