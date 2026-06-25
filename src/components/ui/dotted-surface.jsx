import { useEffect, useRef } from "react";

/**
 * DottedSurface — a perspective grid of dots undulating on a wave, drawn with
 * raw WebGL gl.POINTS (no three.js). The plane is tilted and perspective-divided
 * in the vertex shader so far rows recede toward the top and near rows sit big
 * and bright at the bottom, with depth fog. Monochrome, transparent background,
 * meant to sit behind a section as a subtle ARM-flavored field.
 *
 * DPR-capped, pauses offscreen, and renders a single static frame under
 * prefers-reduced-motion.
 */
const VERT = `
attribute vec2 a_grid;       // x in [-1,1], z in [-1,1]
uniform float u_time;
uniform float u_aspect;
varying float v_bright;

void main(){
  float x = a_grid.x;
  float z = a_grid.y;

  // travelling wave height
  float y =
    0.10 * sin(x * 3.0 + u_time) +
    0.10 * cos(z * 3.5 - u_time * 0.8) +
    0.05 * sin((x + z) * 5.0 + u_time * 1.3);

  // tilt the plane around the X axis
  float a = 1.12;
  float ca = cos(a), sa = sin(a);
  float yp = y * ca - z * sa;
  float zp = y * sa + z * ca;

  // perspective divide (camera on +z')
  float d = 2.4;
  float focal = 1.45;
  float zc = d - zp;
  float proj = focal / zc;

  float sx = (x * 1.6) * proj / u_aspect;
  float sy = yp * proj * 1.15 + 0.12;

  gl_Position = vec4(sx, sy, 0.0, 1.0);
  gl_PointSize = clamp(4.2 * proj, 1.0, 6.0);

  // brighter when near (large proj) and on wave peaks; fades into the distance
  float depth = smoothstep(0.42, 0.72, proj);
  v_bright = depth * (0.55 + 0.45 * smoothstep(-0.18, 0.18, y));
}
`;

const FRAG = `
precision mediump float;
varying float v_bright;
void main(){
  // round dots
  vec2 c = gl_PointCoord - 0.5;
  float r = dot(c, c);
  if (r > 0.25) discard;
  float edge = smoothstep(0.25, 0.05, r);
  gl_FragColor = vec4(vec3(0.96, 0.96, 0.94), v_bright * edge);
}
`;

export function DottedSurface({ className = "", style, cols = 90, rows = 60 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("DottedSurface:", gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("DottedSurface link failed");
      return;
    }
    gl.useProgram(prog);

    // build the grid
    const verts = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        verts.push((i / (cols - 1)) * 2 - 1, (j / (rows - 1)) * 2 - 1);
      }
    }
    const count = cols * rows;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_grid");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uAspect = gl.getUniformLocation(prog, "u_aspect");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform1f(uAspect, Math.max(w / Math.max(h, 1), 0.0001));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let visible = true;
    const io = new IntersectionObserver(
      ([en]) => (visible = en.isIntersecting),
      { threshold: 0 },
    );
    io.observe(canvas);

    let raf;
    const start = performance.now();
    const render = (now) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, reduce ? 2.0 : (now - start) / 1000);
      gl.drawArrays(gl.POINTS, 0, count);
      if (reduce) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      // do not loseContext() — StrictMode remounts on the same canvas (see ShaderBackground)
    };
  }, [cols, rows]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}

export default DottedSurface;
