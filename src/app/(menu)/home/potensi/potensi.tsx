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
            <div className="lg:flex mb-7">
              <h2 className="lg:w-3/4 w-full font-display text-3xl font-medium text-jacarta-700 dark:text-white">
                Potensi Unggulan
              </h2>
              <div className="lg:w-3/4 hidden lg:block w-full lg:text-right sm:text-center">
                <a href="/publikasi/potensi">
                  <button className="rounded-full bg-green-600 my-6 lg:my-0 px-6 py-4 lg:py-2 font-display text-sm text-white hover:bg-green-600-dark">
                    Lihat Selengkapnya
                  </button>
                </a>
              </div>
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
