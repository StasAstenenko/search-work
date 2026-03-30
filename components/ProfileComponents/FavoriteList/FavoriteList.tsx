import { Favorite } from '@/types/Favorite.type';
import FavoriteCard from '../FavoriteCard/FavoriteCard';

interface FavoriteListProps {
  data: Favorite[] | undefined | null;
}

const FavoriteList = ({ data }: FavoriteListProps) => {
  if (!data?.length) {
    return (
      <div
        className='
        text-center
        text-gray-500
        py-10
      '
      >
        Немає улюблених вакансій ⭐
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-800'>Улюблені вакансії</h3>

      <div
        className='
          flex gap-5
          overflow-x-auto
          pb-4
          snap-x snap-mandatory
          scroll-smooth

          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        '
      >
        {data.map((el) => (
          <FavoriteCard key={el.id} data={el} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;
