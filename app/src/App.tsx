import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Display from "./Display";
import debounce from "lodash.debounce";

function App() {
  const searchInput = useRef<null | HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const debouncedUpdate = debounce(function () {
      setSearch(searchInput.current?.value.trim() || "");
    }, 1000);
    debouncedUpdate();
  };

  return (
    <div className="App">
      <input type="text" ref={searchInput} onChange={handleChange} />
      <Display search={search} />
    </div>
  );
}

export default App;
