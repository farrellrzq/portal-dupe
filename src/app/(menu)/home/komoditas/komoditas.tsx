import React from 'react'
import Content from './content'
import { getKomoditas } from '@/controllers/HomeController'

export default async function komoditas() {
    const hargaKomoditas = await getKomoditas();
  return (
    <section className="lg:py-8 lg:px-20 bg-teal-50 dark:bg-jacarta-800">
          <div className="">
            <h2 className="mb-2 text-center font-display text-3xl text-jacarta-700 dark:text-white lg:mt-10">
              Harga Komoditas Pasar
            </h2>
            <p className="text-center lg:mb-16 mb-4 text-jacarta-700 dark:text-white">
              Sumber: Dinas Perdagangan dan Perindustrian Kota Depok
            </p>
            <div className="">
              <div className="relative">
              <Content hargaKomoditas={hargaKomoditas} />

                <div className="swiper-button-prev swiper-button-prev-1 group absolute top-1/2 -left-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume sm:-left-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 group-hover:fill-accent"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
                  </svg>
                </div>
                <div className="swiper-button-next swiper-button-next-1 group absolute top-1/2 -right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume sm:-right-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 group-hover:fill-accent"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}
