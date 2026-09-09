import React, { useState, useEffect, useCallback } from 'react'
import { slidesData } from './data/slidesData'
import SlideSection from './components/SlideSection'
import BackgroundMesh from './components/BackgroundMesh'
import NavigationControls from './components/NavigationControls'
import SlideDrawer from './components/SlideDrawer'

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLightTheme, setIsLightTheme] = useState(() => {
    try {
      return localStorage.getItem('presentation-theme') === 'light'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('presentation-theme', isLightTheme ? 'light' : 'dark')
    } catch {
      // Theme preference is optional when storage is unavailable.
    }
  }, [isLightTheme])

  const scrollToSlide = useCallback((slideId) => {
    const targetElement = document.getElementById(`slide-${slideId}`)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const slideElements = slidesData.map((s) => document.getElementById(`slide-${s.id}`))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = slideElements.length - 1; i >= 0; i--) {
        const el = slideElements[i]
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentSlide(i + 1)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isDrawerOpen) return
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        const next = Math.min(currentSlide + 1, slidesData.length)
        setCurrentSlide(next)
        scrollToSlide(next)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const prev = Math.max(currentSlide - 1, 1)
        setCurrentSlide(prev)
        scrollToSlide(prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, isDrawerOpen, scrollToSlide])

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev >= slidesData.length ? 1 : prev + 1
        scrollToSlide(next)
        return next
      })
    }, 7000)
    return () => clearInterval(interval)
  }, [isPlaying, scrollToSlide])

  const progress = (currentSlide / slidesData.length) * 100

  return (
    <div className={`presentation-shell relative bg-[#030612] min-h-screen text-slate-100 font-cairo ${isLightTheme ? 'theme-light' : ''}`}>
      <a
        href="#slide-1"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[60] focus:bg-cyan-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-lg"
      >
        تخطي إلى المحتوى
      </a>
      <BackgroundMesh />

      <div
        className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50"
        role="progressbar"
        aria-valuenow={currentSlide}
        aria-valuemin={1}
        aria-valuemax={slidesData.length}
        aria-label="تقدم العرض"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300 shadow-neon-cyan"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main>
        {slidesData.map((slide) => (
          <SlideSection key={slide.id} slide={slide} total={slidesData.length} />
        ))}
      </main>

      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={slidesData.length}
        onNext={() => {
          const next = Math.min(currentSlide + 1, slidesData.length)
          setCurrentSlide(next)
          scrollToSlide(next)
        }}
        onPrev={() => {
          const prev = Math.max(currentSlide - 1, 1)
          setCurrentSlide(prev)
          scrollToSlide(prev)
        }}
        onToggleDrawer={() => setIsDrawerOpen(true)}
        isPlaying={isPlaying}
        onToggleAutoPlay={() => setIsPlaying((p) => !p)}
        isLightTheme={isLightTheme}
        onToggleTheme={() => setIsLightTheme((theme) => !theme)}
      />

      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        slides={slidesData}
        currentSlide={currentSlide}
        onSelectSlide={(id) => {
          setCurrentSlide(id)
          scrollToSlide(id)
        }}
      />
    </div>
  )
}
