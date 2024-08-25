import Redis from "ioredis";

export async function redisSaveString(redis:Redis, key:string,expired:number, value:any){  
    await redis.setex(key, expired, value);
}

export async function redisGetString(redis:Redis, key:string){
 const data=await redis.get(key);

 return data;
}