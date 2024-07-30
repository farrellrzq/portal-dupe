import React from 'react'
import Content from './content'
import { getInformasiSetiapSaat } from '@/controllers/InformasiPublikController'
import ModalSearchBerita from '../../modal/page';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Informasi Setiap Saat',
  description: 'Informasi Setiap Saat I Portal Diskarpus Kota Depok',
};

export default async function page() {
  const SetiapSaat = await getInformasiSetiapSaat();
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
              Informasi Publik <span className="text-accent">Setiap Saat.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* <!-- Benefits --> */}
      <section className="py-24 dark:bg-jacarta-900">
        <div className="container">
          <Content SetiapSaat={SetiapSaat} />
        </div>
      </section>
      {/* <!-- end benefits --> */}
      <ModalSearchBerita />
    </main>
  )
}
