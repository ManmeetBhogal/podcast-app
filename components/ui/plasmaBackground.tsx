export default function PlasmaBackground({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .about-gradient {
          background: linear-gradient(
            135deg,
            #0a0812,
            #1a0f2e,
            #6092E1,
            #2a1040,
            #DC56E6,
            #130a24,
            #3b1f6b,
            #0a0812
          );
          background-size: 400% 400%;
          animation: gradientShift 14s ease infinite;
        }
      `}</style>
      <div
        className="absolute inset-0 w-full h-full -z-10 about-gradient"
        style={{ opacity }}
        aria-hidden="true"
      />
    </>
  );
}