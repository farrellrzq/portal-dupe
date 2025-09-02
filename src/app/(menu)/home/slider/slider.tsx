// src/app/(menu)/home/slider/slider.tsx

import React from 'react';
import Content from './content';
import { SliderProps } from '@/controllers/types/home-controller.type'; // Pastikan path tipe ini benar

// 1. Definisikan tipe untuk props yang akan diterima komponen
interface SliderComponentProps {
  data: SliderProps[] | null;
}

// 2. Ubah komponen ini menjadi komponen standar (bukan async)
//    - Hapus `async` dari deklarasi fungsi.
//    - Terima `data` sebagai props.
export default function Slider({ data }: SliderComponentProps) {
  // 3. Hapus baris 'const slider = await getSlider();'. Data sudah ada di props 'data'.

  return (
    <>
      <section className="relative h-fit">
        <picture className="pointer-events-none absolute inset-0 -z-10 block dark:hidden">
          <img
            src="/img/blog/Wallpaper Kecamatan Depok-02.png" // Tambahkan '/' di depan path gambar
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <img
            src="/img/blog/Wallpaper Kecamatan Depok-03.png" // Tambahkan '/' di depan path gambar
            alt="gradient"
            className="h-full w-full"
          />
        </picture>

        {/* 4. Teruskan data dari props ke komponen Content */}
        <Content slider={data} />
      </section>
    </>
  );
}