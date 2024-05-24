import React from 'react'

interface HeroProps {
  title: string
}
export default function Hero({ title }: HeroProps) {
  return (
    <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
            {title || 'Title belum diatur'}
          </h1>
        </div>
      </div>
    </section>
  )
}
