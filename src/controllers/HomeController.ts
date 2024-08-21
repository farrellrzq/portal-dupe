import { consoleError } from "@/helpers/site";
import { api, getDomain, getDomainSite } from "./Controller";
import { BeritaKelurahanProps, BeritaKotaProps, BeritaProps, DokumenProps, InfografisProps, KomoditasProps, LayananKotaProps, LayananProps, PengumumanProps, PotensiProps, SliderProps } from "./types/home-controller.type";

const API_CMS = process.env.API_CMS;
export async function getSlider() {
  const { Id } = await getDomainSite();
  let Slider: SliderProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getSlider?siteId=${Id}&typeId=SL01&status=ST01&fileType=FL02` });
  if ('error' in result) {
    consoleError('getSlider()', result.error);
  } else {
    Slider = result;
  }
  return Slider;
}

export async function getLayanan() {
  const { Id } = await getDomainSite();
  let Layanan: LayananProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&kanalType=K010&limit=&offset=&category=&slug=&key=&groupId=Aplikasi` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Layanan = result;
  }
  return Layanan;
}

export async function getLayananKota() {
  const { Id } = await getDomainSite();
  let LayananKota: LayananKotaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&slug=` });
  if ('error' in result) {
    consoleError('getExLink()', result.error);
  } else {
    LayananKota = result;
  }
  return LayananKota;
}

export async function getInfografis() {
  const { Id } = await getDomainSite();
  let Infografis: InfografisProps[] | null = null;
  const result = await api({ url: `https://dsw.depok.go.id/index.php/api/slider` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Infografis = result.data;
  }
  return Infografis;
}

export async function getDokumen() {
  const { Id } = await getDomainSite();
  let Dokumen: DokumenProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Dokumen = result;
  }
  return Dokumen;
}

export async function getPengumuman() {
  const { Id } = await getDomainSite();
  let Pengumuman: PengumumanProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Pengumuman = result;
  }
  return Pengumuman;
}

export async function getKomoditas() {
  const { Id } = await getDomainSite();
  let Komoditas: KomoditasProps[] | null = null;
  const result = await api({ url: `https://dsw.depok.go.id/api/komoditas/harga_depok` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Komoditas = result.data;
  }
  return Komoditas;
}

export async function getPotensi() {
  const { Id } = await getDomainSite();
  let Potensi: PotensiProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getPlace?siteId=${Id}&typeId=&limit=&offset=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Potensi = result;
  }
  return Potensi;
}

export async function getBeritaKota() {
  const { Id } = await getDomainSite();
  let BeritaKota: BeritaKotaProps[] | null = null;
  const result = await api({ url: `https://berita.depok.go.id/api/v1/berita` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    BeritaKota = result;
  }
  return BeritaKota;
}

export async function getBerita() {
  const { Id } = await getDomainSite();
  let Berita: BeritaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Berita = result;
  }
  return Berita;
}

export async function getBeritaKelurahan() {
  const { Id } = await getDomainSite();
  let BeritaKelurahan: BeritaKelurahanProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getContentByKecamatan?siteId=${Id}&status=&kanalType=K001&limit=&offset=&category=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    BeritaKelurahan = result;
  }
  return BeritaKelurahan;
}


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
  const { Kecamatan, Kelurahan } = await getDomainSite();

  try {
    const { token, url } = await getToken();
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ tahun: '2023' })
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
    throw error;
  }
}

export function sumJumlah(data: any) {
  if (!Array.isArray(data) || data.length === 0) {
    return 0;
  }

  const total = data.reduce((acc: number, obj: any) => {
    const jumlah = obj.jumlah ? parseInt(obj.jumlah) : parseInt(obj.total);
    return acc + jumlah;
  }, 0);

  return total;
}

function groupPerjkel(data: any) {
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
}


export function formatterNumber(num: any) {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}


