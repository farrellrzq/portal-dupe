import React from 'react'
import MainSection from './main-section'
import ModalSearchBerita from '../../modal/page'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Berita Dinsos',
  description: 'Berita Dinsos I Portal Dinsos Kota Depok',
};

export default function Berita() {
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
              Berita
            </h1>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <MainSection />
      </section>
      <ModalSearchBerita />
    </main>
  )
}
