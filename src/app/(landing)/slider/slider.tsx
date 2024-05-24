import { getSlider } from '@/controllers/HomeController';
import React from 'react'
import Content from './content';

export default async function Slider() {
  const slider = await getSlider();
  return (
    <>
      <section className="relative h-fit">
        <picture className="pointer-events-none absolute inset-0 -z-10 block dark:hidden">
          <img
            src="img/blog/Wallpaper Kecamatan Depok-02.png"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <img
            src="img/blog/Wallpaper Kecamatan Depok-03.png"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <Content slider={slider} />
      </section>
    </>
  )
}

