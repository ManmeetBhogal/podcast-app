import React from "react";

// Types
export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type GlassNavBarProps = {
  brand?: React.ReactNode;
  items?: NavItem[];
  className?: string;
  fixed?: boolean;
  blurPx?: number;
};

const GlassNavBar: React.FC<GlassNavBarProps> = ({
  brand,
  items = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Episodes", href: "#episodes" },
  ],
  className = "",
  fixed = true,
  blurPx = 40,
}) => {
  const Wrapper: React.ElementType = fixed ? "div" : "section";

  return (
    <Wrapper
      className={[
        fixed ? "fixed top-6 inset-x-0 z-50" : "relative z-50",
        "flex justify-center pointer-events-none font-[Figtree,sans-serif]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-auto relative">
        {/* Outer glow / subtle border gradient */}
        <div className="absolute -inset-1 rounded-full blur-lg opacity-40" aria-hidden>
          <div className="h-full w-full rounded-full bg-[radial-gradient(120%_180%_at_50%_-30%,rgba(255,255,255,0.15),transparent_60%)]" />
        </div>

        {/* Glass container */}
        <nav
          aria-label="Primary"
          className="relative flex items-center rounded-full border-[rgba(255,255,255,0.35)] border-[0.5px] bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-saturate-150 supports-[backdrop-filter]:bg-white/5 w-[min(92vw,1100px)] h-14 px-6"
          style={{
            WebkitBackdropFilter: `blur(${blurPx}px) saturate(1.3)`,
            backdropFilter: `blur(${blurPx}px) saturate(1.3)`,
          }}
        >
          {/* Liquid sheen layer */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          >
            <span className="absolute -inset-8 rounded-[inherit] opacity-[0.4] mix-blend-soft-light liquid-sheen" />
          </span>

          {/* Left brand text */}
          {brand ?? (
            <a
              href="#"
              className="text-lg font-semibold tracking-tight text-white/85 hover:text-white transition-colors"
            >
              brainSTEM
            </a>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right-aligned links */}
          <ul className="flex items-center gap-2">
            {items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="rounded-full px-4 py-2 text-base font-medium text-white/75 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Inner highlight ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full ring-[0.5px] ring-inset ring-[rgba(255,255,255,0.3)]"
          />
        </nav>
      </div>

      <style jsx>{`
        .liquid-sheen {
          background: 
            radial-gradient(40% 60% at 0% 50%, rgba(255,255,255,0.25), transparent 60%),
            radial-gradient(60% 40% at 100% 50%, rgba(255,255,255,0.1), transparent 60%),
            conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0.1), rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.0) 85%);
          filter: blur(20px) saturate(1.1);
          animation: drift 14s ease-in-out infinite alternate;
        }

        @keyframes drift {
          0% { transform: translateX(-8%) translateY(-6%) rotate(0deg); }
          100% { transform: translateX(8%) translateY(6%) rotate(6deg); }
        }
      `}</style>
    </Wrapper>
  );
};

export default GlassNavBar;
