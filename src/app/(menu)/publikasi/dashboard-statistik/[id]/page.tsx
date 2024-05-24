import React from 'react'
import { getDetailDashboardStatistik } from '@/controllers/PublikasiController'
import FetchContent from './fetch-content';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Detail Dashboard Statistik Kecamatan',
  description: 'Portal Kecamatan Kota Depok',
};

export default async function page({ params }: { params: { id: string } }) {
  // const DashboardStatistik = await getDetailDashboardStatistik(params.id);
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
              Dashboard Statistik
            </h1>
          </div>
        </div>
      </section>
      <FetchContent params={params} />
    </main>
  )
}