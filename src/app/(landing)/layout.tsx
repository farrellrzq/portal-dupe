import { getProfileSite } from "@/controllers/Controller";
import { ProfileSiteProps } from "@/controllers/types/controller.type";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const profilSite = await getProfileSite();

    // Type Guard untuk memastikan `profilSite` adalah data yang valid
    const cleanProfileSite: ProfileSiteProps | null =
        (profilSite && !('error' in profilSite)) ? profilSite : null;

    return (
        <html>
            <head>
                <title>{cleanProfileSite?.Name ?? "Portal Kecamatan Kota Depok"}</title>
                <meta name="description" content={cleanProfileSite?.Description ?? "Selamat datang di Portal Kecamatan Kota Depok"} />
                <link rel="shortcut icon" href="/img/kecamatan/depok-fav.png" sizes="any" />
                <link rel="stylesheet" href="/css/style.css" />
            </head>
            <body className="bg-white">
                <HydrationOverlay>
                    {children}
                </HydrationOverlay>
                <script src="/js/darkMode.bundle.js" defer></script>
                <script src="/js/app.bundle.js" defer></script>
            </body>
        </html>
    )
}

