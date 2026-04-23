import { useState, type JSX } from "react";
import "./App.css";
import Record from "./component/Record";
import Search from "./component/Search";

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="app">
      <h1>Patient Record</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Record searchTerm={searchTerm} />
    </div>
  );
}

export default App;
