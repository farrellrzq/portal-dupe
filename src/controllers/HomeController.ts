import { consoleError, API_CMS, API_DSW, getTokenDsw } from "@/helpers/site";
import { api,  getDomainSite } from "./Controller";
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
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=${limit}` });
  if (result && typeof result === 'object' && 'error' in result) {
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

export async function getWidgetData() {
  const { Kecamatan } = await getDomainSite();

  try {
    const { token, url } = await getToken();
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ tahun: '2025', kecamatan: Kecamatan })
    };

    const [response, disease] = await Promise.all([
      fetch(`${url}/api/kependudukan/aggpenduduk/perjkel`, body),
      fetch(`${url}/api/kesehatan/aggkesehatan/penyakitperjkel`, body)
    ]);

    if (!response.ok || !disease.ok) {
      const errorMessage = `Fetching widget data failed with status: ${response.status}, ${disease.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const resdsw = await fetch('https://dsw.depok.go.id/html/penyakitdata/');
    if (!resdsw.ok) {
      const errorMessage = `Fetching penyakit data failed with status: ${resdsw.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const jumlahPenyakit = await resdsw.json();
    const dataPenyakit = jumlahPenyakit.data;
    const getHighest = dataPenyakit.map((item: any) => item.total);
    const sorten = formatterNumber(parseInt(getHighest.sort()[0]));

    const Penyakit = jumlahPenyakit.data;
    const getPenyakit = Penyakit.map((item: any) => item.penyakit);
    const PenyakitName = getPenyakit;

    const [dataAll, dataDisease] = await Promise.all([
      response.json(),
      disease.json()
    ]);

    const kepen = dataAll.data;
    const yearPenduduk = kepen && kepen.length > 0 ? kepen[0].tahun : null; // Kondisi untuk menangani data null
    const perjenis = groupPerjkel(kepen);
    const total = formatterNumber(sumJumlah(kepen));
    const totalPenyakit = formatterNumber(sumJumlah(dataDisease.data));
    const totalMale = formatterNumber(sumJumlah(perjenis['Laki - Laki']));
    const totalFemale = formatterNumber(sumJumlah(perjenis['Perempuan']));

    return { total, totalMale, totalFemale, totalPenyakit, sorten, yearPenduduk, dataPenyakit, PenyakitName };
  } catch (error) {
    console.error('Error in getWidgetData:', error);
    // Handle error here, for example return a default response
    return { total: null, totalMale: null, totalFemale: null, totalPenyakit: null, sorten: null, yearPenduduk: null, dataPenyakit: [], PenyakitName: [] };
  }
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