'use client'
import { SliderProps } from '@/controllers/types/home-controller.type';
import React, { useEffect } from 'react'
import Swiper from 'swiper/bundle';

export default function Content({ slider }: { slider: SliderProps[] | null }) {
  useEffect(() => {
    new Swiper('.swiper', {
      // konfigurasi Swiper
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

  return (
    <>
      <div className="swiper full-slider xl:h-[41rem] sm:h-[20rem]">
        <div className="swiper-wrapper">
          {slider &&
            slider.map((item, index) => (
              <div className="swiper-slide xl:h-[41rem] sm:h-[20rem]" key={index}>
                <div className="relative max-h-0 z-10 -mt-48 dark:bg-jacarta-900">
                  <div className="px-4 py-4 xl:px-24 pt-80">
                    <div className="relative xl:h-[25rem] sm:h-[11rem] overflow-hidden rounded-2xl sm:px-16 sm:pt-16 sm:pb-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] xl:px-24">
                      <picture className="pointer-events-none absolute inset-0 -z-10 block dark:hidden">
                        <img
                          src={item.File
                            ? `https://cms.depok.go.id/upload/slider/${item.File}`
                            : "/img/kecamatan/dsw/kesehatan.png"}
                          alt="gradient"
                          className="h-fit w-full object-cover"
                        />
                      </picture>
                      <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
                        <img
                          src={item.File
                            ? `https://cms.depok.go.id/upload/slider/${item.File}`
                            : "/img/kecamatan/dsw/kesehatan.png"}
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
            ))}
        </div>
        {/* Tambahkan pagination dan navigasi jika diperlukan */}
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </>
  );
}