import { SliderProps } from '@/controllers/types/home-controller.type';
import React from 'react'

export default function Content({ slider }: { slider: SliderProps[] | null }) {
  return (
    <>
      <div className="swiper full-slider xl:h-[41rem] sm:h-[20rem]">
        <div className="swiper-wrapper">
          {slider &&
            slider.map((item: any, index: number) => {
              return (
                <div
                  className="swiper-slide xl:h-[41rem] sm:h-[20rem]"
                  key={index}
                >
                  <div className="relative max-h-0 z-10 -mt-48 dark:bg-jacarta-900">
                    <div className="px-4 py-4 xl:px-24 pt-80">
                      <div className="relative xl:h-[25rem] sm:h-[11rem] overflow-hidden rounded-2xl sm:px-16 sm:pt-16 sm:pb-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] xl:px-24">
                        <picture className="pointer-events-none absolute inset-0 -z-10 block dark:hidden">
                          <img
                            src={item.File
                              ? `https://cms.depok.go.id/upload/slider/${item.File}`
                              : "/img/kecamatan/dsw/kesehatan.png"
                            }
                            alt="gradient"
                            className="h-fit w-full object-cover"
                          />
                        </picture>
                        <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
                          <img
                            src={item.File
                              ? `https://cms.depok.go.id/upload/slider/${item.File}`
                              : "/img/kecamatan/dsw/kesehatan.png"
                            }
                            alt="gradient dark"
                            className="h-fit w-full object-cover"
                          />
                        </picture>
                        <div className="items-center justify-between md:flex">
                          <div className="mb-6 md:w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* <!-- end main slider --> */}

      <div className="swiper full-slider-thumbs hidden">
        <div className="swiper-wrapper">
          <div className="swiper-slide cursor-pointer rounded p-5">
            {/* <img src="img/hero/hero_slide_1_thumb.jpg" className="w-full rounded-xl" alt="thumb 1" /> */}
            <div className="carousel-progress relative -bottom-5 z-10 -ml-5 -mr-5 h-0.5 bg-white/20">
              <div className="progress absolute h-0.5 w-0 bg-amber-300"></div>
            </div>
          </div>
          <div className="swiper-slide cursor-pointer rounded p-5">
            {/* <img src="img/hero/hero_slide_2_thumb.jpg" className="w-full rounded-xl" alt="thumb 2" /> */}
            <div className="carousel-progress relative -bottom-5 z-10 -ml-5 -mr-5 h-0.5 bg-white/20">
              <div className="progress absolute h-0.5 w-0 bg-amber-300"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
