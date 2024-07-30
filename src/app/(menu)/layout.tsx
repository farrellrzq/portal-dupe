import "../globals.css";
import "../portal.css";
import Header from "@/components/dashboard/header/Header";
import Script from "next/script";
import Footer from "@/components/dashboard/footer/Footer";
import { getProfileSite } from "@/controllers/Controller";
import GTranslate from "./components/gtranslate";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profilSite = await getProfileSite();
  return (
    <html>
      <head>
        <title>{profilSite?.Name ? profilSite.Name : "Disdukcapil"}</title>
        <meta name="description" content={profilSite?.Description ? profilSite.Description : "Disdukcapil"} />
        <link rel="icon" href="/img/depok-fav.ico" sizes="any" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

        <script src="/js/darkMode.bundle.js"></script>

        <Script src="/js/app.bundle.js" strategy="afterInteractive" />
      </head>
      <body className="overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900">
        <GTranslate />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
