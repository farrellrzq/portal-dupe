import { headers } from 'next/headers';
import { unstable_cache } from 'next/cache'; // 1. IMPORT FUNGSI CACHING
import {
    CmsContentProps,
    CategoryProps,
    DomainSiteProps,
    ExlinkProps,
    ProfileSiteProps,
    VisitProps
} from './types/controller.type';
import { consoleError, API_CMS } from '@/helpers/site';
import { LandingProps } from './types/landing-controller.type';
import { isBrowser, isMobile } from 'react-device-detect';
import { execSync } from 'child_process';

// --- API Function & Helpers dari kode lama Anda ---
interface ApiProps {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    revalidate?: number;
    body?: BodyInit | null;
    useAuth?: boolean;
}
type ApiResponse = { error: string } | any;

// !! PERINGATAN PENTING !!
// Fungsi 'api' ini mengandung 'localStorage' dan 'window'.
// Ini akan menyebabkan ERROR jika dipanggil dari Server Component (seperti di page.tsx).
// Kode ini hanya akan berfungsi jika dipanggil dari komponen dengan "use client".
export async function api({ url, method = "GET", headers = {}, revalidate = 30, useAuth = false, body }: ApiProps): Promise<ApiResponse> {
    try {
        if (!url) {
            throw new Error("URL is required for the API call.");
        }

        let authHeaders = { ...headers };

        // Logika ini hanya berjalan di browser, bukan di server
        if (typeof window !== 'undefined' && useAuth) {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found. Please login.");
            }
            authHeaders.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(url, {
            method,
            headers: authHeaders,
            body,
            next: {
                revalidate,
            },
        });

        if (!res.ok) {
            console.error(`HTTP Error: ${res.status} ${res.statusText}`);
            if (res.status === 401 && typeof window !== 'undefined') {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return { error: `Authentication failed. Please login.` };
            }
            const errorText = await res.text();
            return { error: `Request failed with status ${res.status} - ${errorText || res.statusText}` };
        }

        const textResponse = await res.text();
        if (textResponse.trim() === "") {
            // Mengembalikan null untuk respons kosong agar tidak error
            return null;
        }

        return JSON.parse(textResponse);
    } catch (error) {
        console.error('There was an error:', error);
        const msg = getErrorMessage(error);
        return { error: msg };
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (error && typeof error === "object" && "message" in error) return String((error as any).message);
    if (typeof error === "string") return error;
    return "Something went wrong!";
}

export function getJenisWilayah(): 'kelurahan' | 'kecamatan' | 'wilayah' {
    const envWilayah = process.env.JENIS_WILAYAH?.trim().toLowerCase();
    if (envWilayah === 'kelurahan' || envWilayah === 'kecamatan') {
        return envWilayah;
    }
    try {
        const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().toLowerCase();
        if (branch.includes('kel')) return 'kelurahan';
        if (branch.includes('kec')) return 'kecamatan';
    } catch (err) {
        console.warn("Could not get git branch", err);
    }
    return 'wilayah';
}


// --- FUNGSI DOMAIN DAN PROFIL DENGAN CACHING YANG BENAR ---

// 2. Fungsi ini dinamis, JANGAN di-cache.
async function getDomain() {
    const headersList = headers();
    const domain = headersList.get('x-forwarded-host') || headersList.get('host');

    // **TRIK UNTUK DEVELOPMENT LOKAL**
    // Jika sedang berjalan di 'localhost', paksa gunakan domain yang valid.
    // Di server production, ia akan menggunakan domain asli.
    if (domain?.includes('localhost')) {
        console.log("Lingkungan development terdeteksi, menggunakan domain 'beji.depok.go.id'");
        return 'beji.depok.go.id';
    }

    return domain || 'beji.depok.go.id'; // Fallback untuk kasus lain
}

// 3. Buat fungsi terpisah yang BISA di-cache karena inputnya (domain) statis.
const getCachedDomainSite = unstable_cache(
    async (domain: string): Promise<DomainSiteProps | { error: string }> => {
        console.log(`CACHE MISS: Mengambil data domain untuk [${domain}]...`);
        // Gunakan revalidate yang lebih lama untuk data yang jarang berubah
        return await api({ url: `${API_CMS}/ViewPortal/domainsite?domain=${domain}`, revalidate: 86400 });
    },
    ['domain-site-data'],
    { revalidate: 86400 } // Cache hasil selama 24 jam
);

// 4. Fungsi `getDomainSite` yang Anda panggil sekarang menjadi jembatan.
export async function getDomainSite() {
    const domain = await getDomain(); // Mengambil data dinamis
    const result = await getCachedDomainSite(domain); // Memasukkannya ke fungsi cache

    if (result && 'error' in result) {
        // Lemparkan error agar pemanggilan berikutnya berhenti, ini mencegah error "cannot read property of null"
        throw new Error(result.error);
    }

    return result as DomainSiteProps;
}

// Terapkan pola yang sama untuk getProfileSite
const getCachedProfileSite = unstable_cache(
    async (siteId: string): Promise<ProfileSiteProps | null | { error: string }> => {
        console.log(`CACHE MISS: Mengambil data profil untuk siteId [${siteId}]...`);
        const result = await api({ url: `${API_CMS}/ViewPortal/profilsite?siteId=${siteId}`, revalidate: 86400 });
        if (!result || (result && 'error' in result)) {
            consoleError('getCachedProfileSite()', result?.error || 'Hasil API kosong');
            return null; // Kembalikan null jika gagal
        }
        return result[0];
    },
    ['profile-site-data'],
    { revalidate: 86400 }
);

export async function getProfileSite() {
    // try...catch untuk menangani error dari getDomainSite
    try {
        const { Id } = await getDomainSite();
        return await getCachedProfileSite(Id);
    } catch (error) {
        console.error("Gagal mendapatkan domain site, proses getProfileSite dibatalkan.", error);
        return null; // Kembalikan null jika getDomainSite gagal
    }
}


// --- FUNGSI LAINNYA (Tidak perlu diubah, akan otomatis menggunakan versi cache) ---

export async function getSiteData() {
    const { Id } = await getDomainSite();
    return Id;
}

export async function getKecamatan() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/getSiteByKecamatan?siteId=${Id}` });
        if (result && 'error' in result) {
            consoleError('getKecamatan()', result.error);
            return null;
        }
        return result as LandingProps[] | null;
    } catch (error) {
        console.error("Gagal menjalankan getKecamatan:", error);
        return null;
    }
}

export async function getExLink() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=${Id}&code=&groupId=&typeId=EP&limit=3&offset=` });
        if (result && 'error' in result) {
            consoleError('getExLink()', result.error);
            return null;
        }
        return result as ExlinkProps[] | null;
    } catch (error) {
        console.error("Gagal menjalankan getExLink:", error);
        return null;
    }
}

export async function getBerita({ limit = '5' }: { limit?: string } = {}) { // Tambahkan parameter limit
    try {
        const { Id } = await getDomainSite();
        // Tambahkan `&limit=${limit}` ke URL
        const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=${limit}` });
        if (result && 'error' in result) {
            consoleError('getBerita()', result.error);
            return [];
        }
        return result ? result : [];
    } catch (error) {
        console.error("Gagal menjalankan getBerita:", error);
        return [];
    }
}


export async function getVisit() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/getPengunjung?siteid=${Id}`, revalidate: 3600 });
        if (result && 'error' in result) {
            console.error('getVisit()', result.error);
            return null;
        }
        return result as VisitProps;
    } catch (error) {
        console.error("Gagal menjalankan getVisit:", error);
        return null;
    }
}

export async function getCategories({ kanalType }: { kanalType: 'K001' | 'K008' }): Promise<CategoryProps[] | null> {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/ContentCategory?siteId=${Id}&status=ST01&kanalType=${kanalType}&Id=` });
        if (result && 'error' in result) {
            consoleError('getCategories()', result.error);
            return null;
        }
        return result;
    } catch (error) {
        console.error("Gagal menjalankan getCategories:", error);
        return null;
    }
}

// // Fungsi ini sangat bergantung pada client-side, sebaiknya tidak digunakan di server component.
// export async function getVisitAgent() {
//     if (typeof window === 'undefined') return null; // Guard clause for server-side
//     // ...
// }