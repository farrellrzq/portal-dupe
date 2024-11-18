import React from 'react'
import { getBerita, getExLink, getProfileSite, getVisit } from "@/controllers/Controller";
import Content from './content';
import { getLayanan, getLayananKota } from '@/controllers/HomeController';
import ModalLayanan from './modal';

export default async function layanan() {
  const [profilSite, layanan, layananKota] = await Promise.all([
    await getProfileSite(),
    await getLayanan(),
    await getLayananKota(),
  ]);

  return (
    <>
      <section className="lg:py-8 lg:px-20 py-5 px-4 bg-teal-50 dark:bg-jacarta-800">
        <div className="">
          <div className="lg:flex">
            <div className="lg:w-full w-full grid grid-cols-1 text-center lg:text-start">
              <h3 className="font-display p-4 text-3xl text-jacarta-700 dark:text-white">
                Layanan Kecamatan
              </h3>
              <span className="text-md px-4 pb-2">
                Layanan {profilSite?.Name ? profilSite.Name : ""}
              </span>
              <div className="scrollbar-custom overflow-x-auto rounded-lg">
                <div className="min-w-fit">
                  {/* Tabs Nav */}
                  <div className="lg:flex mt-2">
                    <div className="lg:w-3/4 w-full">
                      <ul
                        className="nav nav-tabs flex items-center lg:place-content-start place-content-center"
                        role="tablist"
                      >
                        {/* Offers */}
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active mr-2.5 mb-2.5 rounded-t-xl bg-white border border-jacarta-100 relative flex items-center whitespace-nowrap px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent"
                            id="offers-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#offers"
                            type="button"
                            role="tab"
                            aria-controls="offers"
                            aria-selected="true"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              className="mr-1 h-5 w-5 fill-current"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M8 4h13v2H8V4zm-5-.5h3v3H3v-3zm0 7h3v3H3v-3zm0 7h3v3H3v-3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
                            </svg>
                            <span className="font-display text-xs lg:text-base font-medium">
                              Layanan Kecamatan
                            </span>
                          </button>
                        </li>

                        {/* Properties */}
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link mr-2.5 mb-2.5 rounded-t-xl border border-jacarta-100 bg-white relative flex items-center whitespace-nowrap px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent"
                            id="properties-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#properties"
                            type="button"
                            role="tab"
                            aria-controls="properties"
                            aria-selected="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              className="mr-1 h-5 w-5 fill-current"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17z" />
                            </svg>
                            <span className="font-display text-xs lg:text-base font-medium">
                              Layanan Kota
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:w-3/4 hidden lg:block w-full lg:text-right sm:text-center">
                      <a href="/layanan/layanan-kecamatan">
                        <button className="rounded-full bg-green-600 my-6 lg:my-0 px-6 py-4 lg:py-2 font-display text-sm text-white hover:bg-green-600-dark">
                          Lihat Selengkapnya
                        </button>
                      </a>
                    </div>
                  </div>
                  <Content layanan={layanan} layananKota={layananKota} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalLayanan />
    </>
  )
}
