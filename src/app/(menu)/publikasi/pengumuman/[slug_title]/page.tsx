import React from 'react'
import Content from './content'
import { getDetailPengumuman, getDetailPengumumanPopuler } from '@/controllers/PublikasiController'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Detail Pengumuman Disdukcapil',
  description: 'Portal Disdukcapil Kota Depok',
};

export default async function page({ params }: { params: { slug_title: string } }) {
  const pengumuman = await getDetailPengumuman(params.slug_title);
  const pengumumanPopuler = await getDetailPengumumanPopuler()
  return (
    <section className="relative py-16 md:py-24">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
      </picture>
      <div className="container">
        <Content pengumuman={pengumuman} pengumumanPopuler={null} params={params} />
      </div>
    </section>
  )
}
