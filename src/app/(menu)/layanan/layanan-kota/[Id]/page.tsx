import React from 'react'
import Content from './content'
import type { Metadata } from "next";
import { getDetailLayananKota } from '@/controllers/PelayananController';

export const metadata: Metadata = {
  title: 'Detail Layanan Setda',
  description: 'Portal Setda Kota Depok',
};

export default async function page({ params }: { params: { Id: string } }) {
  return (
    <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
            <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
        </picture>
        <div className="container">
            <Content layanan={null} layananKota={null} params={params} />
        </div>
    </section>
  )
}
