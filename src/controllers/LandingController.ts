import { consoleError } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { LandingProps } from "./types/landing-controller.type";
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString} from "@/helpers/redis";

const API_CMS = process.env.API_CMS;
export async function getLanding() {
  const { Id } = await getDomainSite();
  let Landing: LandingProps[] | null = null;

  // const cachedKey=`landing_id:${Id}`;

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