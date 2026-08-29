export default function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="snap-start border-t border-gray-900/10 bg-gray-900 px-6 py-12 text-white md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-semibold tracking-tighter">SeCause</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
              코드의 취약점을 발견하고, 원인을 이해하고, 안전하게 해결하세요.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-left sm:text-right">
            <span className="text-label-mono font-mono text-white/35">BUILT ON GITHUB</span>
            <span className="text-sm text-white/70">AI-powered code security analysis</span>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="GitHub 링크" className="flex flex-wrap gap-6">
            <a
              href="https://github.com/SeCause"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/55 hover:text-white"
            >
              GitHub ↗
            </a>
          </nav>
          <p className="text-label-mono font-mono text-white/35">
            © {year} SECAUSE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
