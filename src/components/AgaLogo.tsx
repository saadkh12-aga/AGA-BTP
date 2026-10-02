import React from 'react';

interface AgaLogoProps {
  variant?: 'horizontal' | 'vertical' | 'emblem';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
}

export const AgaEmblem: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="agaGoldGrad" x1="40" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d9b668" />
          <stop offset="50%" stopColor="#b99953" />
          <stop offset="100%" stopColor="#9a7a35" />
        </linearGradient>
      </defs>

      {/* 5 Stacked Architectural Chevron Beams (Identical to uploaded logo) */}
      {/* 1st (Top) Beam */}
      <path
        d="M 45 42 L 95 18 L 132 32"
        stroke="url(#agaGoldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 2nd Beam */}
      <path
        d="M 45 58 L 95 34 L 132 48"
        stroke="url(#agaGoldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 3rd Beam */}
      <path
        d="M 45 74 L 95 50 L 132 64"
        stroke="url(#agaGoldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 4th Beam */}
      <path
        d="M 45 90 L 95 66 L 132 80"
        stroke="url(#agaGoldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 5th (Bottom) Beam */}
      <path
        d="M 45 106 L 95 82 L 132 96"
        stroke="url(#agaGoldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AgaLogo: React.FC<AgaLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'INVESTISSEMENT',
  className = ''
}) => {
  const emblemSizes = {
    sm: 28,
    md: 38,
    lg: 52,
    xl: 72,
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
    xl: 'text-sm tracking-widest',
  };

  if (variant === 'emblem') {
    return <AgaEmblem size={emblemSizes[size]} className={className} />;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <AgaEmblem size={emblemSizes[size]} className="mb-2" />
        <div className={`font-serif-luxury font-bold text-[#b99953] tracking-wider ${titleSizes[size]}`}>
          AGA Projects
        </div>
        {showSubtitle && (
          <div className={`font-sans font-semibold uppercase text-neutral-400 mt-0.5 ${subSizes[size]}`}>
            {subtitleText}
          </div>
        )}
      </div>
    );
  }

  // Default: Horizontal lockup (for top navigation bar)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AgaEmblem size={emblemSizes[size]} />
      <div className="flex flex-col leading-none text-left">
        <span className={`font-serif-luxury font-bold text-white tracking-wider flex items-center gap-1.5 ${titleSizes[size]}`}>
          <span className="text-[#b99953]">AGA</span>
          <span>Projects</span>
        </span>
        {showSubtitle && (
          <span className={`font-sans font-medium uppercase text-neutral-400 mt-1 text-[9px] tracking-widest`}>
            INVESTISSEMENT · MAROC
          </span>
        )}
      </div>
    </div>
  );
};
