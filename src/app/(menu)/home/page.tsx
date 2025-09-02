import React, { Suspense } from "react"
import { getSlider, getWidgetData, getLayanan, getLayananKota, getInfografis, getDokumen, getPengumuman, getAgenda, getBerita, getBeritaKota } from "@/controllers/HomeController";
import { getProfileSite, getJenisWilayah } from "@/controllers/Controller";
import { ProfileSiteProps } from '@/controllers/types/controller.type'; // Pastikan tipe ini diimpor
import Pengumuman from "./pengumuman/pengumuman";
import Dokumen from "./dokumen/dokumen";
import Government from "./government/government";
import Infografis from "./infografis/infografis";
import Layanan from "./layanan/layanan";
import Slider from "./slider/slider";
import Sosmed from "./sosmed/sosmed";
import Widget from "./widget/widget";
import Agenda from "./agenda/agenda";
// import Komoditas from "./komoditas/komoditas";
// import Potensi from "./potensi/potensi";
import Berita from "./berita/berita";
import ModalPengumuman from "./modal/modalPengumuman";
import ModalSearchBerita from "../modal/page";
// import { getProfileSite } from "@/controllers/Controller";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

// Loader Skeleton
import Widgetloader from "./loader/widgerLoader";
import Sliderloader from "./loader/sliderLoader";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Portal Kecamatan',
  description: 'Portal Kecamatan Kota Depok',
};

export default async function Home() {
  const [
    sliderData,
    widgetData,
    layananData,
    layananKotaData, // Tambahkan ini
    infografisData,
    dokumenData,
    pengumumanData,
    agendaData,
    beritaData,
    beritaKotaData,
    profilSiteData,   // Tambahkan ini
  ] = await Promise.all([
    getSlider(),
    getWidgetData(),
    getLayanan(),
    getLayananKota(), // Tambahkan ini
    getInfografis(),
    getDokumen(),
    getPengumuman(),
    getAgenda(),
    getBerita({ limit: '5' }),
    getBeritaKota(),
    getProfileSite(), // Tambahkan ini
  ]);

  const jenisWilayah = getJenisWilayah();

  const cleanProfileSite: ProfileSiteProps | null = 
        (profilSiteData && !('error' in profilSiteData)) ? profilSiteData : null;

    // Gabungkan data untuk komponen Layanan
    const layananComponentData = {
        profilSite: cleanProfileSite, // Gunakan variabel yang sudah bersih
        layanan: layananData,
        layananKota: layananKotaData,
        jenisWilayah: jenisWilayah,
    };

  const beritaComponentData = {
        berita: beritaData,
        beritaKota: beritaKotaData,
    };

  return (

    <HydrationOverlay>
      <main>
        <Slider data={sliderData} />
        <Widget data={widgetData} />
        <Layanan data={layananComponentData} />
        <section className="lg:py-20 lg:px-20 py-5 px-4">
          <div className="lg:flex mb-4">
            <Suspense fallback={<div>Loading Section...</div>}>
                <Infografis />
                <Dokumen />
            </Suspense>
          </div>
        </section>
        <section className="py-5 px-4 lg:py-8 lg:px-20 bg-teal-50 dark:bg-jacarta-800">
          <div className="lg:flex">
            <Suspense fallback={<div>Loading Content...</div>}>
              <Sosmed />
              <Government />
            </Suspense>
          </div>
        </section>
        <section className="py-5 px-4 lg:py-24 lg:px-20 pt-10">
          <div className="">
            <div className="lg:flex mb-4">
            <Suspense fallback={<div>Loading Content...</div>}>
              <Pengumuman />
              <Agenda />
            </Suspense>
            </div>
          </div>
        </section>
        <Suspense fallback={<div>Loading Content...</div>}>
          {/* <Komoditas /> */}
          {/* <Potensi /> */}
          <Berita data={beritaComponentData} />
          <ModalPengumuman />
          <ModalSearchBerita />
        </Suspense>
      </main>
    </HydrationOverlay>
  );
}
