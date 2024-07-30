import React from 'react'
import { getDetailBerita, getDetailBeritaPopuler } from '@/controllers/PublikasiController'
import Content from './content';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Berita DKUM',
  description: 'Portal DKUM Kota Depok',
};

export default async function page({ params }: { params: { slug_title: string } }) {
  const berita = await getDetailBerita(params.slug_title);
  const beritaPopuler = await getDetailBeritaPopuler();
  return (
    <section className="relative py-16 md:py-24">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
      </picture>
      <div className="container">
        <Content berita={berita} beritaPopuler={beritaPopuler} params={params} />
      </div>
    </section>
  )
}
