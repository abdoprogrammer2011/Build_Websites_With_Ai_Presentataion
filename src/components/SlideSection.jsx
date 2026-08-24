import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import LiquidGlassCard from './LiquidGlassCard'
import InteractiveQuestionCard from './InteractiveQuestionCard'

export default function SlideSection({ slide, total }) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id={`slide-${slide.id}`}
      className="w-screen h-screen snap-start snap-always relative flex flex-col justify-between p-6 md:p-12 overflow-hidden z-10"
      aria-label={slide.title}
    >
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto z-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <span className="px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 backdrop-blur-md">
            {slide.tag}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden md:inline-block">
            VS CODE + AI
          </span>
        </motion.div>
        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono" dir="ltr">
          <span className="text-cyan-400 font-bold">{String(slide.id).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(total).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto my-auto py-6 z-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
            {slide.type === 'hero' ? (
              <span className="text-gradient-cyan">{slide.title}</span>
            ) : (
              slide.title
            )}
          </h1>
          {slide.subtitle && (
            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
              {slide.subtitle}
            </p>
          )}
        </motion.div>

        {slide.type === 'interactive' ? (
          <InteractiveQuestionCard slide={slide} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {slide.cards &&
              slide.cards.map((card, idx) => (
                <LiquidGlassCard key={idx} card={card} index={idx} />
              ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500 border-t border-white/5 pt-4 z-20">
        <span className="font-semibold">المحاضر: عبد الرحمن محمد</span>
        <span className="font-mono text-cyan-400/80 hidden md:inline-block">
          Visual Studio Code + AI
        </span>
      </div>
    </section>
  )
}
