'use client';

import { useState } from 'react';

interface SelectProps<T> {
  items: T[];
  value: string;
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  onChange: (value: string) => void;
  label?: string;
}

const Select = <T,>({
  items,
  value,
  getValue,
  getLabel,
  onChange,
  label,
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);

  const current = items.find((item) => getValue(item) === value);

  const handleSelect = (val: string) => {
    setOpen(false);
    onChange(val);
  };

  return (
    <div className='relative mb-6'>
      {label && (
        <label className='block text-sm font-semibold mb-2'>{label}</label>
      )}

      <div
        onClick={() => setOpen(!open)}
        className='w-full px-4 py-3 rounded-xl bg-white border border-black/20 shadow-sm flex justify-between items-center cursor-pointer'
      >
        <span className='text-sm font-medium'>
          {current ? getLabel(current) : 'Select'}
        </span>
      </div>

      <div
        className={`absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl transition-all duration-200 ${
          open
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {items.map((item) => {
          const val = getValue(item);
          return (
            <div
              key={val}
              onClick={() => handleSelect(val)}
              className='px-4 py-3 text-sm cursor-pointer hover:bg-black hover:text-white'
            >
              {getLabel(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
