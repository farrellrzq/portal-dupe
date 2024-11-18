import { getBeritaKelurahan, getBeritaKota, getBerita  } from '@/controllers/HomeController'
import React from 'react'
import Content from './content';

export default async function berita() {
    const [beritaKota, berita, beritaKelurahan] = await Promise.all([
        await getBeritaKota(),
        await getBerita({limit:'3'}),
        await getBeritaKelurahan({limit:'3'})
    ])
  return (
    <section className="relative lg:py-8 lg:px-20 py-5 px-4">
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
        <img src="img/gradient.jpg" alt="gradient" className="w-full" />
        </picture>
        <h2 className="mb-2 text-center font-display text-3xl text-jacarta-700 dark:text-white">
        Berita & Artikel
        </h2>
        <p className="text-center mb-16 text-jacarta-700 dark:text-white">
        Berita terbaru Depok
        </p>
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img
            src="img/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
        />
        </picture>
        <div className="">
        {/* <!-- Tabs Nav --> */}
        <ul
            className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center"
            role="tablist"
        >
            <li className="nav-item" role="presentation">
            <button
                className="nav-link active relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
                id="on-sale-tab"
                data-bs-toggle="tab"
                data-bs-target="#on-sale"
                type="button"
                role="tab"
                aria-controls="on-sale"
                aria-selected="true"
            >
                <span className="font-display text-base font-medium">
                Berita Kecamatan
                </span>
            </button>
            </li>
            <li className="nav-item" role="presentation">
            <button
                className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
                id="kelurahan-tab"
                data-bs-toggle="tab"
                data-bs-target="#kelurahan"
                type="button"
                role="tab"
                aria-controls="kelurahan"
                aria-selected="true"
            >
                <span className="font-display text-base font-medium">
                Berita Kelurahan
                </span>
            </button>
            </li>
            <li className="nav-item" role="presentation">
            <button
                className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
                id="kota-tab"
                data-bs-toggle="tab"
                data-bs-target="#kota"
                type="button"
                role="tab"
                aria-controls="kota"
                aria-selected="false"
            >
                <span className="font-display text-base font-medium">
                Berita Kota
                </span>
            </button>
            </li>
        </ul>
        <Content beritaKota={beritaKota} berita={berita} beritaKelurahan={beritaKelurahan} />
        </div>
    </section>
  )
}
