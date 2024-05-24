import React from 'react'

export default function ContentGradient() {
  return (
    <>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
        <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
      </picture>
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
      </picture>
    </>
  )
}
