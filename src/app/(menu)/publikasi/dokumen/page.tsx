import React from 'react'
import MainSection from './main-section'
import Hero from '@/components/dashboard/Hero'
import ModalSearchBerita from '../../modal/page'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dokumen Produk Kecamatan',
  description: 'Dokumen Produk I Portal Kecamatan Kota Depok',
};

export default function Pengumuman() {
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <Hero title='Dokumen Produk' />

      <section className="relative py-24">
        <MainSection />
      </section>
      <ModalSearchBerita />
    </main>
  )
}
