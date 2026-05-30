type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ readOnly, className = '', ...props }: Props) {
  return (
    <input
      readOnly={readOnly}
      className={`text-body-lg w-full rounded-lg border px-4 py-3 outline-none placeholder:text-gray-400 ${
        readOnly
          ? 'cursor-default border-gray-200 bg-gray-50 text-gray-900'
          : 'focus:border-blue border-gray-300 text-gray-900'
      } ${className}`}
      {...props}
    />
  );
}
