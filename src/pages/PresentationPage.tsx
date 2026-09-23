import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Download, Maximize, Minimize, 
  ChevronLeft, ChevronRight, Share2, Sparkles 
} from 'lucide-react';

export const PresentationPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = 6;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key >= '1' && e.key <= '6') {
        setCurrentSlide(parseInt(e.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#050811] text-white flex flex-col overflow-hidden font-sans">
      {/* Presentation Top Utility Bar */}
      <header className="h-14 px-6 bg-[#0B132B]/80 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-blue-600 border border-slate-700 hover:border-cyan-400 text-xs font-bold text-slate-200 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit to Platform</span>
          </Link>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
              CivicSolve Executive Presentation (6 Slides)
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-3">
          <a
            href="/CivicSolve_Presentation.pptx"
            download
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PPTX</span>
          </a>

          <button
            onClick={() => window.open('/presentation/index.html', '_blank')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
            title="Open standalone presentation in new tab"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Standalone View</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Slide Viewer Frame: Embeds public/presentation/index.html */}
      <div className="flex-1 relative bg-radial-gradient flex items-center justify-center p-4">
        <iframe
          src={`/presentation/index.html#slide-${currentSlide + 1}`}
          title="CivicSolve Presentation"
          className="w-full h-full border-0 rounded-xl shadow-2xl shadow-black/80"
          key={currentSlide}
        />
      </div>

      {/* Floating Bottom Navigator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-3 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-black">
        <button
          onClick={prevSlide}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx
                  ? 'bg-cyan-400 scale-125 ring-2 ring-cyan-400/50'
                  : 'bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Jump to Slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-xs font-mono font-bold text-cyan-400 min-w-[50px] text-center">
          0{currentSlide + 1} / 0{totalSlides}
        </span>

        <button
          onClick={nextSlide}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 transition-all"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
