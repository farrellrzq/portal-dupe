import { headers } from 'next/headers'
import { 
  CmsContentProps, 
  CategoryProps, 
  DomainSiteProps, 
  ExlinkProps, 
  ProfileSiteProps, 
  VisitProps 
} from './types/controller.type';
import { consoleError, getErrorMessage, API_CMS } from '@/helpers/site';
import { LandingProps } from './types/landing-controller.type';
import { getToken } from './HomeController';
import { isBrowser, isMobile } from 'react-device-detect';
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString} from "@/helpers/redis";


interface ApiProps {
  url: string
  method?: string
  revalidate?: number
}
type ApiResponse = { error: string } | any
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
  return 'diskominfo.depok.go.id'
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host');
  return domain ||  'diskominfo.depok.go.id';
}

export async function getDomainSite() {
const domain=await getDomain();

  const cachedKey=`domainSite:${domain}`;

  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    return JSON.parse(cachedResult) as DomainSiteProps;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/domainsite?domain=${domain}`, revalidate: 60 });

  if ('error' in result) {
    throw new Error(result);
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return result as DomainSiteProps;
}

export async function getKecamatan() {
  let Landing: LandingProps[] | null = null;
  const cachedKey=`kecamatanDomain:${await getDomain()}`;
  const { Id } = await getDomainSite();


  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Landing=JSON.parse(cachedResult);
    return Landing;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getSiteByKecamatan?siteId=${Id}` });
  
  if ('error' in result) {
    consoleError('getLanding()', result.error);
  } else {
    Landing = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Landing;
}

export async function getProfileSite() {
  let profileSite: ProfileSiteProps | null = null;

  const cachedKey=`profileDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();

  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    profileSite=JSON.parse(cachedResult)[0];
    return profileSite;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/profilsite?siteId=${Id}` });

  if ('error' in result) {
    consoleError('getProfileSite()', result.error);
  } else {
    profileSite = result[0];
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return profileSite;
}


export async function getExLink() {
  let exlink: ExlinkProps[] | null = null;

  const cachedKey=`exlinkDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    exlink=JSON.parse(cachedResult);
    return exlink;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=${Id}&code=&groupId=&typeId=EP&limit=&offset=` });
  if ('error' in result) {
    consoleError('getExLink()', result.error);
  } else {
    exlink = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return exlink;
}

export async function getBerita() {
  let berita: CmsContentProps[] | null = null;

  const cachedKey=`beritaDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    berita=JSON.parse(cachedResult);
    return berita;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('getBerita()', result.error);
  } else {
    berita = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return berita;
}

export async function getVisitAgent() {
  let agentInfo = '';

  if (typeof navigator !== 'undefined') {
    agentInfo = isBrowser ? navigator.userAgent : isMobile ? 'Mobile Device' : '';
  }
  
  let Logview: VisitProps = {
    w_tahun: [],
    w_bulan: [],
    w_minggu: [],
    w_kemarin: [],
    w_hari: []
  };

  const cachedKey=`visitAgentDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Logview=JSON.parse(cachedResult);
    return Logview;
  }

  const result = await api({
    url: `${API_CMS}/ViewPortal/log_view?siteid=${Id}&contentid=&codekanal=&device=${agentInfo}&browse=${agentInfo}&codekanal=`
  });

  if ('error' in result) {
    console.error('getVisitAgent()', result.error);
  } else {
    Logview = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Logview;
}

export async function getVisit() {
  let visit: VisitProps = {
    w_tahun: [],
    w_bulan: [],
    w_minggu: [],
    w_kemarin: [],
    w_hari: []
  }; // Inisialisasi visit dengan tipe VisitProps

  const cachedKey=`visitDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  const cachedResult=await redisGetString(redis,cachedKey);


  try {
    // Panggil getVisitAgent secara async
    const Logview = await getVisitAgent();

    if (cachedResult) {
    visit=JSON.parse(cachedResult);
    return visit;
  }

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

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(visit));

  return visit;
}


export async function getCategories({ kanalType }: { kanalType: 'K001' | 'K008' }): Promise<CategoryProps[] | null> {
  let categories: CategoryProps[] | null = null;

  const cachedKey=`categoriesDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    categories=JSON.parse(cachedResult);
    return categories;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/ContentCategory?siteId=${Id}&status=ST01&kanalType=${kanalType}&Id=` });
  if ('error' in result) {
    consoleError('getCategories()', result.error);
  } else {
    categories = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(categories));

  return categories;
}

export async function getPendudukBerakteData() {
const { Id, Kecamatan } = await getDomainSite();


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

