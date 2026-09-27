import Button from './Button';

interface Props {
  message: string;
  onRetry: () => void;
  compact?: boolean;
}

export default function RetryState({ message, onRetry, compact = false }: Props) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center ${compact ? 'gap-2 px-2 py-3' : 'm-auto gap-3 py-6'}`}
    >
      <p className={`${compact ? 'text-body-sm' : 'text-body-md'} text-foreground-tertiary`}>
        {message}
      </p>
      <Button type="button" onClick={onRetry} className="px-4! py-1.5!">
        다시 시도
      </Button>
    </div>
  );
}
