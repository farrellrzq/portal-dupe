import React, { Suspense } from "react";
import Pengumuman from "./pengumuman/pengumuman";
import Dokumen from "./dokumen/dokumen";
import Government from "./government/government";
import Infografis from "./infografis/infografis";
import Layanan from "./layanan/layanan";
import Slider from "./slider/slider";
import Sosmed from "./sosmed/sosmed";
import Agenda from "./agenda/agenda";
import Berita from "./berita/berita";
import ModalPengumuman from "./modal/modalPengumuman";
import ModalSearchBerita from "../(menu)/modal/page";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

// Loader Skeleton
import Sliderloader from "./loader/sliderLoader";

export default async function Home() {
  return (
    <HydrationOverlay>
      <main>
        <Slider />
        <Layanan />
        <section className="lg:py-20 lg:px-20 py-5 px-4">
          <div className="lg:flex mb-4">
            <Infografis />
            <Dokumen />
          </div>
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
