import { headers } from 'next/headers'
import { CmsContentProps, CategoryProps, DomainSiteProps, ExlinkProps, ProfileSiteProps, VisitProps } from './types/controller.type';
import { consoleError, getErrorMessage } from '@/helpers/site';
import { LandingProps } from './types/landing-controller.type';
import { getToken } from './HomeController';
import { isBrowser, isMobile } from 'react-device-detect';


interface ApiProps {
  url: string
  method?: string
  revalidate?: number
}
type ApiResponse = { error: string } | any
const API_CMS = process.env.API_CMS;
export async function api({ url, method = "GET", revalidate = 10 }: ApiProps): Promise<ApiResponse> {
  try {
    const res = await fetch(url, {
      method,
      next: {
        revalidate
      }
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('There was an error: ', error);
    const msg = getErrorMessage(error);
    return {
      error: msg
    }
  }
}

export async function getDomain() {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host');
  return 'dkum.depok.go.id';
}

export async function getDomainSite() {
  let domain = await getDomain();
  const result = await api({ url: `${API_CMS}/ViewPortal/domainsite?domain=${domain}`, revalidate: 60 });

  if ('error' in result) {
    throw new Error(result);
  }

  return result as DomainSiteProps;
}

export async function getKecamatan() {
  const { Id } = await getDomainSite();
  let Landing: LandingProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getSiteByKecamatan?siteId=${Id}` });
  if ('error' in result) {
    consoleError('getLanding()', result.error);
  } else {
    Landing = result;
  }
  return Landing;
}

export async function getProfileSite() {
  const { Id } = await getDomainSite();
  let profileSite: ProfileSiteProps | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/profilsite?siteId=${Id}` });
  if ('error' in result) {
    consoleError('getProfileSite()', result.error);
  } else {
    profileSite = result[0];
  }
  return profileSite;
}

export async function getExLink() {
  const { Id } = await getDomainSite();
  let exlink: ExlinkProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=${Id}&code=&groupId=&typeId=EP&limit=&offset=` });
  if ('error' in result) {
    consoleError('getExLink()', result.error);
  } else {
    exlink = result;
  }
  return exlink;
}

export async function getBerita() {
  const { Id } = await getDomainSite();
  let berita: CmsContentProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('getBerita()', result.error);
  } else {
    berita = result;
  }
  return berita;
}

export async function getVisit() {
  const { Id } = await getDomainSite();
  let visit: VisitProps = {
    w_tahun: [],
    w_bulan: [],
    w_minggu: [],
    w_kemarin: [],
    w_hari: []
  }; // Inisialisasi visit dengan tipe VisitProps

  try {
    // Panggil getVisitAgent secara async
    const Logview = await getVisitAgent();

    const result = await api({ url: `${API_CMS}/ViewPortal/getPengunjung?siteid=${Id}` });
    if ('error' in result) {
      console.error('getVisit()', result.error);
    } else {
      visit = result;
    }

    // Gunakan Logview dari getVisitAgent
    if (Logview) {
      // Pastikan properti Logview sesuai dengan tipe VisitProps
      visit.agentInfo = Logview.agentInfo;
      visit.agentBrowser = Logview.agentBrowser;
      visit.device = Logview.device;
      visit.browse = Logview.browse;
    }
  } catch (error) {
    console.error('Error in getVisit:', error);
    throw error;
  }

  return visit;
}

export async function getVisitAgent() {
  let agentInfo = '';

  if (typeof navigator !== 'undefined') {
    agentInfo = isBrowser ? navigator.userAgent : isMobile ? 'Mobile Device' : '';
  }

  const { Id } = await getDomainSite();
  let Logview: VisitProps = {
    w_tahun: [],
    w_bulan: [],
    w_minggu: [],
    w_kemarin: [],
    w_hari: []
  };

  const result = await api({
    url: `${API_CMS}/ViewPortal/log_view?siteid=${Id}&contentid=&codekanal=&device=${agentInfo}&browse=${agentInfo}&codekanal=`
  });

  if ('error' in result) {
    console.error('getVisitAgent()', result.error);
  } else {
    Logview = result;
  }

  return Logview;
}



export async function getCategories({ kanalType }: { kanalType: 'K001' | 'K008' }): Promise<CategoryProps[] | null> {
  const { Id } = await getDomainSite();
  let categories: CategoryProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/ContentCategory?siteId=${Id}&status=ST01&kanalType=${kanalType}&Id=` });
  if ('error' in result) {
    consoleError('getCategories()', result.error);
  } else {
    categories = result;
  }
  return categories;
}

export async function getPendudukBerakteData() {
  const { Kelurahan, Kecamatan } = await getDomainSite();

  try {
    const { token, url } = await getToken();
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        tahun: '2023',
        kecamatan: Kecamatan,
        title: 'KEPEMILIKAN AKTA KELAHIRAN',
        dimensi: 'Kepemilikan Akta',
        subdimensi: ''
      })
    };

    const response = await fetch(`${url}/api/kependudukan/rekap`, body);

    if (!response.ok) {
      throw new Error(`Fetching data failed with status: ${response.status}, ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getPendudukBerakteData:', error);
    throw error; // Re-throw the error for further handling if necessary
  }
}

export async function getDataSiswa() {
  const { Kelurahan, Kecamatan } = await getDomainSite();

  try {
    const { token, url } = await getToken();
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        tahun: '2023'
      })
    };

    const response = await fetch(`${url}/api/siswa/aggsiswa/perjenjangstatus`, body);

    if (!response.ok) {
      throw new Error(`Fetching data failed with status: ${response.status}, ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getDataSiswa:', error);
    throw error; // Re-throw the error for further handling if necessary
  }
}

export function groupBySubdimensi(data: any) {
  const groupedData: { [key: string]: typeof data } = {};

  data.forEach((item: any) => {
    const { subdimensi, ...rest } = item;
    if (!groupedData[subdimensi]) {
      groupedData[subdimensi] = [];
    }
    groupedData[subdimensi].push(rest);
  });

  return groupedData;
}

export function groupByJenjang(data: any) {
  const groupedData: { [key: string]: typeof data } = {};

  data.forEach((item: any) => {
    const { jenjang, ...rest } = item;
    if (!groupedData[jenjang]) {
      groupedData[jenjang] = [];
    }
    groupedData[jenjang].push(rest);
  });

  return groupedData;
}
