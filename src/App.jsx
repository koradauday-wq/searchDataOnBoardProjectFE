import { useState } from "react";

import "./App.css";
import SearchDataSearchBar from "./components/withDebounce/searchDataSearchBarDebounceWorking.jsx";

// import SearchDataSearchBar from "./components/withoutDebounce/searchDataSearchBar-3.jsx";

function App() {
  return (
    <>
      <SearchDataSearchBar />
    </>
  );
}

export default App;
