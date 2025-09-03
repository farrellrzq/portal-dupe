import { consoleError, API_CMS, API_DSW, getTokenDsw } from "@/helpers/site";
import { api, getDomainSite, getProfileSite } from "./Controller";
import {
    BeritaKotaProps,
    BeritaProps,
    DokumenProps,
    InfografisProps,
    KomoditasProps,
    LayananKotaProps,
    LayananProps,
    PengumumanProps,
    PotensiProps,
    SliderProps
} from "./types/home-controller.type";
import { ProfileSiteProps } from "./types/controller.type";

// Helper function to safely get an error message from an unknown type
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

// --- FUNGSI-FUNGSI STANDAR ---
export async function getSlider() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/getSlider?siteId=${Id}&typeId=SL01&status=ST01&fileType=FL02` });
        return (result && !result.error) ? result as SliderProps[] : [];
    } catch (e) {
        consoleError('getSlider', getErrorMessage(e));
        return [];
    }
}

export async function getLayanan() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&kanalType=K010&limit=&offset=&category=&slug=&key=&groupId=Aplikasi` });
        return (result && !result.error) ? result as LayananProps[] : [];
    } catch (e) {
        consoleError('getLayanan', getErrorMessage(e));
        return [];
    }
}

export async function getLayananKota() {
     try {
        const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&slug=` });
        return (result && !result.error) ? result as LayananKotaProps[] : [];
    } catch (e) {
        consoleError('getLayananKota', getErrorMessage(e));
        return [];
    }
}

export async function getInfografis(): Promise<InfografisProps[]> {
    try {
        const token = await getTokenDsw();
        const result = await api({
            url: "https://cmsdsw.depok.go.id/api/api/Slider?Status=ST01&GroupSlider=SL01",
            headers: { Authorization: `Bearer ${token}` },
            revalidate: 3600,
        });
        return result?.Data?.Slider || [];
    } catch (error) {
        consoleError("getInfografis", getErrorMessage(error));
        return [];
    }
}

export async function getDokumen() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010&limit=3&groupId=Dokumen` });
        return (result && !result.error) ? result as DokumenProps[] : [];
    } catch (e) {
        consoleError('getDokumen', getErrorMessage(e));
        return [];
    }
}

export async function getPengumuman() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008` });
        return (result && !result.error) ? result as PengumumanProps[] : [];
    } catch (e) {
        consoleError('getPengumuman', getErrorMessage(e));
        return [];
    }
}

export async function getAgenda() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K007` });
        return (result && !result.error) ? result : [];
    } catch (e) {
        consoleError('getAgenda', getErrorMessage(e));
        return [];
    }
}

export async function getBerita(p0: { limit: string; }) {
    try {
        const { limit } = p0;
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/get_content_publikasi?siteId=${Id}&status=ST01&kanalType=K001&limit=${limit}` });
        return (result && !result.error) ? result as BeritaProps[] : null;
    } catch (e) {
        consoleError('getBerita', getErrorMessage(e));
        return null;
    }
}

export async function getBeritaKota(): Promise<BeritaKotaProps[]> {
    try {
        const apiKey = 'uXZo1DhiZ06MFmXhvDTdpTFvO30MsPEN70IUTMpkEPiM0dqN4J50YELUqb7lo6XW';
        const result = await api({
            url: `https://berita.depok.go.id/api/v1/latest/3`,
            headers: { 'x-api-key': apiKey },
            revalidate: 1800
        });
        return result.error ? [] : result.data || [];
    } catch (error) {
        consoleError('getBeritaKota()', getErrorMessage(error));
        return [];
    }
}

export async function getKomoditas() {
    try {
        const result = await api({ url: `https://dsw.depok.go.id/api/komoditas/harga_depok` });
        return (result && !result.error) ? result.data as KomoditasProps[] : [];
    } catch (e) {
        consoleError('getKomoditas', getErrorMessage(e));
        return [];
    }
}

export async function getPotensi() {
    try {
        const { Id } = await getDomainSite();
        const result = await api({ url: `${API_CMS}/ViewPortal/getPlace?siteId=${Id}` });
        return (result && !result.error) ? result as PotensiProps[] : [];
    } catch (e) {
        consoleError('getPotensi', getErrorMessage(e));
        return [];
    }
}

// --- FUNGSI WIDGET DENGAN PENANGANAN ERROR DAN DATA DUMMY ---

export async function getToken() {
    // ... (Fungsi getToken tetap sama, tidak perlu diubah)
    try {
        const url = process.env.NEXT_PUBLIC_DWURL;
        const user = process.env.NEXT_PUBLIC_DWUSR;
        const password = process.env.NEXT_PUBLIC_DWPASS;
        const response = await fetch(`${url}/api/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: user, Password: password }),
            next: { revalidate: 43200 }
        });
        if (!response.ok) throw new Error(`Gagal mengambil token DSW: ${response.statusText}`);
        const data = await response.json();
        return { token: data.data.token, url };
    } catch (error) {
        console.error('Error in getToken:', error);
        throw error;
    }
}

async function fetchDataWithToken(endpoint: string, payload: object, token: string, url: string) {
    // ... (Fungsi fetchDataWithToken tetap sama)
    const response = await fetch(`${url}/api/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        next: { revalidate: 86400 }
    });
    if (!response.ok) throw new Error(`Gagal fetch data dari endpoint: ${endpoint}`);
    return response.json();
}

export async function getWidgetData() {
    if (process.env.NODE_ENV === 'development') {
        console.log("Mode development: Menggunakan data widget dummy untuk mempercepat loading.");
        return {
            total: '2.156.789',
            totalMale: '1.078.345',
            totalFemale: '1.078.444',
            totalPenyakit: '5.432',
            sorten: 'Infeksi Saluran Pernapasan Akut (ISPA)',
            yearPenduduk: new Date().getFullYear(),
        };
    }

    try {
        const profileSite = await getProfileSite();
        if (!profileSite || 'error' in profileSite) {
            console.warn("Data profileSite tidak tersedia atau error, proses widget dihentikan.");
            return { total: null, totalMale: null, totalFemale: null, totalPenyakit: null, sorten: null, yearPenduduk: null };
        }
        
        let token, url;
        try {
            const tokenData = await getToken();
            token = tokenData.token;
            url = tokenData.url;
        } catch (tokenError) {
            console.error("Gagal mendapatkan token DSW (timeout), proses widget dihentikan lebih awal.");
            return { total: null, totalMale: null, totalFemale: null, totalPenyakit: null, sorten: null, yearPenduduk: null };
        }

        const { Kecamatan } = await getDomainSite();
        const namaKelurahan = profileSite.Name.replace(/^Kelurahan\s+/i, '');
        const currentYear = new Date().getFullYear();
        
        const payloadPenduduk: any = { kecamatan: Kecamatan, tahun: currentYear.toString() };
        if (namaKelurahan) payloadPenduduk.kelurahan = namaKelurahan;
        const payloadPenyakit = { kecamatan: Kecamatan, tahun: currentYear.toString() };

        const [pendudukResponse, penyakitResponse] = await Promise.all([
            fetchDataWithToken('kependudukan/aggpenduduk/perjkel', payloadPenduduk, token, url!),
            fetchDataWithToken('kesehatan/aggkesehatan/penyakitperjkel', payloadPenyakit, token, url!)
        ]);

        const penduduk = pendudukResponse?.data || [];
        const penyakitRaw = penyakitResponse?.data || [];
        
        const penyakit = penyakitRaw.filter((item: any) => item.penyakit !== 'Penyakit Lain-Lainnya');
        
        const total = penduduk.reduce((acc: number, curr: any) => acc + parseInt(curr.jumlah || 0), 0);
        const totalMale = penduduk.filter((p: any) => p.jenis_kelamin === 'Laki - Laki').reduce((acc: number, curr: any) => acc + parseInt(curr.jumlah || 0), 0);
        const totalFemale = penduduk.filter((p: any) => p.jenis_kelamin === 'Perempuan').reduce((acc: number, curr: any) => acc + parseInt(curr.jumlah || 0), 0);

        const penyakitGrouped = penyakit.reduce((acc: any, item: any) => {
            acc[item.penyakit] = (acc[item.penyakit] || 0) + parseInt(item.jumlah || 0);
            return acc;
        }, {});

        const penyakitSorted = Object.entries(penyakitGrouped).sort(([, a]: any, [, b]: any) => b - a);
        
        return {
            total: total.toLocaleString('id-ID'),
            totalMale: totalMale.toLocaleString('id-ID'),
            totalFemale: totalFemale.toLocaleString('id-ID'),
            totalPenyakit: (penyakitSorted[0]?.[1] as number)?.toLocaleString('id-ID') ?? '0',
            sorten: (penyakitSorted[0]?.[0] as string) ?? 'Tidak ada data',
            yearPenduduk: currentYear,
        };

    } catch (error) {
        console.error('Terjadi error signifikan saat mengambil data widget:', getErrorMessage(error));
        return { total: null, totalMale: null, totalFemale: null, totalPenyakit: null, sorten: null, yearPenduduk: null };
    }
}

