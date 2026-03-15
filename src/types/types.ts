export type CurrentData = {
  apparent_temperature: number;
  date: Date;
  precipitation: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
};

export type DailyData = {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: Date[];
  weather_code: number[];
};

export type HourlyData = {
  time: Date[][];
  temperature_2m: number[][];
  weather_code: number[][];
};

export type WeekDay = {
  value: number;
  label: string;
};

export type City = {
  id: number;
  name: string;
  admin1: string;
  country: string;
  longitude: number;
  latitude: number;
};

export type Unit = {
  temperature: "Celsius (ºC)" | "Fahrenheit (ºF)";
  windSpeed: "km/h" | "mph";
  precipitation: "Millimeters (mm)" | "Inches (in)";
  precipitation_short: "mm" | "in"
};
