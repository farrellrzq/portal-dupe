import React from 'react'
import Content from './content'
import { getLayanan } from '@/controllers/PelayananController'
import ModalSearchBerita from '../../modal/page';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Layanan Kecamatan',
  description: 'Layanan Kecamatan I Portal Kecamatan Kota Depok',
};

export default async function page() {
  const layanan = await getLayanan();
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
              Informasi & Layanan
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24">
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
          <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
        </picture>
        <Content layanan={layanan} />
      </section>
      <ModalSearchBerita />
    </main>
  )
}
