import { useState } from "react";
import "./App.css";
import Articles from "./component/Articles";
import { ARTICLES_DATA as articles } from "./constants";

function App({ articles }) {
  const [sorted, setSorted] = useState(() =>
    [...articles].sort((a, b) => b.upvotes - a.upvotes),
  );

  const handleMostUpvoted = () => {
    setSorted((prev) => [...prev].sort((a, b) => b.upvotes - a.upvotes));
  };

  const handleMostRecent = () => {
    setSorted((prev) =>
      [...prev].sort((a, b) => new Date(b.date) - new Date(a.date)),
    );
  };

  return (
    <>
      <nav>
        <h1>Sorting Articles</h1>
      </nav>
      <div className="App">
        <div className="navigation">
          <label>Sort By</label>
          <button data-testid="most-upvoted-link" onClick={handleMostUpvoted}>
            Most Upvoted
          </button>
          <button data-testid="most-recent-link" onClick={handleMostRecent}>
            Most Recent
          </button>
        </div>
        <Articles articles={sorted} />
      </div>
    </>
  );
}

export default App;
