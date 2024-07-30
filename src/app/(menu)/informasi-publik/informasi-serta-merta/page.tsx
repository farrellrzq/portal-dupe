import React from 'react'
import Content from './content'
import { getInformasiSertaMerta } from '@/controllers/InformasiPublikController'
import ModalSearchBerita from '../../modal/page';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Informasi Serta Merta',
    description: 'Informasi Serta Merta I Portal Disdukcapil Kota Depok',
};

export default async function page() {
    const sertaMerta = await getInformasiSertaMerta();
    return (
        <main className="pt-[5.5rem] lg:pt-24">
            <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
                <div className="container">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
                            Informasi Publik <span className="text-accent">Serta Merta.</span>
                        </h1>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
                    <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
                </picture>
                <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                    <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
                </picture>
                <div className="container">
                    <Content sertaMerta={sertaMerta} />
                </div>
            </section>
            <ModalSearchBerita />
        </main>
    )
}
