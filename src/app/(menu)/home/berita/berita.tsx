// src/app/(menu)/home/berita/berita.tsx

import React from 'react';
import Content from './content';
import { BeritaProps, BeritaKotaProps } from '@/controllers/types/home-controller.type';

// 1. Definisikan tipe untuk props yang akan diterima
interface BeritaComponentProps {
    data: {
        berita: BeritaProps[] | null;
        beritaKota: BeritaKotaProps[];
    }
}

// 2. Ubah nama komponen menjadi "Berita" (huruf kapital) dan ubah menjadi komponen standar (bukan async)
export default function Berita({ data }: BeritaComponentProps) {
    // Hapus baris 'const [beritaKota, berita] = await Promise.all([...]);'

    // 3. Ambil data dari props
    const { berita, beritaKota } = data;

    return (
        <section className="relative lg:py-8 lg:px-20 py-5 px-4">
            <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
                <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
            </picture>
            <h2 className="mb-2 text-center font-display text-3xl text-jacarta-700 dark:text-white">
                Berita & Artikel
            </h2>
            <p className="text-center mb-16 text-jacarta-700 dark:text-white">
                Berita terbaru seputar wilayah Depok
            </p>
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                <img
                    src="/img/gradient_light.jpg"
                    alt="gradient"
                    className="h-full w-full"
                />
            </picture>
            <div className="">
                {/* Navigasi Tabs */}
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
                                Berita Wilayah
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
                {/* 4. Teruskan data dari props ke komponen Content */}
                <Content berita={berita} beritaKota={beritaKota} />
            </div>
        </section>
    );
}