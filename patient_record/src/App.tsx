import "./App.css";
import Record from "./component/Record";
import Search from "./component/Search";

function App() {
  return (
    <div>
      <h1>Patient Record</h1>
      <Search />
      <Record />
    </div>
  );
}

export default App;
