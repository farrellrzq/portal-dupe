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

export const API_CMS=process.env.API_CMS;
export const API_ADMIN_DATA=process.env.API_ADMIN_DATA;
export const API_YT=process.env.API_YT;
export const API_DSW=process.env.API_DSW;
export const LOGIN_API_DSW=process.env.LOGIN_API_DSW;

export async function loginUser(): Promise<string | null> {
  try {
    const response = await fetch("https://cmsdsw.depok.go.id/api/api/Auth/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: "penggunadsw@gmail.com",
        Password: "penggunadswH8@",
        SiteId: "2",
      }),
    });

    const data = await response.json();
    if (data?.Data?.Token) {
      return data.Data.Token;
    }
  } catch (error) {
    console.error("Login error:", error);
  }
  return null;
}

// 🔹 Perbaikan: Deklarasi globalThis dengan casting
interface GlobalCache {
  token?: string;
  tokenDate?: string;
}

const globalCache = globalThis as unknown as GlobalCache;

export async function getTokenDsw(): Promise<string | null> {
  const storedToken = globalCache.token;
  const lastLoginDate = globalCache.tokenDate;

  const currentDate = new Date().toISOString().split("T")[0];

  // Jika belum ada token atau token lebih dari 1 hari, login ulang
  if (!storedToken || lastLoginDate !== currentDate) {
    const newToken = await loginUser();
    if (newToken) {
      globalCache.token = newToken;
      globalCache.tokenDate = currentDate;
    }
    return newToken;
  }

  return storedToken;
}
