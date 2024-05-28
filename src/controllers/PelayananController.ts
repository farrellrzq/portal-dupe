import { consoleError } from "@/helpers/site";
import { api, getDomain, getDomainSite } from "./Controller";
import { CmsContentProps } from "./types/controller.type";
import { LayananKotaProps, LayananProps } from "./types/home-controller.type";
import { FaqProps, ListStandarPelayananProps } from "./types/pelayanan-controller.type";

const API_CMS = process.env.API_CMS;
export async function getStandarPelayanan() {
  const { Id } = await getDomainSite();
  let standarPelayanan: CmsContentProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&limit=&offset=&groupId=Standar%20Pelayanan` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    standarPelayanan = result;
  }
  return standarPelayanan;
}

export async function getListStandarPelayanan() {
  const { Id } = await getDomainSite();
  let ListStandarPelayanan: ListStandarPelayananProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&groupId=List%20Standar%20Pelayanan` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    ListStandarPelayanan = result;
  }
  return ListStandarPelayanan;
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
  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=2&code=&groupId=&typeId=LM&limit=&offset=&parent=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    LayananKota = result;
  }
  return LayananKota;
}

export async function getFaq() {
  const { Id } = await getDomainSite();
  let Faq: FaqProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K017&limit=&offset=&category=&=slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Faq = result;
  }
  return Faq;
}