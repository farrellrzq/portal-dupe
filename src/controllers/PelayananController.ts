import { consoleError, API_CMS } from "@/helpers/site";
import { api,  getDomainSite } from "./Controller";
import { CmsContentProps } from "./types/controller.type";
import { LayananKotaProps, LayananProps } from "./types/home-controller.type";
import { FaqProps, ListStandarPelayananProps } from "./types/pelayanan-controller.type";
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString} from "@/helpers/redis";


export async function getStandarPelayanan() {
  const { Id } = await getDomainSite();
  let standarPelayanan: CmsContentProps[] | null = null;
  
  const cachedKey=`standar_pelayanan_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    standarPelayanan=JSON.parse(cachedResult);
    return standarPelayanan;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&limit=&offset=&groupId=Standar%20Pelayanan` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    standarPelayanan = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return standarPelayanan;
}

export async function getListStandarPelayanan() {
  const { Id } = await getDomainSite();
  let ListStandarPelayanan: ListStandarPelayananProps[] | null = null;

  const cachedKey=`list_standar_pelayanan_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    ListStandarPelayanan=JSON.parse(cachedResult);
    return ListStandarPelayanan;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&groupId=List%20Standar%20Pelayanan` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    ListStandarPelayanan = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return ListStandarPelayanan;
}

export async function getLayanan() {
  const { Id } = await getDomainSite();
  let Layanan: LayananProps[] | null = null;

  const cachedKey=`layanan_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Layanan=JSON.parse(cachedResult);
    return Layanan;
  }


  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&kanalType=K010&limit=3&offset=&category=&slug=&key=&groupId=Aplikasi` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Layanan = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Layanan;
}

export async function getLayananKota() {
  const { Id } = await getDomainSite();
  let LayananKota: LayananKotaProps[] | null = null;

  const cachedKey=`layanan_kota_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    LayananKota=JSON.parse(cachedResult);
    return LayananKota;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&parent=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    LayananKota = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return LayananKota;
}

export async function getDetailLayananKota(Id: string) {
  let DetailLayananKota: LayananKotaProps[] | null = null;

  const cachedKey=`detail_layanan_kota_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    DetailLayananKota=JSON.parse(cachedResult);
    return DetailLayananKota;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&parent=${Id}` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    DetailLayananKota = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return DetailLayananKota;
}

export async function getFaq() {
  const { Id } = await getDomainSite();
  let Faq: FaqProps[] | null = null;
  
  const cachedKey=`faq_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Faq=JSON.parse(cachedResult);
    return Faq;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K017&limit=&offset=&category=&=slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Faq = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Faq;
}