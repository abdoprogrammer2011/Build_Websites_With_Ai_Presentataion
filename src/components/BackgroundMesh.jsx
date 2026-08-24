import React from 'react'

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030612]">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[140px] animate-mesh-glow motion-reduce:animate-none" />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[160px] animate-mesh-glow motion-reduce:animate-none"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[150px] animate-mesh-glow motion-reduce:animate-none"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, transparent 0%, #030612 90%)' }}
      />
    </div>
  )
}
