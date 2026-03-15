import { fetchWeatherApi } from "openmeteo";
import type { CurrentData, DailyData, HourlyData, Unit } from "../types/types";
import { ImperialUnit } from "./utils";

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
  temperature_unit?: string;
  wind_speed_unit?: string;
  precipitation_unit?: string;
};

export class OpenMeteoApi {
  private params: openMeteoApiParams;
  private data: any;

  constructor(latitude: number, longitude: number, unit: Unit) {
    const params: openMeteoApiParams = {
      latitude: latitude,
      longitude: longitude,
      hourly: "temperature_2m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      current:
        "relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,temperature_2m,weather_code",
      forecast_days: 14,
      timezone: "auto",
    };

    if (unit === ImperialUnit) {
      Object.assign(params, {
        temperature_unit: "fahrenheit",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
      });
    }

    this.params = params;
  }
  // temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch
  async fetchWeather() {
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, this.params);
    this.data = responses[0];
  }

  getHourlyData(): HourlyData {
    const hourly = this.data.hourly()!;
    const yesterdayOffset = 3;
    const utcOffsetSeconds = this.data.utcOffsetSeconds();
    return {
      time: Array.from({ length: 7 }, (_, i) =>
        Array.from(
          { length: 24 },
          (_, j) =>
            new Date(
              (Number(hourly.time()) +
                (24 * i + j + yesterdayOffset) * hourly.interval() +
                utcOffsetSeconds) *
                1000,
            ),
        ),
      ),
      temperature_2m: Array.from({ length: 7 }, (_, i) => [
        ...hourly
          .variables(0)!
          .valuesArray()
          .slice(i * 24 + yesterdayOffset, i * 24 + 24 + yesterdayOffset),
      ]),
      weather_code: Array.from({ length: 7 }, (_, i) => [
        ...hourly
          .variables(1)!
          .valuesArray()
          .slice(i * 24 + yesterdayOffset, i * 24 + 24 + yesterdayOffset),
      ]),
    };
  }

  getCurrentData(): CurrentData {
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

  getDailyData(): DailyData {
    const yesterdayOffset = 1;
    const daily = this.data.daily()!;
    const utcOffsetSeconds = this.data.utcOffsetSeconds();
    return {
      time: Array.from(
        {
          length: 7,
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) +
              (i + yesterdayOffset) * daily.interval() +
              utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m_max: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      weather_code: daily.variables(2)!.valuesArray(),
    };
  }
}
