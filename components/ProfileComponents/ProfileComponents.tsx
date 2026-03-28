'use client';

import ProfileField from './ProfileField/ProfileField';
import { useFavorite } from '@/hooks/favoriteHook';

const ProfileComponent = () => {
  const { data, error, isLoading } = useFavorite();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300'>
        <div className='animate-pulse bg-white/80 backdrop-blur-xl rounded-2xl w-80 h-60 shadow-xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300'>
        <p className='text-red-500 font-medium'>Помилка завантаження 😔</p>
      </div>
    );
  }

  const user = data?.user;

  const age = user?.age ?? 'Не вказано';
  const gender = user?.gender ?? 'Не вказано';
  const resume = user?.resumeUrl ?? 'Не вказано';

  return (
    <main className='min-h-screen bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300 px-6 py-12 flex justify-center'>
      <div
        className='
          w-full max-w-xl
          bg-white/90 backdrop-blur-xl
          border border-black/10
          rounded-2xl
          shadow-xl
          p-8
          space-y-6
          transition
          hover:shadow-2xl
        '
      >
        {/* avatar */}
        <div className='flex flex-col items-center gap-3'>
          <div
            className='
              w-20 h-20
              rounded-full
              bg-linear-to-br from-amber-400 to-orange-500
              text-white
              flex items-center justify-center
              text-2xl font-bold
              shadow-md
            '
          >
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>

          <h2 className='text-2xl font-bold text-gray-800'>
            {user?.firstName} {user?.lastName}
          </h2>

          <p className='text-gray-500'>{user?.email}</p>
        </div>

        {/* info */}
        <div className='space-y-4'>
          <ProfileField label='Вік' value={age} />

          <ProfileField label='Стать' value={gender} />

          <ProfileField label='Резюме' value={resume} isLink />
        </div>

        {/* favorites jobs */}
        <div></div>
      </div>
    </main>
  );
};

export default ProfileComponent;
