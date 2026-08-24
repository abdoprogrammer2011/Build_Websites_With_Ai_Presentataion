import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

export default function SlideDrawer({ isOpen, onClose, slides, currentSlide, onSelectSlide }) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-6xl max-h-[85vh] liquid-glass rounded-3xl p-6 md:p-8 overflow-y-auto border border-white/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 id="drawer-title" className="text-2xl font-bold text-white">
                  فهرس الشرائح
                </h2>
                <p className="text-sm text-slate-400">انقر على أي شريحة للانتقال إليها مباشرة</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all min-h-11 min-w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="إغلاق الفهرس"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {slides.map((s) => {
                const isActive = currentSlide === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      onSelectSlide(s.id)
                      onClose()
                    }}
                    className={`p-4 rounded-2xl text-right transition-all border flex flex-col justify-between h-36 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-neon-cyan'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-slate-300'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-white/10">
                        {String(s.id).padStart(2, '0')}
                      </span>
                      {isActive && <Check className="w-4 h-4 text-cyan-400" aria-hidden="true" />}
                    </div>
                    <h4 className="text-sm font-bold line-clamp-2 text-white group-hover:text-cyan-300 transition-colors">
                      {s.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">{s.tag}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
