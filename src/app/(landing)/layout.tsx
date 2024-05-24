import "../globals.css";
import "../portal.css";
import Header from "@/components/dashboard/header/Header";
import Script from "next/script";
import Footer from "@/components/dashboard/footer/Footer";
import { getProfileSite } from "@/controllers/Controller";
import GTranslate from "../(menu)/components/gtranslate";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profilSite = await getProfileSite();
  return (
    <html lang="en">
      <head>
        <title>{profilSite?.Name ? profilSite.Name : "Portal Perangkat Daerah"}</title>
        <meta name="description" content={profilSite?.Description ? profilSite.Description : "Portal Perangkat Daerah"} />
        <link rel="icon" href="/img/depok-fav.ico" sizes="any" />
        <link rel="stylesheet" href="/css/style.css" />
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
  )
}
