'use client'

import { Play, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { OptimizedImage } from '@/components/ui/OptimizedImage'

type CareerStoryVideoProps = {
  alt: string
  className?: string
  fallbackSrc: string
  thumbnailSrc: string
  videoSrc?: string
}

const fallbackVideoSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export function CareerStoryVideo({
  alt,
  className,
  fallbackSrc,
  thumbnailSrc,
  videoSrc = fallbackVideoSrc,
}: CareerStoryVideoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        aria-label={`Play ${alt}`}
        className={`career-story-video group relative block w-full overflow-hidden bg-[#151515] p-[0px] text-left focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-offset-[4px] focus-visible:outline-[#FCA62B] ${className || ''}`}
        onClick={() => setIsOpen(true)}
      >
        <OptimizedImage
          src={thumbnailSrc}
          fallbackSrc={fallbackSrc}
          altFallback={alt}
          sizes="(min-width: 1024px) 676px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <span className="absolute inset-0 bg-[#000000]/38 transition duration-300 group-hover:bg-[#000000]/28" aria-hidden="true" />
        <span className="absolute left-1/2 top-1/2 flex size-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFFFF]/35 text-[#FFFFFF] backdrop-blur-[2px] transition duration-300 group-hover:scale-[1.06] group-hover:bg-[#FFFFFF]/45">
          <Play size={34} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </span>
      </button>

      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-[#000000]/80 px-[24px] py-[40px] backdrop-blur-[4px]"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setIsOpen(false)
                }
              }}
            >
              <div className="relative w-full max-w-[960px] bg-[#080D4D] p-[16px] shadow-[0px_30px_80px_rgba(0,0,0,0.45)]">
                <div className="mb-[14px] flex items-center justify-between gap-[16px]">
                  <h2 id={titleId} className="text-[16px] font-[800] uppercase leading-[22px] tracking-[1px] text-[#FFFFFF]">
                    INFE Talent Story
                  </h2>
                  <button
                    type="button"
                    aria-label="Close video"
                    className="flex size-[38px] items-center justify-center border border-[#FFFFFF]/20 text-[#FFFFFF] transition hover:border-[#FCA62B] hover:text-[#FCA62B]"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
                <video className="aspect-video w-full bg-[#000000]" src={videoSrc} controls autoPlay />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
