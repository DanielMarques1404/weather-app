export const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'short',
    day: 'numeric' 
};

export function getOpenMeteoIconName(code: number): string {
  return openMeteoIconByCode[code] ?? "overcast";
}

export const openMeteoIconByCode: Record<number, string> = {
  // Céu limpo / poucas nuvens
  0: "sunny",
  1: "partly-cloudy",
  2: "partly-cloudy",
  3: "overcast",

  // Nevoeiro
  45: "fog",
  48: "fog",

  // Chuvisco
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",

  // Chuva
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",

  // Neve
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",

  // Pancadas
  80: "rain",
  81: "rain",
  82: "rain",

  // Pancadas de neve
  85: "snow",
  86: "snow",

  // Trovoada
  95: "storm",
  96: "storm",
  99: "storm",
};
