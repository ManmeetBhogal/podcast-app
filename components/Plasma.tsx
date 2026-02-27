import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = (highQuality: boolean) => `#version 300 es
${highQuality ? 'precision highp float;' : 'precision mediump float;'}

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void main() {
  vec2 center = iResolution.xy * 0.5;
  vec2 C = (gl_FragCoord.xy - center) / uScale + center;
  
  // Interactive distortion
  if(uMouseInteractive > 0.5) {
    vec2 mouseOffset = (uMouse - center) * 0.00015;
    C += mouseOffset * length(C - center);
  }
  
  // uSpeed * 1.2 to restore the "Quickness"
  float T = iTime * uSpeed * uDirection * 1.2;
  vec3 O = vec3(0.0);
  float z = 0.0;
  float d = 0.0;

  // Reduced iterations but boosted intensity per step
  int iterations = ${highQuality ? '32' : '14'};

  for (int i = 0; i < iterations; i++) {
    vec3 p = z * normalize(vec3(C - 0.5 * iResolution.xy, iResolution.y)); 
    p.z -= 4.0; 
    d = p.y - T;
    
    // Increased multipliers (0.6 and 0.2) for more "turbulence"
    p.x += 0.6 * (1.2 + p.y) * sin(d + p.x * 0.15) * cos(0.4 * d + p.x * 0.1); 
    
    float ang = p.y + (float(i) * 0.15) - T;
    float s = sin(ang); float c = cos(ang);
    p.xz *= mat2(c, -s, s, c); 
    
    // Larger stepDist ( / 2.5 instead of / 3.0) makes the effect "deeper" with fewer loops
    float stepDist = abs(length(p.xz) - 0.25 * (5.0 + p.y)) / 2.5 + 0.005; 
    z += stepDist;
    
    // Boosted color accumulation
    O += (1.1 + sin(p.y + p.z * 0.6 + vec3(2, 1, 0))) / (stepDist * 40.0);
  }
  
  // Use a sharper curve for the final color to make it "pop"
  vec3 rgb = clamp(pow(O / (float(iterations) * 0.9), vec3(1.2)), 0.0, 1.0);
  float intensity = (rgb.r + rgb.g + rgb.b) * 0.333;
  vec3 finalColor = mix(rgb, intensity * uCustomColor, uUseCustomColor);
  
  fragColor = vec4(finalColor, intensity * uOpacity);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let performanceCheckActive = true;

    // Detect high-end vs low-end device for initial DPR
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const initialDPR = isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2.0);

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: isLowPower ? 0.7 : initialDPR 
    });

    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG(!isLowPower),
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(hexToRgb(color)) },
        uUseCustomColor: { value: color ? 1.0 : 0.0 },
        uSpeed: { value: speed * 0.6 }, // Restored speed baseline
        uDirection: { value: direction === 'reverse' ? -1.0 : 1.0 },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = (e.clientX - rect.left) * (gl.drawingBufferWidth / rect.width);
      mouseUniform[1] = (rect.height - (e.clientY - rect.top)) * (gl.drawingBufferHeight / rect.height);
    };

    if (mouseInteractive) container.addEventListener('mousemove', handleMouseMove);
    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    let raf = 0;
    const loop = (t: number) => {
      frameCount++;
      if (performanceCheckActive && t - lastTime > 1500) { // Slightly longer window for stability
        const fps = (frameCount * 1000) / (t - lastTime);
        if (fps < 48) {
          setIsLowPower(true);
          performanceCheckActive = false;
        }
        lastTime = t;
        frameCount = 0;
      }

      program.uniforms.iTime.value = t * 0.001;
      
      if (direction === 'pingpong') {
        program.uniforms.uDirection.value = Math.sin(t * 0.0005);
      }

      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      if (gl.canvas.parentNode) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [isLowPower, color, speed, direction, scale, opacity, mouseInteractive]);

  return <div ref={containerRef} className="w-full h-full relative overflow-hidden" />;
};
export default Plasma;