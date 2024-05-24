'use client'

import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Sliderloader() {
    return (
        <div>
            <div className="swiper full-slider xl:h-[41rem] sm:h-[20rem]">
                <div className="swiper-wrapper">
                    <div
                        className="swiper-slide xl:h-[41rem] sm:h-[20rem]">
                        <div className="relative max-h-0 z-10 -mt-48 dark:bg-jacarta-900">
                            <div className="px-4 py-4 xl:px-24 pt-80">
                                <div className="relative xl:h-[25rem] sm:h-[11rem] overflow-hidden rounded-2xl sm:px-16 sm:pt-16 sm:pb-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] xl:px-24">
                                    <picture className="pointer-events-none absolute inset-0 -z-10 block dark:hidden">
                                        <Skeleton />
                                    </picture>
                                    <div className="items-center justify-between md:flex">
                                        <Skeleton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="swiper full-slider-thumbs hidden">
                <div className="swiper-wrapper">
                    <div className="swiper-slide cursor-pointer rounded p-5">
                        <div className="carousel-progress relative -bottom-5 z-10 -ml-5 -mr-5 h-0.5 bg-white/20">
                            <Skeleton />
                        </div>
                    </div>
                    <div className="swiper-slide cursor-pointer rounded p-5">
                        <div className="carousel-progress relative -bottom-5 z-10 -ml-5 -mr-5 h-0.5 bg-white/20">
                            <Skeleton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}