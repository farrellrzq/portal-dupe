import React from "react";
import ContentProfil from './contentProfil'
import ContentVisi from './contentVisi'
import ContentLandasan from './contentLandasan'
import ContentStruktur from './contentStruktur'
import ContentTupoksi from './contentTupoksi'
import ContentMaklumat from './contentMaklumat'
import ContentMotto from './contentMotto'
import ModalSearchBerita from '../modal/page'
import Tabcontent from "./tabContent";
import ContentImgSotk from "./contentImgSotk";
import type { Metadata } from "next";
import { getLandasan, getTupoksi, dataPegawai } from '@/controllers/ProfilController';

export const metadata: Metadata = {
  title: 'Profil Disnaker',
  description: 'Profil I Portal Disnaker Kota Depok',
};

export default async function page() {
  const landasan = await getLandasan();
  const tupoksi = await getTupoksi();
  const listPegawai = await dataPegawai();
  const pegawai = listPegawai.data.content;

  return (
    <main className="pt-[5.5rem] lg:pt-24">

      <section className="relative pt-24 bg-teal-50 dark:bg-transparent">
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:hidden">
          <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 block dark:hidden">
          <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
        </picture>
        <div className="">

          <Tabcontent />

          <div className="tab-content">
            {/* <!-- On Sale Tab --> */}
            <div className="tab-pane fade" id="tentang-kami" role="tabpanel">
              <ContentProfil />
            </div>
            {/* <!-- end on sale tab --> */}

            {/* <!-- Owned Tab --> */}
            <div className="tab-pane fade" id="visi" role="tabpanel">
              <ContentVisi />
            </div>
            {/* <!-- end owned tab --> */}

            {/* <!-- Created Tab --> */}
            <div className="tab-pane fade" id="landasan" role="tabpanel">
              <ContentLandasan landasan={landasan} />
            </div>
            {/* <!-- end created tab --> */}

            {/* <!-- Collections Tab --> */}
            <div className="tab-pane fade" id="struktur" role="tabpanel">
              <ContentImgSotk />
              <ContentStruktur pegawai={pegawai} />
            </div>
            {/* <!-- end collections tab --> */}

            {/* <!-- Activity Tab --> */}
            <div className="tab-pane fade" id="tupoksi" role="tabpanel">
              <ContentTupoksi tupoksi={tupoksi} />
            </div>
            {/* <!-- end activity tab --> */}

            {/* <!-- Collections Tab --> */}
            <div className="tab-pane fade" id="maklumat" role="tabpanel">
              <ContentMaklumat />
            </div>
            {/* <!-- end collections tab --> */}

            {/* <!-- Collections Tab --> */}
            <div className="tab-pane fade" id="motto" role="tabpanel">
              <ContentMotto />
            </div>
            {/* <!-- end collections tab --> */}
          </div>

        </div>
      </section>
      <ModalSearchBerita />
    </main>
  )
}
