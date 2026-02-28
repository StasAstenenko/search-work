import { useSearchParams } from 'next/navigation';

interface RadioButtonSearchProps {
  tag: string;
  label: string;
  onChange: () => void;
}

const RadioButtonSearch = ({
  label,
  tag,
  onChange,
}: RadioButtonSearchProps) => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  if (tag === 'unknown') return null;

  const isActive = activeCategory === tag;

  return (
    <label
      className={`
        flex items-center justify-between p-3 rounded-xl cursor-pointer
        border transition-all duration-300
        ${
          isActive
            ? 'bg-black text-white border-black scale-[1.02]'
            : 'bg-white hover:bg-black hover:text-white hover:scale-[1.02]'
        }
      `}
    >
      <span className='font-medium text-sm'>{label}</span>

      <input
        type='radio'
        value={tag}
        checked={isActive}
        onChange={onChange}
        className='hidden'
      />

      <div
        className={`
          w-4 h-4 rounded-full border-2 transition-all duration-300
          ${
            isActive
              ? 'bg-white border-white'
              : 'border-black group-hover:border-white'
          }
        `}
      />
    </label>
  );
};

export default RadioButtonSearch;
