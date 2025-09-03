import { getProfileSite } from '@/controllers/Controller';
import { ProfileSiteProps } from '@/controllers/types/controller.type'; // 1. Impor tipe data
import Link from 'next/link';
import React from 'react';
import HeaderNav from './header-nav';

export default async function HeaderContent() {
    const profileSite = await getProfileSite();

    // 2. Terapkan "Type Guard" untuk membersihkan data
    const cleanProfileSite: ProfileSiteProps | null =
        (profileSite && !('error' in profileSite)) ? profileSite : null;

    return (
        <>
            {/* 3. Gunakan variabel yang sudah aman */}
            <Link href="/" className="shrink-0">
                <img
                    src={
                        cleanProfileSite?.imageSite
                            ? `https://cms.depok.go.id/upload/profilesite/${cleanProfileSite.imageSite}`
                            : "/img/logo-opd.png"
                    }
                    className="max-h-[40px] block dark:hidden"
                    alt="Portal OPD Pemerintahan Kota Depok"
                />
                <img
                    src={
                        cleanProfileSite?.imageSite
                            ? `https://cms.depok.go.id/upload/profilesite/${cleanProfileSite.imageSite}`
                            : "/img/logo-opd.png"
                    }
                    className="hidden max-h-[40px] dark:block"
                    alt="Portal OPD Pemerintahan Kota Depok"
                />
            </Link>

            <div className="js-mobile-menu invisible lg:visible fixed inset-0 z-10 ml-auto items-center bg-white dark:bg-jacarta-800 lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent">
                <div className="t-0 fixed left-0 z-10 flex w-full items-center justify-between bg-white p-6 dark:bg-jacarta-800 lg:hidden">
                    <Link href="/" className="shrink-0">
                        <img
                            src={
                                cleanProfileSite?.imageSite
                                    ? `https://cms.depok.go.id/upload/profilesite/${cleanProfileSite.imageSite}`
                                    : "/img/logo-opd.png"
                            }
                            className="max-h-10 dark:hidden"
                            alt="Portal OPD Pemerintahan Kota Depok"
                        />
                        <img
                            src={
                                cleanProfileSite?.imageSite
                                    ? `https://cms.depok.go.id/upload/profilesite/${cleanProfileSite.imageSite}`
                                    : "/img/logo-opd.png"
                            }
                            className="hidden max-h-10 dark:block"
                            alt="Portal OPD Pemerintahan Kota Depok"
                        />
                    </Link>

                    <button
                        className="js-mobile-close group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-green-600 focus:border-transparent focus:bg-green-600 dark:border-transparent dark:bg-white/[.15] dark:hover:bg-green-600"
                        aria-label="close mobile menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                    </button>
                </div>

                <form action="search" className="relative mt-24 mb-8 w-full lg:hidden">
                    <input type="search" className="w-full rounded-2xl border border-jacarta-100 py-3 px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-green-600 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white" placeholder="Search" />
                    <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-4 w-4 fill-jacarta-500 dark:fill-white">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                        </svg>
                    </span>
                </form>

                <HeaderNav />

                <div className="mt-10 w-full lg:hidden">
                    <a href="#" className="js-wallet block w-full rounded-full bg-green-600 py-3 px-8 text-center font-semibold text-white shadow-green-600-volume transition-all hover:bg-green-600-dark" data-bs-toggle="modal" data-bs-target="#walletModal">
                        Cari Informasi
                    </a>
                    <hr className="my-5 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                </div>

                <div className="ml-8 hidden lg:flex xl:ml-24">
                    <a href="#" className="js-wallet group flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-green-600 focus:border-transparent focus:bg-green-600 dark:border-transparent dark:bg-white/[.15] dark:hover:bg-green-600 dark:text-white" data-bs-toggle="modal" data-bs-target="#walletModal" aria-label="wallet">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="dark-mode-light h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                        </svg>
                    </a>
                    <a href="#" className="js-dark-mode-trigger group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-green-600 focus:border-transparent focus:bg-green-600 dark:border-transparent dark:bg-white/[.15] dark:hover:bg-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="dark-mode-light h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-black group-focus:fill-black block dark:hidden">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="dark-mode-dark h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white hidden dark:block dark:fill-white">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    )
}
