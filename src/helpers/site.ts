// import Redis from "ioredis";

export function hardRedirect(path: string) {
  // Perform a hard refresh
  window.location.reload();
  window.location.href = path;
};

export function getErrorMessage(error: unknown): string {
  let message: string;

  if (error instanceof Error) {
    message = error.message
    // console.log('here');
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message)
    // console.log('here2');
  } else if (typeof error === "string") {
    message = error;
    // console.log('here3');
  } else {
    message = "Something went wrong!";
  }

  if (message == 'fetch failed') {
    message = 'Internal server error';
  }

  return message;
}

export function formatDate(dateSrc: string | number, format: 'Y-M-D' | 'ID' = 'ID') {
  const date = new Date(dateSrc);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
  const year = date.getFullYear();

  let formatted = dateSrc;
  if (format == 'Y-M-D') {
    formatted = `${year}-${month}-${day}`;
  } else if (format == 'ID') {
    formatted = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  }

  return formatted;
}

export function consoleError(source: string, error: string) {
  console.error(`\x1b[31mError in ${source}: ${error}\x1b[0m`);
}

export function formatTanggal(tanggal: string) {
  const bulanNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const parts = tanggal.split(' ')[0].split('-');
  const day = parts[2];
  const month = bulanNames[parseInt(parts[1], 10) - 1];
  const year = parts[0];

  return `${day} ${month} ${year}`;
}


export function formatNumberWithCommasTahunWarga(number: string | null) {
  if (number === null) return ""; // or any other fallback value
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// export function connectRedis() {
//     return new Redis({
//         host: process.env.HOST,
//         port: Number(process.env.PORT),  
//         db: Number(process.env.DB), 
//         username: process.env.USERNAME_REDIS,
//         password: process.env.PASSWORD,
//     });
// }

// let redis=connectRedis();

// export async function redisSaveString(name:string,id:number){  
//     await redis.setex(name, 86400, id);
// }

// export async function redisGetString(name:string){
//  const data=await redis.get(name);

//  return data;
// }

// const API_CMS = process.env.API_CMS;
