import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import * as Icons from 'lucide-react'

export default function LiquidGlassCard({ card, index }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const reduceMotion = useReducedMotion()
  const IconComponent = Icons[card.icon] || Icons.Sparkles

  const handleMouseMove = (e) => {
    if (reduceMotion) return
    const cardRect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - (cardRect.left + cardRect.width / 2)
    const mouseY = e.clientY - (cardRect.top + cardRect.height / 2)
    setRotateX((mouseY / (cardRect.height / 2)) * -8)
    setRotateY((mouseX / (cardRect.width / 2)) * 8)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, amount: 0.3 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl p-8 liquid-glass liquid-glass-interactive flex flex-col justify-between overflow-hidden min-h-[260px]"
    >
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shadow-neon-cyan">
          <IconComponent className="w-7 h-7 stroke-[2]" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
          {card.title}
        </h3>
        <p className="text-slate-300/90 text-base leading-relaxed font-normal">
          {card.desc}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping motion-reduce:group-hover:animate-none" />
      </div>
    </motion.div>
  )
}
