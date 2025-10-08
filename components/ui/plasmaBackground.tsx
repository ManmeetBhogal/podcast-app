import Plasma from '../Plasma';

export default function plasmaBackground() {
return (
  <div style={{ width: '100%', height: '600px', position: 'relative' }}>
    <Plasma 
      color="#79256e"
      speed={0.9}
      direction="forward"
      scale={1.6}
      opacity={0.5}
      mouseInteractive={false}
    />
  </div>
  );
}
