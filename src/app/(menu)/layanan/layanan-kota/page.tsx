import React from 'react'
import Content from './content'
import { getLayananKota } from '@/controllers/PelayananController'
import ModalSearchBerita from '../../modal/page';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Layanan Kota',
  description: 'Layanan Kota I Portal Kecamatan Kota Depok',
};

export default async function page() {
  const layananKota = await getLayananKota();
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
          <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
        </picture>
        <Content layananKota={layananKota} />
      </section>
      <ModalSearchBerita />
    </main>
  )
}
