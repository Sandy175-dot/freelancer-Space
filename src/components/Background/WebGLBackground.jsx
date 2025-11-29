import { useEffect, useRef } from 'react';

const WebGLBackground = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fragmentShaderSource = `
      #ifdef GL_ES
      precision highp float;
      #endif
      
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      
      vec3 palette3(float t, float factor) {
        vec3 a = vec3(0.5) + 0.3 * sin(vec3(0.1, 0.3, 0.5) * factor);
        vec3 b = vec3(0.5) + 0.3 * cos(vec3(0.2, 0.4, 0.6) * factor);
        vec3 c = vec3(1.0) + 0.5 * sin(vec3(0.3, 0.7, 0.9) * factor);
        vec3 d = vec3(0.25, 0.4, 0.55) + 0.2 * cos(vec3(0.5, 0.6, 0.7) * factor);
        return a + b * cos(6.28318 * (c * t + d));
      }
      
      void main() {
        vec2 st = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
        st.x *= u_resolution.x/u_resolution.y;
        
        vec3 color = vec3(0.0);
        
        for (float i = 1.0; i < 6.0; i++) {
          vec2 st0 = st;
          float sgn = 1.0 - 2.0 * mod(i, 2.0);
          float t = u_time * 0.02 - float(i);
          st0 *= mat2(cos(t), sin(t), -sin(t), cos(t));
          
          float R = length(st0);
          float d = R * i;
          float angle = atan(st0.y, st0.x) * 3.0;
          
          vec3 pal = palette3(-exp((length(d) * -0.9)), abs(d) * 0.4);
          
          float radial = exp(-R);
          radial *= smoothstep(1.2, 0.5, R);
          pal *= radial;
          
          float phase = -(d + sgn * angle) + u_time * 0.3;
          float v = sin(phase);
          v = max(abs(v), 0.02);
          float w = pow(0.02 / v, 0.8);
          
          color += pal * w;
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Create shader function
    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Create program function
    const createProgram = (vertexShader, fragmentShader) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    // Initialize shaders and program
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(vertexShader, fragmentShader);
    
    if (!program) return;
    programRef.current = program;

    // Create buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Setup attributes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    // Resize function
    const resize = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * devicePixelRatio);
      canvas.height = Math.floor(canvas.clientHeight * devicePixelRatio);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    // Render function
    const render = (time) => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrameRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (gl && programRef.current) {
        gl.deleteProgram(programRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.3 }}
    />
  );
};

export default WebGLBackground;
