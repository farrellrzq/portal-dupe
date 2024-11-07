// import { headers } from 'next/headers';
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

interface ApiProps {
  url: string;
  method?: string;
  revalidate?: number;
}

type ApiResponse = { error: string } | any;

export async function api({ url, method = "GET", revalidate = 30 }: ApiProps): Promise<ApiResponse> {
  try {
    if (!url) {
      throw new Error("URL is required for the API call.");
    }

    const res = await fetch(url, {
      method,
      next: {
        revalidate,
      },
    });

    if (!res.ok) {
      console.error(`HTTP Error: ${res.status} ${res.statusText}`);
      return { error: `Request failed with status ${res.status} - ${res.statusText}` };
    }

    // Ambil respons sebagai teks
    const textResponse = await res.text(); 

    // Periksa respons kosong
    if (textResponse.trim() === "") {
      console.error("Received empty response.");
      return { error: "Received empty response from API." };
    }

    // Coba parse teks menjadi JSON
    try {
      const result = JSON.parse(textResponse);
      return result;
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError);
      return { error: "Failed to parse response as JSON." };
    }
  } catch (error) {
    console.error('There was an error:', error);
    const msg = getErrorMessage(error);
    return {
      error: msg,
    };
  }
}

// Fungsi lokal getErrorMessage untuk menangani pesan error dengan jelas
function getErrorMessage(error: unknown): string {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String((error as any).message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong!";
  }

  if (message === 'fetch failed') {
    message = 'Internal server error';
  }

  return message;
}


export async function getDomain() {
 
  // const headersList = headers();
  // const domain = (await headersList).get('x-forwarded-host');
  return process.env.DOMAIN;
}

export async function getDomainSite() {
  const domain=await getDomain();
  
  // const cachedKey=`domainSite:${domain}`;

  // const cachedResult=await redisGetString(redis,cachedKey);

  // if (cachedResult) {
  //   return JSON.parse(cachedResult) as DomainSiteProps;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/domainsite?domain=${domain}`, revalidate: 60 });

  if ('error' in result) {
    throw new Error(result);
  }

  // await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return result as DomainSiteProps;
}

export async function getKecamatan() {
  let Landing: LandingProps[] | null = null;
  const cachedKey=`kecamatanDomain:${await getDomain()}`;
  const { Id } = await getDomainSite();


  // const cachedResult=await redisGetString(redis,cachedKey);

  // if (cachedResult) {
  //   Landing=JSON.parse(cachedResult);
  //   return Landing;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/getSiteByKecamatan?siteId=${Id}` });
  
  if ('error' in result) {
    consoleError('getLanding()', result.error);
  } else {
    Landing = result;
  }

  // await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Landing;
}

export async function getProfileSite() {
  let profileSite: ProfileSiteProps | null = null;

  const {Id}=await getDomainSite();

  const result = await api({ url: `${API_CMS}/ViewPortal/profilsite?siteId=${Id}` });

  if ('error' in result) {
    consoleError('getProfileSite()', result.error);
  } else {
    profileSite = result[0];
  }

  return profileSite;
}


export async function getExLink() {
  let exlink: ExlinkProps[] | null = null;

  const cachedKey=`exlinkDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  // const cachedResult=await redisGetString(redis,cachedKey);

  // if (cachedResult) {
  //   exlink=JSON.parse(cachedResult);
  //   return exlink;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=${Id}&code=&groupId=&typeId=EP&limit=3&offset=` });
  if ('error' in result) {
    consoleError('getExLink()', result.error);
  } else {
    exlink = result;
  }

  // await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return exlink;
}

export async function getBerita() {
  const { Id } = await getDomainSite();
  let Berita: CmsContentProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Berita = result ? result : [];
  }

  return Berita;
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


  // const cachedResult=await redisGetString(redis,cachedKey);

  // if (cachedResult) {
  //   Logview=JSON.parse(cachedResult);
  //   return Logview;
  // }

  const result = await api({
    url: `${API_CMS}/ViewPortal/log_view?siteid=${Id}&contentid=&codekanal=&device=${agentInfo}&browse=${agentInfo}&codekanal=`
  });

  if ('error' in result) {
    console.error('getVisitAgent()', result.error);
  } else {
    Logview = result;
  }

  // await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

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

  // const cachedKey=`visitDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  // const cachedResult=await redisGetString(redis,cachedKey);


  try {
    // Panggil getVisitAgent secara async
    // const Logview = await getVisitAgent();

    // if (cachedResult) {
    //   visit=JSON.parse(cachedResult);
    //   return visit;
    // }

    const result = await api({ url: `${API_CMS}/ViewPortal/getPengunjung?siteid=${Id}`, revalidate: 3600 });

    if ('error' in result) {
      console.error('getVisit()', result.error);
    } else {
      visit = result;
    }

    // Gunakan Logview dari getVisitAgent
    // if (Logview) {
    //   // Pastikan properti Logview sesuai dengan tipe VisitProps
    //   visit.agentInfo = Logview.agentInfo;
    //   visit.agentBrowser = Logview.agentBrowser;
    //   visit.device = Logview.device;
    //   visit.browse = Logview.browse;
    // }
  } catch (error) {
    console.error('Error in getVisit:', error);
    throw error;
  }

  // await redisSaveString(redis,cachedKey, 3600, JSON.stringify(visit));

  return visit;
}


export async function getCategories({ kanalType }: { kanalType: 'K001' | 'K008' }): Promise<CategoryProps[] | null> {
  let categories: CategoryProps[] | null = null;

  // const cachedKey=`categoriesDomain:${await getDomain()}`;
  const {Id}=await getDomainSite();


  // const cachedResult=await redisGetString(redis,cachedKey);

  // if (cachedResult) {
  //   categories=JSON.parse(cachedResult);
  //   return categories;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/ContentCategory?siteId=${Id}&status=ST01&kanalType=${kanalType}&Id=` });
  if ('error' in result) {
    consoleError('getCategories()', result.error);
  } else {
    categories = result;
  }

  // await redisSaveString(redis,cachedKey, 3600, JSON.stringify(categories));

  return categories;
}