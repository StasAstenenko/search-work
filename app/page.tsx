import Link from 'next/link';

export default function Page() {
  return (
    <main
      className='relative h-screen flex justify-center items-center 
    bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-300 overflow-hidden'
    >
      {/* glow background */}
      <div className='absolute w-72 h-72 bg-yellow-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse'></div>
      <div className='absolute w-72 h-72 bg-orange-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse'></div>

      <section
        className='relative w-[420px] p-8 bg-white/90 backdrop-blur-xl 
      text-center rounded-3xl shadow-2xl 
      transition-all duration-500 
      hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]'
      >
        <h1
          className='font-bold text-3xl mb-6 
        bg-gradient-to-r from-amber-600 to-orange-500 
        bg-clip-text text-transparent'
        >
          Вітаємо на нашому сайті
        </h1>

        <p className='font-medium text-lg text-gray-700 mb-8 leading-relaxed'>
          Щоб переглянути вакансії та статистику, потрібно увійти або
          зареєструватися
        </p>

        <div className='flex justify-center gap-4'>
          <Link
            href='/register'
            className='min-w-40 py-2 px-4 rounded-full font-medium 
            bg-gradient-to-r from-amber-500 to-orange-500 text-white 
            shadow-lg transition-all duration-300 
            hover:scale-110 hover:shadow-xl active:scale-95'
          >
            Зареєструватися
          </Link>

          <Link
            href='/login'
            className='min-w-40 py-2 px-4 rounded-full font-medium 
            border border-orange-500 text-orange-600 
            transition-all duration-300 
            hover:bg-orange-500 hover:text-white hover:scale-110 active:scale-95'
          >
            Увійти
          </Link>
        </div>
      </section>
    </main>
  );
}
