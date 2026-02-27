import { useEffect, useRef, useState, useMemo } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

// --- Shaders ---
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float t = smoothstep(0.0, 1.0, uv.x);
  vec3 rampColor = mix(mix(uColorStops[0], uColorStops[1], smoothstep(0.0, 0.5, t)), uColorStops[2], smoothstep(0.5, 1.0, t));
  float noiseVal = snoise(vec2(uv.x * 1.5 + uTime * 0.1, uTime * 0.15));
  float height = exp(noiseVal * 0.5 * uAmplitude);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  float auroraAlpha = smoothstep(0.2 - uBlend * 0.5, 0.2 + uBlend * 0.5, intensity);
  fragColor = vec4(intensity * rampColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

function hexToRgbNormalized(hex: string): [number, number, number] {
  let h = hex.replace(/^#/, '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

export default function Aurora({
  colorStops = ['#5227FF', '#7cff67', '#5227FF'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0
}: AuroraProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const normalizedStops = useMemo(() => colorStops.map(hexToRgbNormalized), [colorStops]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShouldRender(entry.isIntersecting);
    }, { threshold: 0.05 });
    if (ctnDom.current) observer.observe(ctnDom.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldRender || !ctnDom.current) return;
    const ctn = ctnDom.current;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const performanceDPR = isMobile ? 0.8 : Math.min(window.devicePixelRatio, 2);

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: false, dpr: performanceDPR });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cssText = 'display:block; width:100%; height:100%; pointer-events:none;';
    ctn.appendChild(canvas);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: normalizedStops },
        uResolution: { value: [1, 1] },
        uBlend: { value: blend }
      }
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = () => {
      renderer.setSize(ctn.clientWidth, ctn.clientHeight);
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    const ro = new ResizeObserver(() => window.requestAnimationFrame(resize));
    ro.observe(ctn);
    resize();

    let animateId: number;
    const update = (t: number) => {
      program.uniforms.uTime.value = t * 0.0005 * speed;
      renderer.render({ scene: mesh });
      animateId = requestAnimationFrame(update);
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (canvas.parentNode) ctn.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [shouldRender, normalizedStops, amplitude, blend, speed]);

  return (
    <div 
      ref={ctnDom} 
      className="w-full h-full relative overflow-hidden" 
      tabIndex={-1}
      style={{ 
        outline: 'none', 
        contain: 'paint size layout', 
        pointerEvents: 'none',
        WebkitContain: 'paint size layout' 
      } as React.CSSProperties}
    />
  );
}