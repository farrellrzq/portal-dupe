import { consoleError, API_CMS, API_DSW } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { getTokenDsw } from "@/helpers/site";
import { 
  BeritaKelurahanProps,
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

let domainSiteCache: Awaited<ReturnType<typeof getDomainSite>> | null = null;

async function getCachedDomainSite() {
  if (!domainSiteCache) {
    domainSiteCache = await getDomainSite();
  }
  return domainSiteCache;
}

export async function getSlider(): Promise<SliderProps[]> {
  try {
    const { Id } = await getCachedDomainSite();
    const result = await api({ 
      url: `${API_CMS}/ViewPortal/getSlider?siteId=${Id}&typeId=SL01&status=ST01&fileType=FL02`,
      revalidate: 60
    });
    
    return result.error ? [] : result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getSlider()', errorMessage);
    return [];
  }
}

export async function getLayanan(): Promise<LayananProps[]> {
  try {
    const { Id } = await getCachedDomainSite();
    const result = await api({
      url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&kanalType=K010&limit=&offset=&category=&slug=&key=&groupId=Aplikasi`,
      revalidate: 300
    });
    
    return result.error ? [] : result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getLayanan()', errorMessage);
    return [];
  }
}

export async function getLayananKota(): Promise<LayananKotaProps[]> {
  try {
    const result = await api({
      url: `${API_CMS}/ViewPortal/getExLink?siteId=2&typeId=LM&limit=8`,
      revalidate: 3600
    });
    
    return result.error ? [] : result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getLayananKota()', errorMessage);
    return [];
  }
}

export async function getInfografis(): Promise<InfografisProps[]> {
  try {
    const token = await getTokenDsw();
    console.log("Token:", token);

    const result = await api({
      url: "https://api-cms.ciptadrasoft.com/api/Slider?siteId=2&typeId=SL01&status=ST01&fileType=FL02",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      revalidate: 600,
    });

    const sliders = result;

    return sliders.Data.Slider;
  } catch (error) {
    console.error("Error in getInfografis:", error);
    return [];
  }
}


export async function getDokumen(): Promise<DokumenProps[]> {
  try {
    const { Id } = await getCachedDomainSite();
    const result = await api({
      url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010&limit=3`,
      revalidate: 300
    });
    
    return result.error ? [] : result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getDokumen()', errorMessage);
    return [];
  }
}

export async function getPengumuman(): Promise<PengumumanProps[]> {
  try {
    const { Id } = await getCachedDomainSite();
    const result = await api({
      url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008`,
      revalidate: 300
    });
    
    return result.error ? [] : result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getPengumuman()', errorMessage);
    return [];
  }
}

export async function getKomoditas(): Promise<KomoditasProps[]> {
  try {
    const result = await api({
      url: `https://dsw.depok.go.id/api/komoditas/harga_depok`,
      revalidate: 3600
    });
    
    return result.error ? [] : result.data || [];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getKomoditas()', errorMessage);
    return [];
  }
}

export async function getPotensi(): Promise<PotensiProps[]> {
  try {
    const { Id } = await getCachedDomainSite();
    const result = await api({
      url: `${API_CMS}/ViewPortal/getPlace?siteId=${Id}`,
      revalidate: 600
    });
    
    return result.error ? [] : result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getPotensi()', errorMessage);
    return [];
  }
}

export async function getBeritaKota(): Promise<BeritaKotaProps[]> {
  try {
    const apiKey = 'uXZo1DhiZ06MFmXhvDTdpTFvO30MsPEN70IUTMpkEPiM0dqN4J50YELUqb7lo6XW';
    if (!apiKey) throw new Error("BERITA_API_KEY is not defined");

    const result = await api({
      url: `https://berita.depok.go.id/api/v1/latest/3`,
      headers: { 'x-api-key': apiKey },
      revalidate: 300
    });

    return result.error ? [] : result.data || [];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getBeritaKota()', errorMessage);
    return [];
  }
}


export async function getBerita({ limit }: { limit: string }): Promise<BeritaProps[]> {
  try {
    const { Id } = await getCachedDomainSite();
    const result = await api({
      url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=${limit}`,
      revalidate: 300
    });
    
    return result.error ? [] : result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getBerita()', errorMessage);
    return [];
  }
}

let authToken: string | null = null;

export async function getToken() {
  if (authToken) return { token: authToken, url: process.env.NEXT_PUBLIC_DWURL };

  try {
    const response = await api({
      url: `${process.env.NEXT_PUBLIC_DWURL}/api/auth`,
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Email: process.env.NEXT_PUBLIC_DWUSR,
        Password: process.env.NEXT_PUBLIC_DWPASS
      })
    });

    if (response.error) throw new Error(response.error);
    
    authToken = response.data.token;
    return { token: authToken, url: process.env.NEXT_PUBLIC_DWURL };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getToken()', errorMessage);
    throw error;
  }
}

export async function getWidgetData() {
  try {
    const [{ Kecamatan }, { token, url }] = await Promise.all([
      getCachedDomainSite(),
      getToken()
    ]);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const [demography, disease, penyakitData] = await Promise.all([
      api({
        url: `${url}/api/kependudukan/aggpenduduk/perjkel`,
        method: "POST",
        headers,
        body: JSON.stringify({ tahun: '2025', kecamatan: Kecamatan })
      }),
      api({
        url: `${url}/api/kesehatan/aggkesehatan/penyakitperjkel`,
        method: "POST",
        headers,
        body: JSON.stringify({ tahun: '2025', kecamatan: Kecamatan })
      }),
      api({
        url: 'https://dsw.depok.go.id/html/penyakitdata/',
        revalidate: 3600
      })
    ]);

    const processedData = processWidgetData(demography, disease, penyakitData);
    return { ...processedData, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    consoleError('getWidgetData()', errorMessage);
    return { 
      total: 0, 
      totalMale: 0, 
      totalFemale: 0, 
      totalPenyakit: 0, 
      sorten: '0', 
      yearPenduduk: null, 
      dataPenyakit: [], 
      PenyakitName: [],
      error: errorMessage 
    };
  }
}

function processWidgetData(demography: any, disease: any, penyakitData: any) {
  const kepen = demography.data || [];
  const diseaseData = disease.data || [];
  const jumlahPenyakit = penyakitData.data || [];

  const yearPenduduk = kepen[0]?.tahun || null;
  const perjenis = groupPerjkel(kepen);
  
  return {
    total: sumJumlah(kepen),
    totalMale: sumJumlah(perjenis['Laki - Laki']),
    totalFemale: sumJumlah(perjenis['Perempuan']),
    totalPenyakit: sumJumlah(diseaseData),
    sorten: formatterNumber(Math.min(...jumlahPenyakit.map((i: any) => i.total))),
    yearPenduduk,
    dataPenyakit: jumlahPenyakit,
    PenyakitName: jumlahPenyakit.map((i: any) => i.penyakit)
  };
}

export function sumJumlah(data: any[] = []): number {
  return data.reduce((acc, obj) => {
    const value = obj.jumlah || obj.total || 0;
    return acc + parseInt(value, 10);
  }, 0);
}

export function groupPerjkel(data: any[] = []): Record<string, any[]> {
  return data.reduce((acc, item) => {
    const key = item.jenis_kelamin || 'unknown';
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function formatterNumber(num: number): string {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}