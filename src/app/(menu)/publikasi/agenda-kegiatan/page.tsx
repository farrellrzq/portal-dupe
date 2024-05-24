import React from 'react'
import MainSection from './main-section'
import Hero from '@/components/dashboard/Hero'
import ModalStores from './modal'
import ModalSearchBerita from '../../modal/page'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Agenda Kecamatan',
  description: 'Agenda Kecamatan I Portal Kecamatan Kota Depok',
};

export default function Pengumuman() {
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <Hero title='Agenda Kegiatan' />

      <section className="relative py-24">
        <MainSection />
      </section>

      <ModalStores />
      <ModalSearchBerita />
    </main>
  )
}
