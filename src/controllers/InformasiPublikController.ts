import { consoleError } from "@/helpers/site";
import { api, getDomain, getDomainSite } from "./Controller";
import { InformasiPublikProps, InformasiSertaMertaProps, InformasiSetiapSaatProps } from "./types/informasi-publik.type";

const API_CMS = process.env.API_CMS;
export async function getInformasiPublik() {
  const { Id } = await getDomainSite();
  let InformasiPublik: InformasiPublikProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=&offset=&groupId=Berkala&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiPublik = result;
  }
  return InformasiPublik;
}

export async function getInformasiSertaMerta() {
  const { Id } = await getDomainSite();
  let InformasiSertaMerta: InformasiSertaMertaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=&offset=&groupId=Serta%20Merta&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiSertaMerta = result;
  }
  return InformasiSertaMerta;
}

export async function getInformasiSetiapSaat() {
  const { Id } = await getDomainSite();
  let InformasiSetiapSaat: InformasiSetiapSaatProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=&offset=&groupId=Setiap%20Saat&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiSetiapSaat = result;
  }
  return InformasiSetiapSaat;
}