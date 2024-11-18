import { getProfileSite } from "@/controllers/Controller";
import "../globals.css";
import "../portal.css";
import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const profilSite = await getProfileSite();
  return (
    <html>
      <head>
        <title>{profilSite?.Name ? profilSite.Name : "Kecamatan Depok"}</title>
        <meta name="description" content={profilSite?.Description ? profilSite.Description : "Kecamatan Depok"} />
        <link rel="shortcut icon" href="/img/depok-fav.ico" sizes="any" />
        <link rel="stylesheet" href="/css/style.css" />
        <script src="/js/darkMode.bundle.js"></script>
        <Script src="/js/app.bundle.js" strategy="afterInteractive" />
      </head>
      <body className="overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900">
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
