import { consoleError } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { LandingProps } from "./types/landing-controller.type";
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString} from "@/helpers/redis";

const API_CMS = process.env.API_CMS;
export async function getLanding() {
  const { Id } = await getDomainSite();
  let Landing: LandingProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/getPlace?siteId=${Id}&typeId=&limit=&offset=` });
  if ('error' in result) {
    consoleError('getLanding()', result.error);
  } else {
    Landing = result;
  }

  return Landing;
}