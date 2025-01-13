import { consoleError, API_CMS, API_DSW, API_BERITA_DEPOK } from "@/helpers/site";
import { api,  getDomainSite } from "./Controller";
import { 
  BeritaKotaProps, 
  BeritaProps, 
  DokumenProps, 
  InfografisProps,  
  LayananKotaProps, 
  LayananProps, 
  PengumumanProps, 
  SliderProps
} from "./types/home-controller.type";

export async function getSlider() {
  const { Id } = await getDomainSite();
  let Slider: SliderProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/getSlider?siteId=${Id}&typeId=SL01&status=ST01&fileType=FL02` });

  if ('error' in result) {
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

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Layanan = result ? result : [];
  }

  return Layanan;
}

export async function getLayananKota() {
  let LayananKota: LayananKotaProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&slug=`});

  if ('error' in result) {
    consoleError('getExLink()', result.error);
  } else {
    LayananKota = result ? result : [];
  }
  
  return LayananKota;
}

export async function getInfografis() {
  let Infografis: InfografisProps[] | null = null;

  
  const cachedKey=`infografis`;
  
  const result = await api({ url: `${API_DSW}/index.php/api/slider` });
  
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Infografis = result ? result.data : [];
  }

  return Infografis;
}

export async function getDokumen() {
  const { Id } = await getDomainSite();
  let Dokumen: DokumenProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010&limit=3`});
  if ('error' in result) {
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
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Pengumuman = result ? result : [];
  }

  return Pengumuman;
}

export async function getBeritaKota() {
  const apiKey = 'uXZo1DhiZ06MFmXhvDTdpTFvO30MsPEN70IUTMpkEPiM0dqN4J50YELUqb7lo6XW';
  let BeritaKota: BeritaKotaProps[] | null = null;

  const result = await api({
    url: `https://berita.depok.go.id/api/v1/latest/10`,
    headers: {
      'x-api-key': apiKey, // Masukkan API key di header
    },
  });

  if ('error' in result) {
    console.error('get_content()', result.error);
  } else {
    BeritaKota = result.data;
  }

  return BeritaKota;
}

export async function getBerita(p0: { limit: string; }) {
  const { limit } = p0;
  const { Id } = await getDomainSite();
  let Berita: BeritaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=${limit}` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Berita = result;
  }
  return Berita;
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

