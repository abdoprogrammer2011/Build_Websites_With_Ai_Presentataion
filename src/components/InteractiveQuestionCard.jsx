import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { HelpCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react'

export default function InteractiveQuestionCard({ slide }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const reduceMotion = useReducedMotion()

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="liquid-glass rounded-3xl p-8 md:p-12 border border-purple-500/30 relative overflow-hidden shadow-neon-purple"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
            <HelpCircle className="w-8 h-8" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-wider text-purple-300">
            سؤال تفاعلي للجمهور
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-8 leading-snug">
          {slide.question}
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-6" role="listbox" aria-label="خيارات الإجابة">
          {slide.options.map((opt, idx) => {
            const isSelected = selectedOption === idx
            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => setSelectedOption(idx)}
                aria-pressed={isSelected}
                className={`p-6 rounded-2xl text-right transition-all duration-300 flex items-center justify-between text-lg md:text-xl font-bold border min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? opt.correct
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                      : 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                    : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-cyan-400/40'
                }`}
              >
                <span>{opt.text}</span>
                {isSelected &&
                  (opt.correct ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-7 h-7 text-rose-400 shrink-0" aria-hidden="true" />
                  ))}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {selectedOption !== null && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="status"
              aria-live="polite"
              className={`p-5 rounded-2xl border flex items-center gap-3 text-lg font-semibold ${
                slide.options[selectedOption].correct
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
              }`}
            >
              <Sparkles className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>{slide.options[selectedOption].feedback}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
