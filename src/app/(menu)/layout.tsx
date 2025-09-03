import "../globals.css";
import "../portal.css";
import Header from "@/components/dashboard/header/Header";
import Script from "next/script";
import Footer from "@/components/dashboard/footer/Footer";
import { getProfileSite } from "@/controllers/Controller";
import GTranslate from "./components/gtranslate";
import { ProfileSiteProps } from "@/controllers/types/controller.type"; // 1. Impor tipe data

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const profilSite = await getProfileSite();

    // 2. Terapkan "Type Guard" untuk membersihkan data
    const cleanProfileSite: ProfileSiteProps | null =
        (profilSite && !('error' in profilSite)) ? profilSite : null;

    return (
        <html>
            <head>
                {/* 3. Gunakan variabel yang sudah aman dengan fallback */}
                <title>{cleanProfileSite?.Name ?? "Portal OPD"}</title>
                <meta name="description" content={cleanProfileSite?.Description ?? "Portal Resmi OPD Kota Depok"} />
                <link rel="icon" href="/img/depok-fav.ico" sizes="any" />
                <link rel="stylesheet" href="/css/style.css" />
                <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
            </head>
            <body className="overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900">
                <GTranslate />
                <Header />
                {children}
                {/* Kirim data yang sudah bersih ke Footer juga jika diperlukan */}
                <Footer />

                {/* Pindahkan script ke akhir body untuk performa yang lebih baik */}
                <Script src="https://unpkg.com/swiper/swiper-bundle.min.js" strategy="beforeInteractive" />
                <Script src="/js/darkMode.bundle.js" strategy="lazyOnload" />
                <Script src="/js/app.bundle.js" strategy="lazyOnload" />
            </body>
        </html>
    );
}

