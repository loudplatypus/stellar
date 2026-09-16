import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 800 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.1,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
    }));

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach(star => {
        // Parallax and movement
        star.x -= star.z * 0.2;
        star.x -= mouseX * star.z * 1.5;
        star.y -= mouseY * star.z * 1.5;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Planets Container */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Sun Glow (Top Right) */}
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#ffeedd] rounded-full blur-[120px] opacity-20" />
        
        {/* Jupiter */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] right-[5%] w-[35vw] h-[35vw] rounded-full"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter.jpg/1024px-Jupiter.jpg)',
            backgroundSize: 'cover',
            boxShadow: 'inset 40px -40px 80px rgba(0,0,0,0.9), inset -10px 10px 30px rgba(255,255,255,0.2)'
          }}
        />

        {/* Earth */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[15%] left-[10%] w-[18vw] h-[18vw] rounded-full"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1024px-Earth_Western_Hemisphere_transparent_background.png)',
            backgroundSize: 'cover',
            boxShadow: 'inset 25px -25px 50px rgba(0,0,0,0.9), inset -8px 8px 20px rgba(255,255,255,0.3)'
          }}
        />

        {/* Moon */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[35%] left-[28%] w-[5vw] h-[5vw] rounded-full"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1024px-FullMoon2010.jpg)',
            backgroundSize: 'cover',
            boxShadow: 'inset 10px -10px 20px rgba(0,0,0,0.9)'
          }}
        />

        {/* Mars */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] left-[35%] w-[9vw] h-[9vw] rounded-full"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1024px-OSIRIS_Mars_true_color.jpg)',
            backgroundSize: 'cover',
            boxShadow: 'inset 15px -15px 30px rgba(0,0,0,0.9), inset -5px 5px 15px rgba(255,255,255,0.2)'
          }}
        />
      </div>
    </div>
  );
}
