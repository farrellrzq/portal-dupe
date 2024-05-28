import React from 'react'
import HeaderMenu from './header-menu'
import { getMenu } from '@/controllers/PublikasiController';

export default async function HeaderNav() {
  const menu = await getMenu();
  return (
    <nav className="navbar w-full">
      <ul className="flex flex-col lg:flex-row">
        <li className="js-nav-dropdown group relative">
          <a href="#"
            className="dropdown-toggle flex items-center py-3.5 font-display text-sm text-jacarta-600 hover:text-green-600 dark:text-white lg:px-3"
            id="navDropdown-4" aria-expanded="false" role="button" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
              style={{ marginTop: "-2px" }}>
              <path fillRule="evenodd"
                d="M4 16.5v-13h-.25a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5H16v13h.25a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v2.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H4zm3-11a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM7.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM11 5.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm.5 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z"
                clipRule="evenodd" />
            </svg>
            &nbsp; Profil
          </a>
          <ul
            className="dropdown-menu group-hover:visible lg:invisible left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
            aria-labelledby="navDropdown-4">
            <li>
              <a href="/profil/#tentang-kami"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600" data-href="#tentang-kami-tab">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Tentang Kami</span>
              </a>
            </li>
            <li>
              <a href="/profil/#visi"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600" data-href="#visi-tab">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Visi & Misi</span>
              </a>
            </li>
            <li>
              <a href="/profil/#landasan"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600" data-href="#landasan-tab">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Landasan Hukum</span>
              </a>
            </li>
            <li>
              <a href="/profil/#struktur"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600" data-href="#struktur-tab">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Struktur Organisasi</span>
              </a>
            </li>
            <li>
              <a href="/profil/#tupoksi"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600" data-href="#tupoksi-tab">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Tugas Pokok & Fungsi</span>
              </a>
            </li>
            <li>
              <a href="/profil/#maklumat"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600" >
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Maklumat Pelayanan</span>
              </a>
            </li>
            <li>
              <a href="/profil/#motto"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600" >
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Motto Pelayanan</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="js-nav-dropdown group relative">
          <a href="#"
            className="dropdown-toggle flex items-center py-3.5 font-display text-sm text-jacarta-700 hover:text-green-600 dark:text-white lg:px-3 "
            id="navDropdown-4" aria-expanded="false" role="button" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
              style={{ marginTop: "-2px" }}>
              <path fillRule="evenodd"
                d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z"
                clipRule="evenodd" />
            </svg>
            &nbsp; Informasi Publik
          </a>
          <ul
            className="dropdown-menu group-hover:visible lg:invisible left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
            aria-labelledby="navDropdown-4">
            <li>
              <a href="/informasi-publik/informasi-berkala"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Informasi Secara Berkala</span>
              </a>
            </li>
            <li>
              <a href="/informasi-publik/informasi-serta-merta"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Informasi Serta Merta</span>
              </a>
            </li>
            <li>
              <a href="/informasi-publik/informasi-setiap-saat"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Informasi Setiap Saat</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="js-nav-dropdown group relative">
          <a href="#"
            className="dropdown-toggle flex items-center py-3.5 font-display text-sm text-jacarta-700 hover:text-green-600 dark:text-white lg:px-3 "
            id="navDropdown-4" aria-expanded="false" role="button" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
              style={{ marginTop: "-2px" }}>
              <path fillRule="evenodd"
                d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.06a.75.75 0 011.06 0zM3 8a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 8zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 8zm-6.828 2.828a.75.75 0 010 1.061L6.11 12.95a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm3.594-3.317a.75.75 0 00-1.37.364l-.492 6.861a.75.75 0 001.204.65l1.043-.799.985 3.678a.75.75 0 001.45-.388l-.978-3.646 1.292.204a.75.75 0 00.74-1.16l-3.874-5.764z"
                clipRule="evenodd" />
            </svg>
            &nbsp;
            Layanan
          </a>
          <ul
            className="dropdown-menu group-hover:visible lg:invisible left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
            aria-labelledby="navDropdown-4">
            <li>
              <a href="/layanan/list-standar-layanan"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Standar Pelayanan</span>
              </a>
            </li>
            <li>
              <a href="/layanan/layanan-opd"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Layanan Perangkat Daerah</span>
              </a>
            </li>
            <li>
              <a href="/layanan/layanan-kota"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Layanan Kota</span>
              </a>
            </li>
            <li>
              <a href="/layanan/faq"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">FAQ</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="js-nav-dropdown group relative">
          <a href="#"
            className="dropdown-toggle flex items-center py-3.5 font-display text-sm text-jacarta-700 hover:text-green-600 dark:text-white lg:px-3 "
            id="navDropdown-4" aria-expanded="false" role="button" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
              style={{ marginTop: "-2px" }}>
              <path
                d="M13.92 3.845a19.361 19.361 0 01-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 00-.504 7.969 15.974 15.974 0 001.271 3.341c.397.77 1.342 1 2.05.59l.867-.5c.726-.42.94-1.321.588-2.021-.166-.33-.315-.666-.448-1.004 1.8.358 3.511.964 5.096 1.78A17.964 17.964 0 0015 10c0-2.161-.381-4.234-1.08-6.155zM15.243 3.097A19.456 19.456 0 0116.5 10c0 2.431-.445 4.758-1.257 6.904l-.03.077a.75.75 0 001.401.537 20.902 20.902 0 001.312-5.745 1.999 1.999 0 000-3.545 20.902 20.902 0 00-1.312-5.745.75.75 0 00-1.4.537l.029.077z" />
            </svg>
            &nbsp;
            Publikasi
          </a>
          <ul
            className="dropdown-menu group-hover:visible lg:invisible left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
            aria-labelledby="navDropdown-4">
            <li>
              <a href="/publikasi/dashboard-statistik"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Dashboard Statistik</span>
              </a>
            </li>
            <HeaderMenu menu={menu} />
            <li>
              <a href="/publikasi/agenda-kegiatan"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Agenda Kegiatan</span>
              </a>
            </li>
            <li>
              <a href="/publikasi/infografis"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Galeri Kegiatan</span>
              </a>
            </li>
            <li>
              <a href="/publikasi/dokumen"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Dokumen Produk</span>
              </a>
            </li>
            <li>
              <a href="/publikasi/pengumuman"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Pengumuman</span>
              </a>
            </li>
            <li>
              <a href="/publikasi/berita"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Berita & Artikel</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="group">
          <a href="https://esop.depok.go.id/home/survey" target="_blank"
            className="flex items-center py-3.5 font-display text-sm text-jacarta-700 hover:text-green-600 dark:text-white dark:hover:text-white dark:focus:text-white lg:px-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
              style={{ marginTop: "-2px" }}>
              <path
                d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
              <path
                d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
            </svg>
            &nbsp;
            Survey Kepuasan Masyarakat
          </a>
        </li>
        <li className="js-nav-dropdown group relative">
          <a href="#"
            className="dropdown-toggle flex items-center py-3.5 font-display text-sm text-jacarta-700 hover:text-green-600 dark:text-white lg:px-3 "
            id="navDropdown-4" aria-expanded="false" role="button" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
              style={{ marginTop: "-2px" }}>
              <path
                d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
            &nbsp;
            Hubungi
          </a>
          <ul
            className="dropdown-menu group-hover:visible lg:invisible left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
            aria-labelledby="navDropdown-4">
            <li>
              <a href="/hubungi/"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">Kontak Kami</span>
              </a>
            </li>
            <li>
              <a href="https://sigap.depok.go.id/report" target="_blank"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">SIGAP</span>
              </a>
            </li>
            <li>
              <a href="https://www.lapor.go.id/" target="_blank"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">LAPOR</span>
              </a>
            </li>
            <li>
              <a href="https://ppid.depok.go.id/" target="_blank"
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-green-600 focus:text-green-600 dark:hover:bg-jacarta-600">
                <span className="font-display text-sm text-jacarta-700 dark:text-white">PPID</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
