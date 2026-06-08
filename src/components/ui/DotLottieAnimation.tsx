import Script from 'next/script'

import { cn } from '@/lib/utils'

const dotLottieScriptSrc = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js'
const advantageAnimationSrc = 'https://lottie.host/472b8509-5f60-438a-a62e-3a40420e4b00/EQC3q1kdD7.lottie'

export function DotLottieAnimation({ className }: { className?: string }) {
  return (
    <>
      <Script
        id="dotlottie-wc-loader"
        src={dotLottieScriptSrc}
        type="module"
        strategy="afterInteractive"
      />
      <span
        className={cn('block', className)}
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: `<dotlottie-wc src="${advantageAnimationSrc}" style="display:block;width:100%;height:100%" autoplay loop></dotlottie-wc>`,
        }}
      />
    </>
  )
}
