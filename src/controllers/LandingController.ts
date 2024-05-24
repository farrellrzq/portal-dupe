import { consoleError } from "@/helpers/site";
import { api, getDomain, getDomainSite } from "./Controller";
import { BeritaKelurahanProps, BeritaKotaProps, BeritaProps, DokumenProps, InfografisProps, KomoditasProps, LayananKotaProps, LayananProps, PengumumanProps, PotensiProps, SliderProps } from "./types/home-controller.type";
import { LandingProps } from "./types/landing-controller.type";

const API_CMS = process.env.API_CMS;
export async function getLanding() {
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