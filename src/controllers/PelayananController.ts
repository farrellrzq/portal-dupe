import { consoleError, API_CMS } from "@/helpers/site";
import { api,  getDomainSite } from "./Controller";
import { CmsContentProps } from "./types/controller.type";
import { LayananKotaProps, LayananProps } from "./types/home-controller.type";
import { FaqProps, ListStandarPelayananProps } from "./types/pelayanan-controller.type";
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString, redisGetList, redisSaveList} from "@/helpers/redis";


export async function getStandarPelayanan() {
  const { Id } = await getDomainSite();
  let standarPelayanan: CmsContentProps[] | null = null;
  
  const cachedKey=`standar_pelayanan_id:${Id}`;
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     standarPelayanan = cachedResult.map(item => JSON.parse(item)) as CmsContentProps[];
     return standarPelayanan;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&limit=&offset=&groupId=Standar%20Pelayanan` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    standarPelayanan = result;
  }

  result.forEach(async(data:any) => {
    await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  });

  return standarPelayanan;
}

export async function getListStandarPelayanan() {
  const { Id } = await getDomainSite();
  let ListStandarPelayanan: ListStandarPelayananProps[] | null = null;

  const cachedKey=`list_standar_pelayanan_id:${Id}`;
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     ListStandarPelayanan = cachedResult.map(item => JSON.parse(item)) as ListStandarPelayananProps[];
     return ListStandarPelayanan;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&groupId=List%20Standar%20Pelayanan` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    ListStandarPelayanan = result;
  }

  result.forEach(async(data:any) => {
    await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  });

  return ListStandarPelayanan;
}

export async function getLayanan() {
  const { Id } = await getDomainSite();
  let Layanan: LayananProps[] | null = null;

  const cachedKey=`layanan_id:${Id}`;
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     Layanan = cachedResult.map(item => JSON.parse(item)) as ListStandarPelayananProps[];
     return Layanan;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&kanalType=K010&limit=3&offset=&category=&slug=&key=&groupId=Aplikasi` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Layanan = result;
  }

  result.forEach(async(data:any) => {
    await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  });

  return Layanan;
}

export async function getLayananKota() {
  const { Id } = await getDomainSite();
  let LayananKota: LayananKotaProps[] | null = null;

  const cachedKey=`layanan_kota_id:${Id}`;
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     LayananKota = cachedResult.map(item => JSON.parse(item)) as LayananKotaProps[];
     return LayananKota;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&parent=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    LayananKota = result;
  }

  result.forEach(async(data:any) => {
    await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  });

  return LayananKota;
}

export async function getDetailLayananKota(Id: string) {
  let DetailLayananKota: LayananKotaProps[] | null = null;

  const cachedKey=`detail_layanan_kota_id:${Id}`;
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     DetailLayananKota = cachedResult.map(item => JSON.parse(item)) as LayananKotaProps[];
     return DetailLayananKota;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&parent=${Id}` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    DetailLayananKota = result ? result : [];
  }

  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });
  }
  

  return DetailLayananKota;
}

export async function getFaq() {
  const { Id } = await getDomainSite();
  let Faq: FaqProps[] | null = null;
  
  const cachedKey=`faq_id:${Id}`;
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     Faq = cachedResult.map(item => JSON.parse(item)) as FaqProps[];
     return Faq;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K017&limit=&offset=&category=&=slug=&key=` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Faq = result;
  }

  result.forEach(async(data:any) => {
    await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  });

  return Faq;
}