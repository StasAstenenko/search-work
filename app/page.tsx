import Link from 'next/link';

export default function Page() {
  return (
    <main className='h-screen flex justify-center items-center bg-amber-200 '>
      <section className='m-auto w-120 p-4 bg-white text-center border border-black rounded-2xl hover:scale-110 transition-all duration-300'>
        <h1 className='font-bold text-2xl mb-6'>Вітаєм на нашому сайті</h1>
        <p className='font-semibold text-xl mb-8'>
          Щоб переглянути вакансії та статистики треба увійти в свій акаунт або
          зареєструватись
        </p>
        <div className='flex justify-center items-center gap-3'>
          <Link
            href='/register'
            className='min-w-40 font-medium py-1 px-1.5 border rounded-4xl bg-black text-white hover:scale-110 hover:bg-white hover:text-black transition-all duration-300'
          >
            Зареєструватися
          </Link>
          <Link
            href='/login'
            className='min-w-40 font-medium py-1 px-1.5 border rounded-4xl bg-black text-white hover:scale-110 hover:bg-white hover:text-black transition-all duration-300'
          >
            Залогінитись
          </Link>
        </div>
      </section>
    </main>
  );
}
