import React from 'react'
import MainSection from './main-section'
import Hero from '@/components/dashboard/Hero'
import ModalSearchBerita from '../../modal/page'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Standar Pelayanan',
  description: 'Standar Pelayanan I Portal Kelurahan Kota Depok',
};

export default function StandarLayanan() {
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <Hero title="Standar Pelayanan" />

      <section className="relative">
        <MainSection />
        <ModalSearchBerita />
      </section>
    </main>
  )
}
