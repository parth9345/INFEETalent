'use client'

import { useEffect } from 'react'

const animationSelector = [
  '.anim-fade-up',
  '.anim-fade-down',
  '.anim-fade-left',
  '.anim-fade-right',
  '.anim-fade-in',
  '.anim-scale-in',
  '.anim-stagger-parent',
].join(',')

export function ViewportAnimationObserver() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const trackedElements = new WeakSet<HTMLElement>()
    let intersectionObserver: IntersectionObserver | null = null

    const prepareStaggerItems = (element: HTMLElement) => {
      if (!element.classList.contains('anim-stagger-parent')) {
        return
      }

      element.querySelectorAll<HTMLElement>('.anim-stagger-item').forEach((item, index) => {
        item.style.setProperty('--anim-stagger-index', String(index))
      })
    }

    const revealElement = (element: HTMLElement) => {
      element.dataset.animVisible = 'true'

      if (element.classList.contains('anim-stagger-parent')) {
        element.querySelectorAll<HTMLElement>('.anim-stagger-item').forEach((item, index) => {
          item.style.setProperty('--anim-stagger-index', String(index))
          item.dataset.animVisible = 'true'
        })
      }
    }

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(animationSelector).forEach(revealElement)
    }

    if (!('IntersectionObserver' in window) || reducedMotionQuery.matches) {
      revealAll()
      return
    }

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const element = entry.target as HTMLElement
          revealElement(element)
          intersectionObserver?.unobserve(element)
        })
      },
      {
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.15,
      },
    )

    const observeAnimations = () => {
      document.querySelectorAll<HTMLElement>(animationSelector).forEach((element) => {
        if (trackedElements.has(element)) {
          return
        }

        trackedElements.add(element)
        prepareStaggerItems(element)

        const closestStaggerParent = element.closest<HTMLElement>('.anim-stagger-parent')
        const isNestedStaggerItem =
          element.classList.contains('anim-stagger-item') &&
          closestStaggerParent !== null &&
          closestStaggerParent !== element

        if (isNestedStaggerItem) {
          return
        }

        intersectionObserver?.observe(element)
      })
    }

    observeAnimations()

    const mutationObserver = new MutationObserver(observeAnimations)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        revealAll()
        intersectionObserver?.disconnect()
      }
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

    return () => {
      mutationObserver.disconnect()
      intersectionObserver?.disconnect()
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  return null
}
