import React from 'react'
import Content from './content'
import { getListStandarPelayanan } from '@/controllers/PelayananController'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'List Standar Pelayanan',
  description: 'List Standar Pelayanan I Portal Disdukcapil Kota Depok',
};

export default async function page() {
  const listStandarPelayanan = await getListStandarPelayanan();
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
              Standar Layanan
            </h1>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
          <img src="../img/gradient.jpg" alt="gradient" className="w-full" />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src="../img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
        </picture>
        <div className="container">
          <div className="lg:flex mb-4">
            <div className="lg:w-2/6 w-full my-8 lg:my-0">
              <figure className="md:flex-shrink-0 md:flex-grow-0 md:basis-auto">
                <img
                  src="/img/blog/Accept terms-cuate.png"
                  alt="item"
                  className="cursor-pointer rounded-2.5xl w-[25rem] h-[25rem] object-cover"
                  data-bs-toggle="modal"
                  data-bs-target="#imageModal"
                />

                <div className="modal fade" id="imageModal" tabIndex={-1} aria-hidden="true">
                  <div className="modal-dialog !my-0 flex h-full items-center justify-center p-4">
                    <img src="img/products/item_single_full.jpg" alt="item" />
                  </div>

                  <button
                    type="button"
                    className="btn-close absolute top-6 right-6"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-6 w-6 fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                      />
                    </svg>
                  </button>
                </div>
              </figure>

              <div className="md:basis-auto md:pl-8 lg:p-4">
                <h1 className="mb-4 font-display text-2xl font-semibold text-jacarta-700 dark:text-white">Proses dan Prosedur Perizinan</h1>

                {/* <p className="mb-10 dark:text-jacarta-300">
                  <span className="text-4xl text-accent">P</span>rosedur perizinan dapat meliputi prosedur pelayanan perizinan, proses penyelesaian perizinan yang merupakan proses internal yang dilakukan oleh aparat/petugas. Secara umum permohonan izin itu harus menempuh prosedur tertentu yang ditentukan oleh pemerintah, selaku pemberi izin.
                </p> */}

              </div>
            </div>
            <div className="lg:w-4/6 w-full my-8 lg:my-0">
              <div className="p-12">
                <table className="min-w-full" id="basic-1">
                  <thead className="bg-white border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        Dokumen
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <Content listStandarPelayanan={listStandarPelayanan} />
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
