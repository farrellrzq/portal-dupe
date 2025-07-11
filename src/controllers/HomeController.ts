import { consoleError, API_CMS, API_DSW, getTokenDsw } from "@/helpers/site";
import { api,  getDomainSite, getProfileSite } from "./Controller";
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

export async function getSlider() {
  const { Id } = await getDomainSite();
  let Slider: SliderProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/getSlider?siteId=${Id}&typeId=SL01&status=ST01&fileType=FL02` });

  if (result && typeof result === 'object' && 'error' in result) {
    consoleError('getSlider()', result.error);
  } else {
    Slider = result ? result : [];
  }
  
  return Slider;
}

export async function getLayanan() {
  const { Id } = await getDomainSite();
  let Layanan: LayananProps[] | null = null;
  
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&kanalType=K010&limit=&offset=&category=&slug=&key=&groupId=Aplikasi` });

  if (result && typeof result === 'object' && 'error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Layanan = result ? result : [];
  }

  return Layanan;
}

export async function getLayananKota() {
  let LayananKota: LayananKotaProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&slug=`});

  if (result && typeof result === 'object' && 'error' in result) {
    consoleError('getExLink()', result.error);
  } else {
    LayananKota = result ? result : [];
  }
  
  return LayananKota;
}

export async function getInfografis(): Promise<InfografisProps[]> {
  try {
    const token = await getTokenDsw();
    // console.log("Token:", token);

    const result = await api({
      url: "https://cmsdsw.depok.go.id/api/api/Slider?Status=ST01&GroupSlider=SL01",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      revalidate: 600,
    });
    // console.log(result);
    const sliders = result;

    return sliders.Data.Slider;
  } catch (error) {
    console.error("Error in getInfografis:", error);
    return [];
  }
}

export async function getDokumen() {
  const { Id } = await getDomainSite();
  let Dokumen: DokumenProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010&limit=3&groupId=Dokumen`});
  if (result && typeof result === 'object' && 'error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Dokumen = result ? result : [];
  }

  return Dokumen;
}

export async function getPengumuman() {
  const { Id } = await getDomainSite();
  let Pengumuman: PengumumanProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008`});
  if (result && typeof result === 'object' && 'error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Pengumuman = result ? result : [];
  }

  return Pengumuman;
}

export async function getKomoditas() {
  const { Id } = await getDomainSite();
  let Komoditas: KomoditasProps[] | null = null;
  const result = await api({ url: `https://dsw.depok.go.id/api/komoditas/harga_depok` });
  if (result && typeof result === 'object' && 'error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Komoditas = result.data;
  }
  return Komoditas;
}

export async function getPotensi() {
  const { Id } = await getDomainSite();
  let Potensi: PotensiProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getPlace?siteId=${Id}` });
  if (result && typeof result === 'object' && 'error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Potensi = result;
  }
  return Potensi;
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

export async function getBerita(p0: { limit: string; }) {
  const { limit } = p0;
  const { Id } = await getDomainSite();
  let Berita: BeritaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content_publikasi?siteId=${Id}&status=ST01&kanalType=K001&limit=${limit}` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Berita = result;
  }
  return Berita;
}


// export async function getBeritaKelurahan(p0: { limit: string; }) {
//   const { limit } = p0;
//   const { Id } = await getDomainSite();
//   let BeritaKelurahan: BeritaKelurahanProps[] | null = null;
//   const result = await api({ url: `${API_CMS}/ViewPortal/getContentByKecamatan?siteId=${Id}&kanalType=K001` });
//   if (result && typeof result === 'object' && 'error' in result) {
//     consoleError('get_content()', result.error);
//   } else {
//     BeritaKelurahan = result;
//   }
//   return BeritaKelurahan;
// }

export async function getToken() {
  try {
    const url = process.env.NEXT_PUBLIC_DWURL;
    const user = process.env.NEXT_PUBLIC_DWUSR;
    const password = process.env.NEXT_PUBLIC_DWPASS;

    const response = await fetch(`${url}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: user,
        Password: password
      })
    });

    if (!response.ok) {
      const errorMessage = `Fetching token failed with status: ${response.status}, ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const token = data.data.token;
    return { token, url };
  } catch (error) {
    console.error('Error in getToken:', error);
    throw error;
  }
}

// Modified By FR 20250710 - Hotfix widget
export async function getWidgetData() {
  const { Kecamatan } = await getDomainSite();
  const profileSite = await getProfileSite();

  // Gunakan fallback object jika data tidak tersedia
  if (!profileSite || !profileSite.Name) {
    console.warn("Data profileSite tidak tersedia");
    return {
      total: null,
      totalMale: null,
      totalFemale: null,
      totalPenyakit: null,
      sorten: null,
      yearPenduduk: null,
      namaKelurahan: null,
      dataPenyakit: [],
      PenyakitName: [],
      topPenyakit: []
    };
  }

  const namaKelurahan = profileSite.Name.replace(/^Kelurahan\s+/i, '');

  try {
    const currentYear = new Date().getFullYear();

    const [
      { data: penduduk, year: yearPenduduk },
      { data: penyakitRaw }
    ] = await Promise.all([
      _getLatestValidData(_getDataPenduduk, Kecamatan, currentYear, namaKelurahan),
      _getLatestValidData(_getDataPenyakit, Kecamatan, currentYear)
    ]);

    // Filter penyakit selain 'Penyakit Lain-Lainnya'
    const penyakit = penyakitRaw.filter(
      (item: any) => item.penyakit !== 'Penyakit Lain-Lainnya'
    );

    // Hitung jumlah total penduduk
    const perJenis = groupPerjkel(penduduk);
    const total = formatterNumber(sumJumlah(penduduk)); // aktifkan kembali
    const totalMale = formatterNumber(sumJumlah(perJenis['Laki - Laki'] ?? []));
    const totalFemale = formatterNumber(sumJumlah(perJenis['Perempuan'] ?? []));

    // Agregasi jumlah penyakit
    const penyakitGrouped: Record<string, number> = {};
    for (const item of penyakit as { penyakit: string; jumlah: string }[]) {
      const name = item.penyakit;
      const jumlah = parseInt(item.jumlah) || 0;
      penyakitGrouped[name] = (penyakitGrouped[name] || 0) + jumlah;
    }

    // Urutkan dan ambil penyakit terbanyak
    const penyakitSorted = Object.entries(penyakitGrouped)
      .map(([penyakit, jumlah]) => ({ penyakit, jumlah }))
      .sort((a, b) => b.jumlah - a.jumlah);

    const totalPenyakit = penyakitSorted[0]?.jumlah ?? 0;
    const sorten = penyakitSorted[0]?.penyakit ?? null;

    const PenyakitName = penyakit.map((item: any) => item.penyakit);

    return {
      total,
      totalMale,
      totalFemale,
      totalPenyakit: formatterNumber(totalPenyakit),
      sorten,
      yearPenduduk,
      namaKelurahan,
      dataPenyakit: penyakit,
      PenyakitName,
      topPenyakit: penyakitSorted.slice(0, 10)
    };

  } catch (error) {
    console.error('Error in getWidgetData:', error);

    return {
      total: null,
      totalMale: null,
      totalFemale: null,
      totalPenyakit: null,
      sorten: null,
      yearPenduduk: null,
      namaKelurahan,
      dataPenyakit: [],
      PenyakitName: [],
      topPenyakit: []
    };
  }
}


// Add By FR 20250710 - Hotfix widget
async function _getDataPenduduk(Kecamatan: string, year: string, namaKelurahan: string) {
  const { token, url } = await getToken();

  // Bangun body secara dinamis
  const bodyRequest: Record<string, any> = {
    tahun: year,
    kecamatan: Kecamatan
  };

  if (namaKelurahan && namaKelurahan.trim() !== "") {
    bodyRequest.kelurahan = namaKelurahan;
  }

  const response = await fetch(`${url}/api/kependudukan/aggpenduduk/perjkel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bodyRequest),
  });

  if (!response.ok) {
    throw new Error(`Gagal fetch data penduduk: ${response.status}`);
  }

  return await response.json();
}


// Add By FR 20250710 - Hotfix widget 
async function _getDataPenyakit(Kecamatan: string, year: string) {
  const { token, url } = await getToken();

  const bodyPayload = {
    tahun: year,
    kecamatan: Kecamatan
  };

  const response = await fetch(`${url}/api/kesehatan/aggkesehatan/penyakitperjkel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(bodyPayload)
  });

  if (!response.ok) {
    throw new Error(`Gagal fetch data penyakit: ${response.status}`);
  }

  return await response.json(); // akan mengandung .data
}

// Add By FR 20250710 - Hotfix widget
async function _getLatestValidData<T>(
  fetchFn: (...args: any[]) => Promise<{ data: T[] }>,
  kecamatan: string,
  startYear: number,
  extraArg?: any, // seperti namaKelurahan
  maxTries: number = 5
): Promise<{ data: T[], year: number }> {
  let currentYear = startYear;

  for (let i = 0; i < maxTries; i++) {
    try {
      const result = extraArg !== undefined
        ? await fetchFn(kecamatan, currentYear.toString(), extraArg)
        : await fetchFn(kecamatan, currentYear.toString());

      if (result?.data?.length > 0) {
        return { data: result.data, year: currentYear };
      }
    } catch (e) {
      console.warn(`Gagal mengambil data tahun ${currentYear}:`, e);
    }

    currentYear--;
  }

  console.warn(`Tidak ditemukan data valid dari ${startYear} ke belakang.`);
  return { data: [], year: startYear };
}





export function sumJumlah(data: any) {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      return 0;
    }

    const total = data.reduce((acc: number, obj: any) => {
      const jumlah = obj.jumlah ? parseInt(obj.jumlah) : parseInt(obj.total);
      return acc + jumlah;
    }, 0);

    return total;
  } catch (error) {
    console.error('Error in sumJumlah:', error);
    return 0; // Return default value in case of error
  }
}

export function groupPerjkel(data: any) {
  try {
    const groupedData: { [key: string]: typeof data } = {};

    if (!Array.isArray(data) || data.length === 0) {
      return groupedData;
    }

    data.forEach((item: any) => {
      const { jenis_kelamin, ...rest } = item;
      if (!groupedData[jenis_kelamin]) {
        groupedData[jenis_kelamin] = [];
      }
      groupedData[jenis_kelamin].push(rest);
    });

    return groupedData;
  } catch (error) {
    console.error('Error in groupPerjkel:', error);
    return {}; // Return default value in case of error
  }
}

export function formatterNumber(num: any) {
  try {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  } catch (error) {
    console.error('Error in formatterNumber:', error);
    return ''; // Return default value in case of error
  }
}