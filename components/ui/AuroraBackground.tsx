import Aurora from '../Aurora';

export default function AuroraBackground() {
  return (
    <Aurora
      colorStops={["F566FF", "#DC56E6", "#6092E1"]}
      blend={0.5}
      amplitude={1.0}
      speed={0.5}
    />
  );
}