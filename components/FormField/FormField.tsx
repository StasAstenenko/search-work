interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField = ({ label, error, children }: FieldProps) => {
  return (
    <div className='space-y-1'>
      <label className='text-sm font-medium text-gray-600'>{label}</label>

      {children}

      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
};

export default FormField;
