import Image from 'next/image';

export default function SecurityAnalysisVisual() {
  return (
    <Image
      src="/landing-security-hero-overview-v7.png"
      alt=""
      width={1536}
      height={1024}
      priority
      sizes="(min-width: 1024px) 52vw, 100vw"
      className="h-auto w-full max-w-124 object-contain lg:w-[88%]"
    />
  );
}
