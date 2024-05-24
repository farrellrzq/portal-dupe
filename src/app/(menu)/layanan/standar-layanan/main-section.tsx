import { getStandarPelayanan } from '@/controllers/PelayananController'
import React from 'react'
import Content from './content';

export default async function MainSection() {
  const StandarLayanan = await getStandarPelayanan();
  return (
    <>
      <div className="container">
        <div
          className="flex flex-wrap rounded-2.5xl bg-white dark:bg-jacarta-700 md:flex-nowrap md:space-x-8 md:p-[4.25rem] lg:space-x-16">
          <div className="lg:flex lg:justify-between">
            <Content StandarLayanan={StandarLayanan} />
          </div>
        </div>
      </div>
    </>
  )
}
