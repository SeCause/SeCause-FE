import styles from './LogoAssembly.module.css';

const STEPS = [
  { label: 'Detect', detail: '취약점 탐지', className: styles.stepOne },
  { label: 'Explain', detail: '원인 분석', className: styles.stepTwo },
  { label: 'Resolve', detail: '수정 제안', className: styles.stepThree },
];

export default function LogoAssembly() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-110" aria-label="SeCause 분석 과정">
      <div className="border-blue/15 absolute inset-[8%] rounded-full border" />
      <div className="border-blue/10 absolute inset-[18%] rounded-full border" />
      <div
        className={`${styles.orbit} border-blue/20 absolute inset-[3%] rounded-full border border-dashed`}
      />

      <div className="absolute inset-[23%] flex items-center justify-center rounded-[30%] bg-[#f3f6fd] shadow-[0_25px_65px_rgba(53,109,230,0.13)]">
        <div className={styles.scanLine} aria-hidden="true" />
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 24 24"
            role="img"
            aria-label="SeCause S 로고"
            className="h-24 w-24 overflow-visible md:h-30 md:w-30"
          >
            <g fill="#356de6" className={styles.mark}>
              <g className={styles.piece}>
                <rect
                  x="18.1292"
                  y="17.9541"
                  width="2.04676"
                  height="6.65188"
                  rx="1.02338"
                  transform="rotate(180 18.1292 17.9541)"
                />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.04674"
                  height="7.16363"
                  rx="1.02337"
                  transform="matrix(-0.480929 0.876759 -0.876764 -0.480921 18.3853 11.6465)"
                />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.06647"
                  height="7.09089"
                  rx="1.03324"
                  transform="matrix(-0.480993 0.876724 0.876729 0.480984 7.15161 15.8486)"
                />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.04676"
                  height="4.60515"
                  rx="1.02338"
                  transform="matrix(-1 0 0 1 8.40674 13.5342)"
                />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.04674"
                  height="7.60183"
                  rx="1.02337"
                  transform="matrix(0.480993 0.876724 -0.876729 0.480984 17.5156 15.7627)"
                />
              </g>
              <g className={styles.piece}>
                <rect x="6.37061" y="5.25781" width="2.04676" height="6.65188" rx="1.02338" />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.04674"
                  height="7.16363"
                  rx="1.02337"
                  transform="matrix(0.480929 -0.876759 0.876764 0.480921 6.1145 11.5664)"
                />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.06647"
                  height="7.09089"
                  rx="1.03324"
                  transform="matrix(0.480993 -0.876724 -0.876729 -0.480984 17.3484 7.36426)"
                />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.04676"
                  height="4.60515"
                  rx="1.02338"
                  transform="matrix(1 0 0 -1 16.093 9.67969)"
                />
              </g>
              <g className={styles.piece}>
                <rect
                  width="2.04674"
                  height="7.60183"
                  rx="1.02337"
                  transform="matrix(-0.480993 -0.876724 0.876729 -0.480984 6.98438 7.45117)"
                />
              </g>
            </g>
          </svg>
          <div className="relative mt-1 flex h-8 items-center justify-center md:h-9">
            <p
              aria-hidden="true"
              className={`${styles.codemark} text-blue absolute font-mono text-xl font-semibold tracking-[0.12em] md:text-2xl`}
            >
              &lt;/&gt;
            </p>
            <p
              className={`${styles.wordmark} absolute text-2xl font-semibold tracking-[-0.055em] text-gray-900 md:text-3xl`}
            >
              SeCause
            </p>
          </div>
        </div>
      </div>

      {STEPS.map((step, index) => (
        <div
          key={step.label}
          className={`${styles.step} border-blue/15 absolute rounded-full border bg-white px-4 py-2.5 shadow-[0_12px_35px_rgba(53,109,230,0.1)] ${step.className}`}
        >
          <span className="text-blue mr-2 font-mono text-[9px]">0{index + 1}</span>
          <span className="text-xs font-semibold text-gray-900">{step.label}</span>
          <span className="ml-2 hidden text-[10px] text-gray-500 sm:inline">{step.detail}</span>
        </div>
      ))}
    </div>
  );
}
