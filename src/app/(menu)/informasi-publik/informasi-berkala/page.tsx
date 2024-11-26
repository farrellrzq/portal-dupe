import React from 'react'
import Content from './content'
import { getInformasiPublik } from '@/controllers/InformasiPublikController';
import ModalSearchBerita from '../../modal/page';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Informasi Berkala',
  description: 'Informasi Berkala I Portal OPD Kota Depok',
};

export default async function page() {
  const informasiBerkala = await getInformasiPublik();
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative dark:bg-jacarta-800 bg-white pb-20">
        <div className="container">
          <div className="mx-auto max-w-4xl pt-24 text-center">
            <h1 className="font-display text-2xl text-jacarta-700 dark:text-white lg:text-5xl xl:text-5xl">
              Informasi <span className="text-blue">Secara Berkala.</span>
            </h1>
          </div>
        </div>
      </section>
      <section className="py-24 dark:bg-jacarta-900">
        <div className="container">
          <Content informasiBerkala={informasiBerkala} />
        </div>
      </section>
      {/* <!-- end benefits --> */}
      <ModalSearchBerita />
    </main>
  )
}
