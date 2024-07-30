import React from 'react'
import MainSection from './main-section'
import Hero from '@/components/dashboard/Hero'
import ModalSearchBerita from '../../modal/page'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pengumuman Diskarpus',
  description: 'Pengumuman I Portal Diskarpus Kota Depok',
};

export default function Pengumuman() {
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <Hero title='Pengumuman' />

      <section className="relative py-24">
        <MainSection />
      </section>
      <ModalSearchBerita />
    </main>
  )
}
