type InputType = 'number' | 'text' | 'email' | 'password';

interface InputProps {
  type: InputType;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
}

const Input = ({ type, onChange, label, placeholder }: InputProps) => {
  const handleChange = (val: string) => {
    onChange(val);
  };

  return (
    <div className='flex flex-col gap-1 mb-4'>
      {label && (
        <label className='text-sm font-semibold text-gray-700'>{label}</label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.currentTarget.value)}
        className='
          w-full
          px-4 py-3
          rounded-xl
          border border-black/20
          bg-white/90 backdrop-blur-xl
          text-sm font-medium
          shadow-sm
          transition-all duration-300
          hover:shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-black/40
          focus:scale-[1.02]
        '
      />
    </div>
  );
};

export default Input;
