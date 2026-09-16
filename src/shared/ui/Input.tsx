import { cn } from '@/shared/lib/cn';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ readOnly, className, ...props }: Props) {
  return (
    <input
      readOnly={readOnly}
      className={cn(
        'text-body-lg placeholder:text-foreground-disabled w-full rounded-lg border px-4 py-3 outline-none',
        readOnly
          ? 'border-border-subtle bg-surface-subtle text-foreground cursor-default'
          : 'focus:border-blue border-border-default text-foreground',
        className,
      )}
      {...props}
    />
  );
}
