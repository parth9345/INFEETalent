'use client'

import { Play, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { OptimizedImage } from '@/components/ui/OptimizedImage'
import type { MediaLike } from '@/types/content'

type VideoTestimonialTileProps = {
  media?: MediaLike
  fallbackSrc: string
  alt: string
  className?: string
  videoSrc?: string
}

const dummyVideoSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export function VideoTestimonialTile({
  media,
  fallbackSrc,
  alt,
  className,
  videoSrc = dummyVideoSrc,
}: VideoTestimonialTileProps) {
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
      <a
        href={videoSrc}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => {
          event.preventDefault()
          setIsOpen(true)
        }}
        aria-label={`Play ${alt}`}
        className={`group relative block min-h-[320px] w-full cursor-pointer overflow-hidden border border-[#FFFFFF]/10 bg-[#121964] p-[0px] text-left appearance-none focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-offset-[4px] focus-visible:outline-[#FCA62B] ${className || ''}`}
      >
        <OptimizedImage media={media} fallbackSrc={fallbackSrc} altFallback={alt} sizes="(min-width: 1024px) 605px, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
        
        <span className="absolute left-1/2 top-1/2 flex size-[94px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFFFF]/30 backdrop-blur-[2px] transition duration-300 group-hover:scale-[1.06] group-hover:bg-[#FFFFFF]/40">
          <span className="flex size-[66px] items-center justify-center rounded-full bg-[#FFFFFF]/45 text-[#FFFFFF]">
            <Play size={34} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          </span>
        </span>
      </a>

      {isOpen && typeof document !== 'undefined' ? createPortal(
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
              <h2 id={titleId} className="text-[18px] font-[700] leading-[26px] tracking-[0px] text-[#FFFFFF]">
                Testimonial Video
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close video"
                className="flex size-[44px] items-center justify-center border border-[#FFFFFF]/20 text-[#FFFFFF] transition hover:bg-[#FFFFFF]/10 focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-offset-[2px] focus-visible:outline-[#FCA62B]"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <video className="aspect-video w-full bg-[#000000]" src={videoSrc} controls autoPlay />
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  )
}
