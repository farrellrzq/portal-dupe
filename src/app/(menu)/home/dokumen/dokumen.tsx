import React from 'react'
import Content from './content'
import { getDokumen } from '@/controllers/HomeController'

export default async function dokumen() {
    const dokumen = await getDokumen();
  return (
    <div className="lg:w-2/5 w-full my-8 lg:my-0">
        <h2 className="mb-2 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            Dokumen Produk
        </h2>
        <p className="text-center mb-16 text-jacarta-700 dark:text-white">
            Informasi dokumen produk yang kami miliki
        </p>
        <Content dokumen={dokumen} />
        <div className="mt-10 text-center">
            <a
            href="/publikasi/dokumen"
            className="inline-block rounded-full bg-green-600 py-3 px-8 text-center font-semibold text-white shadow-green-600-volume transition-all hover:bg-green-600-dark"
            >
            Selengkapnya
            </a>
        </div>
    </div>
  )
}
