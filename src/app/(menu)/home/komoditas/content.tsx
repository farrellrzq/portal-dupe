import { KomoditasProps } from '@/controllers/types/home-controller.type';
import React from 'react'

export default function Content({ hargaKomoditas }: { hargaKomoditas: KomoditasProps[] | null }) {
    return (
        <div className="swiper card-slider-2-columns !py-5">
            <div className="swiper-wrapper">
                {hargaKomoditas &&
                    hargaKomoditas
                        .slice(0, 5)
                        .map((item: any, index: number) => {
                            return (
                                <div className="swiper-slide" key={index}>
                                    <article>
                                        <div className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                                            <figure>
                                                <a href="#">
                                                    <img
                                                        src={`./img/komoditas/${index === 0
                                                            ? "bawang-bombay.jpeg"
                                                            : index === 1
                                                                ? "bawang-merah.jpeg"
                                                                : index === 2
                                                                    ? "bawang-putih.jpeg"
                                                                    : index === 3
                                                                        ? "bawang-putih-cutting.jpeg"
                                                                        : "beras.jpeg"
                                                            }`}
                                                        alt={`item ${index + 1}`}
                                                        width="230"
                                                        height="230"
                                                        className="w-full h-40 object-cover rounded rounded-[0.625rem}"
                                                        loading="lazy"
                                                    />
                                                </a>
                                            </figure>
                                            <div className="mt-4 flex items-center justify-between">
                                                <a href="#">
                                                    <span className="font-display text-base text-jacarta-700 hover:text-yellow-600 dark:text-white">
                                                        {item.komoditi}
                                                    </span>
                                                </a>
                                                <span className="flex items-center whitespace-nowrap rounded-md border border-jacarta-100 py-1 px-2 dark:border-jacarta-600">
                                                    <span
                                                        className={`text-sm font-medium tracking-tight ${item.selisih.includes("-")
                                                            ? "text-green"
                                                            : item.selisih === "0"
                                                                ? "text-gray"
                                                                : "text-red"
                                                            }`}
                                                    >
                                                        {item.selisih.includes("-")
                                                            ? "Harga Turun"
                                                            : item.selisih === "0"
                                                                ? "Harga Tetap"
                                                                : "Harga Naik"}{" "}
                                                        {item.selisih}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="mt-2 flex space-x-8">
                                                <div className="w-1/2">
                                                    <div>
                                                        <span className="inline-block font-display text-lg font-semibold text-accent">
                                                            Rp.{" "}
                                                            {parseFloat(
                                                                item.price_yesterday
                                                            ).toLocaleString("id-ID")}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-jacarta-700 dark:text-white">
                                                        Harga Kemarin
                                                    </span>
                                                </div>
                                                <div className="w-1/2">
                                                    <div>
                                                        <span
                                                            className={`inline-block font-display text-lg font-semibold text-accent ${parseFloat(item.price_yesterday) >
                                                                parseFloat(item.price_today)
                                                                ? "text-green"
                                                                : parseFloat(
                                                                    item.price_yesterday
                                                                ) < parseFloat(item.price_today)
                                                                    ? "text-red"
                                                                    : ""
                                                                }`}
                                                        >
                                                            Rp.{" "}
                                                            {parseFloat(
                                                                item.price_today
                                                            ).toLocaleString("id-ID")}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-jacarta-700 dark:text-white">
                                                        Harga Hari ini
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
            </div>
        </div>
    )
}
