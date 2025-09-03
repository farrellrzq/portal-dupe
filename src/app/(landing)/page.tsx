import { getProfileSite } from "@/controllers/Controller";
import { getLanding } from "@/controllers/LandingController";
import Content from "./content";
import ModalLanding from "./modal";
import WeatherData from "./components/weather";
import Link from 'next/link'
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import GTranslate from "./components/gtranslate";
import { ProfileSiteProps } from "@/controllers/types/controller.type";

export default async function Home() {
    const profilSite = await getProfileSite();
    const getKecamatan = await getLanding();
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('id-ID', options);

    // Type Guard untuk memastikan `profilSite` adalah data yang valid
    const cleanProfileSite: ProfileSiteProps | null =
        (profilSite && !('error' in profilSite)) ? profilSite : null;

    return (
        <HydrationOverlay>
            <main>
                <section className="hero relative lg:pb-10 lg:pt-10">
                    <img src="/img/infografis/badge_789.png" className="fixed bottom-5 right-5 w-48 z-50" alt="Sertifikat Elektronik Badge" />
                    <picture className="pointer-events-none absolute inset-x-0 bottom-[-31rem] top-0 -z-10 block dark:hidden">
                        <img src="/img/blog/Wallpaper Kecamatan Depok-02.png" alt="gradient" className="w-full h-full bg-cover object-cover" />
                    </picture>
                    <picture className="pointer-events-none absolute inset-x-0 bottom-[-31rem] top-0 -z-10 hidden dark:block">
                        <img src="/img/blog/Wallpaper Kecamatan Depok-03.png" alt="gradient" className="h-full w-full bg-cover object-cover" />
                    </picture>
                    <div className="absolute top-[11.7rem] left-48 lg:relative lg:top-0 lg:left-0 lg:ml-8 flex lg:xl:ml-12 lg:float-right lg:m-10 lg:mr-20">
                        <div>
                            <GTranslate />
                        </div>
                        <a
                            href="#"
                            className="js-dark-mode-trigger group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-sky-600 focus:border-transparent focus:bg-sky-600 dark:border-transparent dark:bg-white/[.15] dark:hover:bg-sky-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="dark-mode-light h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:hidden"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="dark-mode-dark hidden h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:block dark:fill-white"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                            </svg>
                        </a>
                    </div>

                    <div className="container">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="mb-5 font-display text-4xl text-jacarta-700 dark:text-white lg:text-4xl xl:text-5xl">
                                Hallo, Selamat Datang di Portal
                                <br />
                                <span className="text-green-600 text-2xl lg:text-4xl"> {cleanProfileSite?.Name ?? "Kecamatan Depok"}</span>
                            </h1>
                            <div className="flex justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 dark:text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                    />
                                </svg>
                                &nbsp;
                                <p className="mb-5 dark:text-jacarta-300 text-sm dark:text-white">
                                    Depok, {cleanProfileSite?.kecamatan ?? ""} {formattedDate}
                                </p>
                                &nbsp; &nbsp; &nbsp;
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 dark:text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                                    />
                                </svg>
                                &nbsp;
                                <p className="mb-5 dark:text-jacarta-300 text-sm dark:text-white">
                                    <WeatherData />
                                </p>
                            </div>
                            <Link
                                href="/home"
                                className="inline-block rounded-full bg-green-600 py-3 px-8 mt-20 lg:mt-0 text-center font-semibold text-white shadow-green-600-volume transition-all hover:bg-sky-600-dark"
                            >
                                Kunjungi Situs
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="relative px-6 sm:px-0">
                    <div className="swiper coverflow-slider !py-5">
                        <div className="swiper-wrapper">
                            <Content getKecamatan={getKecamatan} />
                        </div>
                    </div>

                    <div className="swiper-button-prev swiper-button-prev-4 group absolute top-1/2 left-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-jacarta-700 group-hover:fill-green-600"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
                        </svg>
                    </div>
                    <div className="swiper-button-next swiper-button-next-4 group absolute top-1/2 right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-jacarta-700 group-hover:fill-green-600"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                        </svg>
                    </div>
                </div>

                <ModalLanding />
            </main >
        </HydrationOverlay>
    );
}

