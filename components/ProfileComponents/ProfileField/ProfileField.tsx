import Link from 'next/link';

interface ProfileFieldProps {
  label: string;
  value: string | number;
  isLink?: boolean;
}

const ProfileField = ({ label, value, isLink }: ProfileFieldProps) => {
  return (
    <div
      className='
        flex justify-between items-center
        p-4
        rounded-xl
        border border-black/10
        bg-white
        transition
        hover:scale-[1.02]
        hover:shadow-sm
      '
    >
      <span className='text-gray-500'>{label}</span>

      {isLink && value !== 'Не вказано' ? (
        <Link
          href={String(value)}
          target='_blank'
          className='font-medium text-amber-600 hover:underline'
        >
          Відкрити
        </Link>
      ) : (
        <span className='font-medium text-gray-800'>{value}</span>
      )}
    </div>
  );
};

export default ProfileField;
