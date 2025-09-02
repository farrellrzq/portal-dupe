// src/app/(menu)/home/widget/widget.tsx

import React from 'react';

// 1. Definisikan tipe untuk props yang akan diterima.
//    Ini harus cocok dengan apa yang dikembalikan oleh getWidgetData()
interface WidgetData {
  total: string | null;
  totalMale: string | null;
  totalFemale: string | null;
  sorten: string | null;
  totalPenyakit: string | null;
  yearPenduduk: number | null;
}

interface WidgetComponentProps {
  data: WidgetData | null;
}

// 2. Ubah komponen menjadi komponen standar (bukan async) dan ganti nama fungsinya
//    Nama komponen di React sebaiknya diawali dengan huruf kapital, misal: Widget.
export default function Widget({ data }: WidgetComponentProps) {
  // 3. Hapus baris 'const { ... } = await getWidgetData();'

  return (
    <div className="relative py-5">
      <div className="px-4 py-4 xl:px-24">
        <div className="flex">
          <div className="w-3/4">
            <span className="text-sm dark:text-jacarta-300">
              {/* Gunakan tahun dari data untuk membuatnya dinamis */}
              Sumber : Total Data Kependudukan Bersih Kemendagri, Semester 1 Tahun {data?.yearPenduduk ?? new Date().getFullYear()}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
          
          {/* Box 1: Jumlah Penduduk */}
          <div className="lg:flex webkit-center lg:text-start rounded-2.5xl border border-jacarta-100 bg-white lg:py-4 lg:px-7 py-2 px-2 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700">
            <span className="lg:font-display lg:text-3xl text-sm lg:hidden block text-jacarta-700 hover:text-accent dark:text-white">
              Jumlah Penduduk
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="animate-bounce w-6 h-6 lg:w-10 lg:h-10 my-2 lg:my-0 lg:mr-4 text-blue dark:text-white"
            >
              <path
                strokeLinecap="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <div className="lg:text-left">
              <span className="font-display lg:text-3xl text-sm font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                {/* 4. Gunakan data dari props, berikan fallback 'N/A' jika data null */}
                {data?.total ?? 'N/A'}
              </span>
              <span className="text-xs dark:text-jacarta-300 lg:block hidden">
                Statistik Jumlah Penduduk
              </span>
            </div>
          </div>

          {/* Box 2: Jumlah Laki-Laki */}
          <div className="lg:flex webkit-center lg:text-start rounded-2.5xl border border-jacarta-100 bg-white lg:py-4 lg:px-7 py-2 px-2 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700">
            <span className="lg:font-display lg:text-3xl text-sm lg:hidden block text-jacarta-700 hover:text-accent dark:text-white">
              Jumlah Laki-Laki
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="animate-bounce w-6 h-6 lg:w-10 lg:h-10 my-2 lg:my-0 lg:mr-4 text-green dark:text-white"
            >
              <path
                strokeLinecap="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div className="lg:text-left">
              <span className="font-display lg:text-3xl text-sm font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                {data?.totalMale ?? 'N/A'}
              </span>
              <span className="text-xs dark:text-jacarta-300 lg:block hidden">
                Jumlah Laki-Laki
              </span>
            </div>
          </div>

          {/* Box 3: Jumlah Perempuan */}
          <div className="lg:flex webkit-center lg:text-start rounded-2.5xl border border-jacarta-100 bg-white lg:py-4 lg:px-7 py-2 px-2 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700">
            <span className="lg:font-display lg:text-3xl text-sm lg:hidden block text-jacarta-700 hover:text-accent dark:text-white">
              Jumlah Perempuan
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="animate-bounce w-6 h-6 lg:w-10 lg:h-10 my-2 lg:my-0 lg:mr-4 text-[#F8E559] dark:text-white"
            >
              <path
                strokeLinecap="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div className="lg:text-left">
              <span className="font-display lg:text-3xl text-sm font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                {data?.totalFemale ?? 'N/A'}
              </span>
              <span className="text-xs dark:text-jacarta-300 lg:block hidden">
                Jumlah Perempuan
              </span>
            </div>
          </div>

          {/* Box 4: Penyakit Terbanyak */}
          <div className="lg:flex webkit-center lg:text-start rounded-2.5xl border border-jacarta-100 bg-white lg:py-4 lg:px-7 py-2 px-2 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700">
            <span className="lg:font-display lg:text-3xl text-sm lg:hidden block text-jacarta-700 hover:text-accent dark:text-white">
              Penyakit Terbanyak
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              data-slot="icon"
              className="animate-bounce w-6 h-6 lg:w-10 lg:h-10 my-2 lg:my-0 lg:mr-4 text-[#ff8ba7] dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <div className="lg:text-left">
              <span className="font-display lg:text-3xl text-sm font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                {data?.totalPenyakit ?? 'N/A'}
              </span>
              <span className="text-xs dark:text-jacarta-300 lg:block hidden">
                Jumlah Penyakit Terbanyak : <br />{data?.sorten ?? 'Data tidak tersedia'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}