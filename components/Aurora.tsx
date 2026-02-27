import { useEffect, useRef, useState, useMemo } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

// --- Shaders ---

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = (highQuality: boolean) => `#version 300 es
${highQuality ? 'precision highp float;' : 'precision mediump float;'}

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

// Optimized permute for faster noise calculation
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
  
  // High quality gets smoother color interpolation
  vec3 rampColor;
  if (${highQuality}) {
    float t = smoothstep(0.0, 1.0, uv.x);
    rampColor = mix(mix(uColorStops[0], uColorStops[1], smoothstep(0.0, 0.5, t)), uColorStops[2], smoothstep(0.5, 1.0, t));
  } else {
    rampColor = mix(uColorStops[0], uColorStops[2], uv.x);
  }
  
  float noiseVal = snoise(vec2(uv.x * 1.5 + uTime * 0.1, uTime * 0.15));
  float height = exp(noiseVal * 0.5 * uAmplitude);
  height = (uv.y * 2.0 - height + 0.2);
  
  float intensity = 0.6 * height;
  float auroraAlpha = smoothstep(0.2 - uBlend * 0.5, 0.2 + uBlend * 0.5, intensity);
  
  fragColor = vec4(intensity * rampColor * auroraAlpha, auroraAlpha);
}
`;

// --- Helpers ---

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

function hexToRgbNormalized(hex: string): [number, number, number] {
  let h = hex.replace(/^#/, '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}

// --- Component ---

export default function Aurora({
  colorStops = ['#5227FF', '#7cff67', '#5227FF'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0
}: AuroraProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);
  
  const normalizedStops = useMemo(() => colorStops.map(hexToRgbNormalized), [colorStops]);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    // 1. Performance Monitoring Logic
    let frameCount = 0;
    let lastTime = performance.now();
    let performanceCheckActive = true;

    // 2. Initialize Renderer
    // Start with high quality but drop DPR immediately if on mobile
    const initialDPR = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 1.2 : window.devicePixelRatio;
    
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: !isLowPower,
      dpr: isLowPower ? 1.0 : initialDPR
    });

    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG(!isLowPower),
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: normalizedStops },
        uResolution: { value: [1, 1] },
        uBlend: { value: blend }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const resize = () => {
      const width = ctn.clientWidth;
      const height = ctn.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    const ro = new ResizeObserver(resize);
    ro.observe(ctn);

    let animateId: number;
    const update = (t: number) => {
      // FPS Monitoring
      frameCount++;
      if (performanceCheckActive && t - lastTime > 1000) {
        const fps = (frameCount * 1000) / (t - lastTime);
        if (fps < 50) {
          setIsLowPower(true); // Trigger re-render with lower settings
          performanceCheckActive = false; // Stop checking once we've downgraded
        }
        lastTime = t;
        frameCount = 0;
      }

      program.uniforms.uTime.value = t * 0.0005 * speed;
      program.uniforms.uAmplitude.value = amplitude;
      program.uniforms.uColorStops.value = normalizedStops;
      
      renderer.render({ scene: mesh });
      animateId = requestAnimationFrame(update);
    };
    
    animateId = requestAnimationFrame(update);
    resize();

    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (gl.canvas.parentNode) ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [isLowPower, normalizedStops, amplitude, blend, speed]);

  return <div ref={ctnDom} className="w-full h-full overflow-hidden" />;
}