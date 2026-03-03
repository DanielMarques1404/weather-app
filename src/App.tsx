import "./App.css";
import { Today } from "./components/Today";

function App() {
  return (
    <div className="m-auto w-80">
      <Today
        variant={"small"}
        temperature={20}
        date={new Date()}
        city={"Brazil, Fortaleza"}
        weatherIcon={"/assets/images/icon-sunny.webp"}
      />
    </div>
  );
}

export default App;
