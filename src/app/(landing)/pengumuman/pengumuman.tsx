import React from 'react'
import Content from './content'
import { getPengumuman } from '@/controllers/HomeController'

export default async function pengumuman() {
    const pengumuman = await getPengumuman();
  return (
    <div className="lg:w-1/2">
        <h2 className="mb-2 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            Pengumuman
        </h2>
        <p className="text-center mb-16 text-jacarta-700 dark:text-white">
            Informasi yang disajikan dalam bentuk grafis
        </p>
        {/* <!-- Slider --> */}
        <Content pengumuman={pengumuman} />

        {/* <!-- Slider Navigation --> */}
    </div>
  )
}
