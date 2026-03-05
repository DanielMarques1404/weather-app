import { fetchWeatherApi } from "openmeteo";

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
// &daily=temperature_2m_max,temperature_2m_min,weather_code
// &hourly=temperature_2m,weather_code
// &current=relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,temperature_2m,weather_code
// &timezone=auto

type openMeteoApiParams = {
  latitude: number;
  longitude: number;
  hourly: string;
  daily: string;
  current: string;
  forecast_days: number;
  timezone: string;
};

export class OpenMeteoApi {
  private params: openMeteoApiParams;
  private data: any;

  constructor(latitude: number, longitude: number) {
    this.params = {
      latitude: latitude,
      longitude: longitude,
      hourly: "temperature_2m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      current:
        "relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,temperature_2m,weather_code",
      forecast_days: 14,
      timezone: "auto",
    };
  }

  async fetchWeather() {
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, this.params);
    this.data = responses[0];
  }

  getHourlyData() {
    const hourly = this.data.hourly()!;
    const utcOffsetSeconds = this.data.utcOffsetSeconds();
    return {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
    };
  }

  getCurrentData() {
    const current = this.data.current()!;
    return {
      relative_humidity_2m: current.variables(0)!.value(),
      apparent_temperature: current.variables(1)!.value(),
      precipitation: current.variables(2)!.value(),
      wind_speed_10m: current.variables(3)!.value(),
      temperature_2m: current.variables(4)!.value(),
      weather_code: current.variables(5)!.value(),
      date: new Date(),
    };
  }

  getDailyData() {
    const daily = this.data.daily()!;
    const utcOffsetSeconds = this.data.utcOffsetSeconds();
    return {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m_max: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      weather_code: daily.variables(2)!.valuesArray(),
    };
  }
}
