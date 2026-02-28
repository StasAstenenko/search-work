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
    flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer
    border text-sm font-medium
    transition-all duration-300
    ${
      isActive
        ? 'bg-black text-white border-black shadow-md'
        : 'bg-white hover:bg-black hover:text-white hover:shadow-md'
    }
  `}
    >
      <span>{label}</span>

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
      ${isActive ? 'bg-white border-white' : 'border-black'}
    `}
      />
    </label>
  );
};

export default RadioButtonSearch;
