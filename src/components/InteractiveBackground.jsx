import React, { useEffect, useState } from 'react';

export default function InteractiveBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Cursor Spotlight Glow */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 70%)',
          left: `calc(${mousePos.x}% - 300px)`,
          top: `calc(${mousePos.y}% - 300px)`,
        }}
      />

      {/* Floating Aurora Blob 1 (Emerald Neon) */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[140px] animate-blob-slow" />

      {/* Floating Aurora Blob 2 (Cyber Purple) */}
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-blob-delayed" />

      {/* Floating Aurora Blob 3 (Electric Cyan / Blue) */}
      <div className="absolute -bottom-32 left-1/4 w-[650px] h-[650px] bg-cyan-500/15 rounded-full blur-[160px] animate-blob-slow" />

      {/* Floating Aurora Blob 4 (Hot Magenta / Pink) */}
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[130px] animate-blob-delayed" />

      {/* Subtle Grid / Starfield Matrix Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
