import { headers } from 'next/headers';
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
import { NextResponse } from 'next/server';

// Controller - api.ts (Modified)
interface ApiProps {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  revalidate?: number;
  body?: BodyInit | null;
  useAuth?: boolean; // Add a flag to indicate if authentication is needed
}

type ApiResponse = { error: string } | any;

export async function api({ url, method = "GET", headers = {}, revalidate = 30, useAuth = false, body }: ApiProps): Promise<ApiResponse> {
  try {
    if (!url) {
      throw new Error("URL is required for the API call.");
    }

    let authHeaders = { ...headers };

    if (useAuth) {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        throw new Error("No token found. Please login."); // Handle missing token
      }
      authHeaders.Authorization = `Bearer ${token}`; // Add token to headers
    }


    const res = await fetch(url, {
      method,
      headers: authHeaders, // Use headers with potential token
      body,
      next: {
        revalidate,
      },
    });

    if (!res.ok) {
      console.error(`HTTP Error: ${res.status} ${res.statusText}`);
      // Check for specific auth errors and handle them (e.g., token expired)
      if (res.status === 401) {
        localStorage.removeItem('token'); // Clear invalid token
        // Redirect to login or show a message
        window.location.href = '/login'; // Example redirect
        return { error: `Authentication failed. Please login.` }; // Or throw error
      }
      return { error: `Request failed with status ${res.status} - ${res.statusText}` };
    }

    const textResponse = await res.text();

    if (textResponse.trim() === "") {
      console.error("Received empty response.");
      return { error: "Received empty response from API." };
    }

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
  const domain = await getDomain();
  const result = await api({ url: `${API_CMS}/ViewPortal/domainsite?domain=${domain}`, revalidate: 60 });

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result as DomainSiteProps;
}

export async function getSiteData() {
  const { Id } = await getDomainSite();
  return Id;
}

export async function getKecamatan() {
  const { Id } = await getDomainSite();
  const cachedKey = `kecamatanDomain:${await getDomain()}`;

  const result = await api({ url: `${API_CMS}/ViewPortal/getSiteByKecamatan?siteId=${Id}` });

  if ('error' in result) {
    consoleError('getLanding()', result.error);
    return null;
  }

  return result as LandingProps[];
}

export async function getProfileSite() {
  const { Id } = await getDomainSite();
  const result = await api({ url: `${API_CMS}/ViewPortal/profilsite?siteId=${Id}` });

  if ('error' in result) {
    consoleError('getProfileSite()', result.error);
    return null;
  }

  return result[0] as ProfileSiteProps;
}

export async function getExLink() {
  const { Id } = await getDomainSite();
  const cachedKey = `exlinkDomain:${await getDomain()}`;

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=${Id}&typeId=EP&limit=3` });

  if ('error' in result) {
    consoleError('getExLink()', result.error);
    return null;
  }

  return result as ExlinkProps[];
}

export async function getBerita() {
  const { Id } = await getDomainSite();
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&limit=3&ST01&kanalType=K001` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
    return [];
  }

  return result as CmsContentProps[];
}

export async function getVisitAgent() {
  let agentInfo = '';

  if (typeof window !== 'undefined') {
    agentInfo = isBrowser ? navigator.userAgent : isMobile ? 'Mobile Device' : '';
  }

  const { Id } = await getDomainSite();
  const cachedKey = `visitAgentDomain:${await getDomain()}`;

  const result = await api({
    url: `${API_CMS}/ViewPortal/log_view?siteid=${Id}&contentid=&codekanal=&device=${agentInfo}&browse=${agentInfo}&codekanal=`
  });

  if ('error' in result) {
    console.error('getVisitAgent()', result.error);
    return {
      w_tahun: [],
      w_bulan: [],
      w_minggu: [],
      w_kemarin: [],
      w_hari: []
    };
  }

  return result as VisitProps;
}

export async function getVisit() {
  const { Id } = await getDomainSite();

  try {
    const result = await api({ url: `${API_CMS}/ViewPortal/getPengunjung?siteid=${Id}`, revalidate: 3600 });

    if ('error' in result) {
      console.error('getVisit()', result.error);
      return {
        w_tahun: [],
        w_bulan: [],
        w_minggu: [],
        w_kemarin: [],
        w_hari: []
      };
    }

    return result as VisitProps;
  } catch (error) {
    console.error('Error in getVisit:', error);
    throw error;
  }
}

export async function getCategories({ kanalType }: { kanalType: 'K001' | 'K008' }): Promise<CategoryProps[] | null> {
  const { Id } = await getDomainSite();
  const result = await api({ url: `${API_CMS}/ViewPortal/ContentCategory?siteId=${Id}&status=ST01&kanalType=${kanalType}&Id=` });

  if ('error' in result) {
    consoleError('getCategories()', result.error);
    return null;
  }

  return result as CategoryProps[];
}