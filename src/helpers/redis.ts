import exp from "constants";
import Redis from "ioredis";

export async function redisSaveString(redis:Redis, key:string,expired:number, value:any){  
    await redis.setex(key, expired, value);
}

export async function redisGetString(redis:Redis, key:string){
 const data=await redis.get(key);

 return data;
}

export async function redisSaveList(redis:Redis, key:string, expired:number, value:any){
  await redis.rpush(key, value);
  await redis.expire(key, expired); 
}

export async function redisGetList(redis:Redis, key:string) {
    const data=await redis.lrange(key,0,-1);
    
    return data;
}

export async function redisCheckList(redis:Redis, key:string, checkItem:any){
    const list=await redis.lrange(key, 0, -1);

    return list.some(item => {
        try {
            const parsedItem = JSON.parse(item); 
            return Object.values(parsedItem).includes(checkItem);
        } catch (e) {
            return false;
        }
    });
}

export async function redisDetailValueList(redis:Redis, key:string, checkItem:any) {
    const list=await redis.lrange(key, 0, -1);
    const result=[];
    for (const item of list) {
        try {
            const parsedItem = JSON.parse(item); 

            if (Object.values(parsedItem).includes(checkItem)) {
                result.push(parsedItem);
                return result; 
            }
        } catch (e) {
            continue;
        }
    }

    return null;
}

export async function redisEditList(redis:Redis, key:string, index:number, newValue:any){
    redis.lset(key,index,newValue);
}

export async function redisDelete(redis:Redis, key:string){
    await redis.del(key);
}