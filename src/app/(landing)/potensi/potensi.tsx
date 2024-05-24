import React from 'react'
import Content from './content'
import { getPotensi } from '@/controllers/HomeController'
import ModalPotensi from './modal';

export default async function potensi() {
    const potensi = await getPotensi();
  return (
    <>
    <section className="lg:py-24 lg:px-20 pb-5 bg-teal-50 dark:bg-jacarta-800">
        <div className="bg-white lg:p-12 lg:rounded-xl dark:bg-jacarta-900">
          <div className="container">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <h2 className="mb-6 text-center font-display text-3xl font-medium text-jacarta-700 dark:text-white">
                Potensi Unggulan
              </h2>
            </div>
            <div className="lg:flex">
              <div className="w-full grid grid-cols-1">
                <Content potensi={potensi} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalPotensi />
      </>
  )
}
