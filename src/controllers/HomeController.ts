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
import  redis from '@/helpers/redis-client';
import {
  redisSaveList,
  redisGetList,
  redisCheckList,
  redisEditList
} from "@/helpers/redis";


async function _logAccess(domain:any){
  const log={
      idSite:domain,
      timeStamp:new Date()
  }
  
  if(await redisCheckList(redis, "log_access_web", domain)){
      const listLog=await redisGetList(redis,"log_access_web");
      const index=listLog.indexOf(domain);
      await redisEditList(redis, "log_access_web",index, JSON.stringify(log));
  }else{
    await redisSaveList(redis,"log_access_web",1800, JSON.stringify(log));
  }
  
}

export async function getSlider() {
  const { Id } = await getDomainSite();
  // _logAccess(Id);
  let Slider: SliderProps[] | null = null;
  const cachedKey=`slider_id:${Id}`;

  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     Slider = cachedResult.map(item => JSON.parse(item)) as SliderProps[];
     return Slider;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getSlider?siteId=${Id}&typeId=SL01&status=ST01&fileType=FL02` });

  if ('error' in result) {
    consoleError('getSlider()', result.error);
  } else {
    Slider = result ? result : [];
  }

  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });
  }
  
  return Slider;
}

export async function getLayanan() {
  const { Id } = await getDomainSite();
  let Layanan: LayananProps[] | null = null;
  
  const cachedKey=`layanan_id:${Id}`;

  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     Layanan = cachedResult.map(item => JSON.parse(item)) as LayananProps[];
     return Layanan;
  } 

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&kanalType=K010&limit=&offset=&category=&slug=&key=&groupId=Aplikasi` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Layanan = result ? result : [];
  }

  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });
  }

  return Layanan;
}

export async function getLayananKota() {
  let LayananKota: LayananKotaProps[] | null = null;

  const cachedKey=`layanan_kota`;

  const cachedResult=await redisGetList(redis,cachedKey);

  if (cachedResult.length > 0) {
    LayananKota = cachedResult.map(item => JSON.parse(item)) as LayananKotaProps[];
    return LayananKota;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&slug=`});

  if ('error' in result) {
    consoleError('getExLink()', result.error);
  } else {
    LayananKota = result ? result : [];
  }

  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });
  }
  
  return LayananKota;
}

export async function getInfografis() {
  let Infografis: InfografisProps[] | null = null;

  
  const cachedKey=`infografis`;
  
  const cachedResult=await redisGetList(redis,cachedKey);
  
  if (cachedResult.length > 0) {
    Infografis = cachedResult.map(item => JSON.parse(item)) as InfografisProps[];
    return Infografis;
  }
  
  const result = await api({ url: `${API_DSW}/index.php/api/slider` });
  
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Infografis = result ? result.data : [];
  }

  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });
  }
  
  return Infografis;
}

export async function getDokumen() {
  const { Id } = await getDomainSite();
  let Dokumen: DokumenProps[] | null = null;

  // const cachedKey=`dokumen_id:${Id}`;

  // const cachedResult=await redisGetList(redis,cachedKey);

  //  if (cachedResult.length > 0) {
  //    Dokumen = cachedResult.map(item => JSON.parse(item)) as DokumenProps[];
  //    return Dokumen;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010&limit=3`});
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Dokumen = result ? result : [];
  }

  // if(result.length > 0){
  //   result.forEach(async(data:any) => {
  //     await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  //   });
  // }
  
  return Dokumen;
}

export async function getPengumuman() {
  const { Id } = await getDomainSite();
  let Pengumuman: PengumumanProps[] | null = null;

  // const cachedKey=`pengumuman_id:${Id}`;
  // const cachedResult=await redisGetList(redis, cachedKey);

  // if (cachedResult.length > 0) {
  //    Pengumuman = cachedResult.map(item => JSON.parse(item)) as PengumumanProps[];
  //    return Pengumuman;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=3&offset=&category=&slug=&key=`});
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Pengumuman = result ? result : [];
  }

  // if(result.length > 0){
  //   result.forEach(async(data:any) => {
  //     await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  //   });
  // }

  return Pengumuman;
}

export async function getBeritaKota() {
  let BeritaKota: BeritaKotaProps[] | null = null;

  const cachedKey=`berita_kota`;
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     BeritaKota = cachedResult.map(item => JSON.parse(item)) as BeritaKotaProps[];
     return BeritaKota;
  }

  const result = await api({ url: `${API_BERITA_DEPOK}` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    BeritaKota = result ? result : [];
  }

  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });
  }

  return BeritaKota;
}

export async function getBerita() {
  const { Id } = await getDomainSite();
  let Berita: BeritaProps[] | null = null;

  // const cachedKey=`berita_id:${Id}`;

  // const cachedResult=await redisGetList(redis, cachedKey);

  // if (cachedResult.length > 0) {
  //    Berita = cachedResult.map(item => JSON.parse(item)) as BeritaProps[];
  //    return Berita;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=3` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Berita = result ? result : [];
  }

  // if(result.length > 0){
  //   result.forEach(async(data:any) => {
  //     await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  //   });
  // }

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

