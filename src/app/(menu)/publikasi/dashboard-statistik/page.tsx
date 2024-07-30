import React from 'react'
import Content from './content'
import { getDashboardStatistik } from '@/controllers/PublikasiController'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard Statistik Setda',
  description: 'Dashboard Statistik I Portal Setda Kota Depok',
};

export default async function page() {
  const DashboardStatistik = await getDashboardStatistik();
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
      <Content DashboardStatistik={DashboardStatistik} />
    </main>
  )
}
