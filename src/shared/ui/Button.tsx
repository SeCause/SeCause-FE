interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}

const VARIANT_STYLES = {
  primary: 'bg-blue text-white hover:bg-blue-dark',
  danger: 'bg-red-500 text-white hover:bg-red-600',
} as const;

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  return (
    <button
      className={`text-label-lg rounded-lg px-6 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
