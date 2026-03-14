interface CustomTooltipProps {
  firstParagraph: string;
  secondParagraph: string;
  payload?: {
    value: string;
  }[];
  label?: string;
}

const CustomTooltip = ({
  payload,
  label,
  firstParagraph,
  secondParagraph,
}: CustomTooltipProps) => {
  if (!payload || !payload.length) return null;

  return (
    <div className='bg-white border border-black/10 rounded-xl shadow-lg px-4 py-2 text-sm'>
      <p className='font-semibold'>
        {firstParagraph}: {label}
      </p>
      <p className='text-amber-600'>
        {secondParagraph}: {payload[0].value}
      </p>
    </div>
  );
};

export default CustomTooltip;
