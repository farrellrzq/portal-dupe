import React from 'react'
import Content from './content'
import { getPotensi } from '@/controllers/HomeController'
import ModalPotensi from './modal';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Potensi Unggulan',
    description: 'Potensi I Portal Kecamatan Kota Depok',
};

export default async function page() {
    const potensi = await getPotensi();
    return (
        <main className="pt-[5.5rem] lg:pt-10">
            <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
                <div className="container">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
                            Potensi Unggulan
                        </h1>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <picture className="pointer-events-none absolute -z-10 dark:hidden">
                    <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
                </picture>
                <picture className="pointer-events-none absolute -z-10 dark:hidden">
                    <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
                </picture>
                <Content potensi={potensi} />
            </section>
            <ModalPotensi />
        </main>
    )
}
