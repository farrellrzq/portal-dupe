import React from 'react'
import Content from './content'
import { getDashboard } from '@/controllers/PublikasiController'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard I Portal OPD Kota Depok',
};

export default async function page() {
  const Dashboard = await getDashboard();
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
              Dashboard
            </h1>
          </div>
        </div>
      </section>
      <Content Dashboard={Dashboard}/>
    </main>
  )
}
