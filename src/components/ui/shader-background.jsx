import { useEffect, useRef } from "react";

/**
 * ShaderBackground — an "anomalous matter" style flowing field rendered with a
 * raw WebGL fragment shader (no three.js). Domain-warped fractal noise keeps the
 * surface organic and alive while staying inside the ARM monochrome system:
 * deep Ink blacks with a faint cool graphite cast, finished with film grain and
 * a vignette so foreground type always reads.
 *
 * Cheap on the GPU (single full-screen quad), DPR-capped, pauses when offscreen,
 * and respects prefers-reduced-motion.
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// --- value noise + fbm ---------------------------------------------------
float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 6; i++){
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;

  float t = u_time * 0.04;

  // pointer position in the same space as p
  float aspect = u_res.x / u_res.y;
  vec2 mp = (u_mouse - 0.5) * vec2(aspect, 1.0);
  float md = length(p - mp);
  float halo = exp(-2.6 * md);   // 1 at the cursor → 0 away from it

  // parallax pull toward the pointer
  p += (u_mouse - 0.5) * 0.28;

  // lens: bulge the matter outward around the cursor so it visibly reacts
  p += normalize(p - mp + 0.0001) * halo * 0.12;

  // domain warp: noise feeding noise → flowing, marbled matter
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(
    fbm(p + 1.8 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(p + 1.8 * q + vec2(8.3, 2.8) - 0.12 * t)
  );
  float f = fbm(p + 2.2 * r);

  // monochrome ramp — Ink → graphite → mist, cool cast in the highlights
  vec3 ink   = vec3(0.05, 0.05, 0.055);
  vec3 deep  = vec3(0.11, 0.12, 0.14);
  vec3 steel = vec3(0.30, 0.33, 0.38);
  vec3 mist  = vec3(0.66, 0.69, 0.75);

  vec3 col = mix(ink, deep, smoothstep(0.0, 0.5, f));
  col = mix(col, steel, smoothstep(0.38, 0.9, f) * 0.85);

  // sculpted highlight on the crests of the warp — gives the matter volume
  float crest = pow(smoothstep(0.5, 1.0, r.x), 1.8);
  col = mix(col, mist, crest * 0.6);

  // thin bright veins where the warp folds on itself
  float veins = smoothstep(0.16, 0.0, abs(q.x - q.y));
  col += veins * (0.4 + 0.6 * crest) * 0.14;

  // large-scale luminance drift so it never looks flat
  col *= 0.94 + 0.14 * fbm(p * 0.6 + 0.2 * t);

  // gentle vignette — keeps edges grounded without crushing to black
  float vig = smoothstep(1.45, 0.15, length(p));
  col *= 0.72 + 0.28 * vig;

  // interactive halo — a cool light that tracks the cursor and lifts the matter
  col += halo * (0.16 + 0.10 * crest) * vec3(0.62, 0.70, 0.85);
  // bright rim just outside the halo so the reaction reads as a soft shockwave
  col += smoothstep(0.05, 0.0, abs(md - 0.32)) * 0.06 * vec3(0.7, 0.78, 0.95);

  // fine film grain
  float g = hash(uv * u_res.xy + fract(u_time));
  col += (g - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export function ShaderBackground({ className = "", style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) return; // gracefully fall back to the CSS background color

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("ShaderBackground:", gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("ShaderBackground link failed");
      return; // leave the canvas transparent → CSS Ink background shows through
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf;
    let visible = true;
    const io = new IntersectionObserver(
      ([en]) => (visible = en.isIntersecting),
      { threshold: 0 },
    );
    io.observe(canvas);

    const start = performance.now();
    const render = (now) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;
      const t = reduce ? 6.0 : (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (reduce) cancelAnimationFrame(raf); // render one static frame
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      // NOTE: do not loseContext() here — under React StrictMode the effect
      // mounts twice on the same canvas, and a lost context cannot be re-created,
      // which would leave the shader permanently blank in dev.
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}

export default ShaderBackground;
