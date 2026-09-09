import React from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, Grid, Play, Pause, Maximize2, Moon, Sun } from 'lucide-react'

export default function NavigationControls({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onToggleDrawer,
  isPlaying,
  onToggleAutoPlay,
  isLightTheme,
  onToggleTheme,
}) {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2.5 rounded-full liquid-glass border border-white/15 shadow-2xl backdrop-blur-2xl"
      aria-label="تحكم العرض"
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        disabled={currentSlide === 1}
        className="p-3 rounded-full bg-white/5 hover:bg-cyan-500/20 text-white disabled:opacity-30 transition-all min-h-11 min-w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="الشريحة السابقة"
        title="الشريحة السابقة"
      >
        <ChevronUp className="w-5 h-5" aria-hidden="true" />
      </motion.button>

      <button
        type="button"
        onClick={onToggleDrawer}
        className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-all min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label={`الشريحة ${currentSlide} من ${totalSlides}`}
      >
        <span>الشريحة {currentSlide} من {totalSlides}</span>
        <Grid className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
      </button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        disabled={currentSlide === totalSlides}
        className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-neon-cyan transition-all disabled:opacity-30 min-h-11 min-w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="الشريحة التالية"
        title="الشريحة التالية"
      >
        <ChevronDown className="w-5 h-5" aria-hidden="true" />
      </motion.button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" aria-hidden="true" />

      <button
        type="button"
        onClick={onToggleAutoPlay}
        className={`p-3 rounded-full transition-all min-h-11 min-w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
          isPlaying
            ? 'bg-purple-500 text-white shadow-neon-purple'
            : 'bg-white/5 text-slate-300 hover:bg-white/10'
        }`}
        aria-label={isPlaying ? 'إيقاف التقديم التلقائي' : 'تشغيل التقديم التلقائي'}
        title={isPlaying ? 'إيقاف التقديم التلقائي' : 'تشغيل التقديم التلقائي'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Play className="w-4 h-4" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={toggleFullScreen}
        className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-all hidden md:flex min-h-11 min-w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="ملء الشاشة"
        title="ملء الشاشة"
      >
        <Maximize2 className="w-4 h-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={onToggleTheme}
        className="p-3 rounded-full bg-white/5 hover:bg-amber-400/20 text-slate-300 transition-all min-h-11 min-w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        aria-label={isLightTheme ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
        title={isLightTheme ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
      >
        {isLightTheme ? (
          <Moon className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Sun className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </nav>
  )
}
