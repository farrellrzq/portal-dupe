import React, { Suspense } from 'react'
import Pengumuman from "./pengumuman/pengumuman";
import Dokumen from "./dokumen/dokumen";
import Government from "./government/government";
import Infografis from "./infografis/infografis";
import Layanan from "./layanan/layanan";
import Slider from "./slider/slider";
import Sosmed from "./sosmed/sosmed";
import Widget from "./widget/widget";
import Agenda from "./agenda/agenda";
import Berita from "./berita/berita";
import ModalPengumuman from "./modal/modalPengumuman";
import ModalSearchBerita from "../(menu)/modal/page";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

// Loader Skeleton
import Widgetloader from "./loader/widgerLoader";
import Sliderloader from "./loader/sliderLoader";

export default async function Home() {
  return (
    <HydrationOverlay>
      <main>
        <Suspense fallback={<Sliderloader />}>
          <Slider />
        </Suspense>
        {/* <Suspense fallback={<Widgetloader />}>
          <Widget />
        </Suspense> */}
        <Layanan />
        <section className="lg:py-20 lg:px-20 py-5 px-4">
          <div className="lg:flex mb-4">
            <Infografis />
            <Dokumen />
          </div>
        </section>
        <section className="lg:py-24 lg:px-20 pb-5 py-5 px-4">
          <iframe
            src="https://dsw.depok.go.id/user/show_titikwifi"
            className="w-full h-[55rem] overflow-x-hidden"
          ></iframe>
        </section>
        <section className="py-5 px-4 lg:py-8 lg:px-20 bg-teal-50 dark:bg-jacarta-800">
          <div className="lg:flex">
            <Sosmed />
            <Government />
          </div>
        </section>
        <section className="py-5 px-4 lg:py-24 lg:px-20 pt-10">
          <div className="">
            <div className="lg:flex mb-4">
              <Pengumuman />
              <Agenda />
            </div>
          </div>
        </section>
        <Berita />
        <ModalPengumuman />
        <ModalSearchBerita />
      </main>
    </HydrationOverlay>
  );
}
