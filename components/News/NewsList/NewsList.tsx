'use client';

import { getNews } from '@/services/news/getNews';
import { useQuery } from '@tanstack/react-query';
import NewsCard from '../NewsCard/NewsCard';
import { FIVE_MINUTES } from '@/constant/constants';
import NewsSkeleton from '../NewsSkeleton/NewsSkeleton';

const NewsList = () => {
  const {
    data: news,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <NewsSkeleton />;
  }

  if (error || !news) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500 text-lg'>Сталася помилка 😔</p>
      </div>
    );
  }

  return (
    <main
      className='min-h-screen px-6 py-12 
    bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-300'
    >
      <h1
        className='text-4xl font-bold text-center mb-12
      bg-gradient-to-r from-amber-600 to-orange-500 
      bg-clip-text text-transparent'
      >
        Останні новини
      </h1>

      <ul className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto'>
        {news.map((el, indx) => (
          <li key={indx}>
            <NewsCard {...el} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default NewsList;
