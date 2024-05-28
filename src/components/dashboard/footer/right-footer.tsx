
import { getVisit } from '@/controllers/Controller';
import React from 'react'


export default async function RightFooter() {
  const visit = await getVisit();
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = now.toLocaleDateString("id-ID", options);

  return (
    <div className="col-span-full sm:col-span-3 md:col-span-4">
      <h3 className="mb-0 font-display text-lg text-jacarta-700 dark:text-white">
        Data Pengunjung
      </h3>
      <span className="text-sm dark:text-jacarta-300">
        Diperbarui : {formattedDate}
      </span>
      <ul className="flex flex-col space-y-1 dark:text-jacarta-300 mt-5">
        <li className="flex">
          <div className="flex flex-wrap items-center space-x-2 text-base text-jacarta-400">
            <strong>Hari Ini</strong><br />
            <span>{visit?.w_hari[0]?.Jumlah ?? "0"} Kunjungan</span>
          </div>

          <div className="ml-5 flex flex-wrap items-center space-x-2 text-base text-jacarta-400">
            <strong>Minggu Ini</strong><br />
            <span>{visit?.w_minggu[0]?.Jumlah ?? "0"} Kunjungan</span>
          </div>
        </li>

        <li className="flex pt-3">
          <div className="flex flex-wrap items-center space-x-2 text-base text-jacarta-400">
            <strong>Bulan Ini</strong><br />
            <span>{visit?.w_bulan[0]?.Jumlah ?? "0"} Kunjungan</span>
          </div>

          <div className="ml-5 flex flex-wrap items-center space-x-2 text-base text-jacarta-400">
            <strong>Tahun Ini</strong><br />
            <span>{visit?.w_tahun[0]?.Jumlah ?? "0"} Kunjungan</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
