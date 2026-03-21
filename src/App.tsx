import { useState } from "react";
import "./App.css";
import { DailyForecast } from "./components/layout/DailyForecast";
import { Header } from "./components/layout/Header";
import type { City } from "./types/types";
import { Teste } from "./components/Teste";

function App() {
  const [city, setCity] = useState<City | null>(null);

  return (
    <main className="flex flex-col gap-4 w-88 md:w-full m-auto">
      <Header setCity={setCity} />
      <DailyForecast city={city} />
      {/* <Teste /> */}
    </main>
  );
}

export default App;
