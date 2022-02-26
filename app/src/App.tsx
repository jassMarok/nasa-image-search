import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import ImageGrid from "./ImageGrid";
import debounce from "lodash.debounce";
import { IMAGE_SEARCH } from "./queries";
import Pagination from "./Pagination";
import { formatErrorMessage } from "./utils";

function App() {
  const searchInput = useRef<null | HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const [getImages, { loading, error, data }] = useLazyQuery(IMAGE_SEARCH);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const debouncedUpdate = debounce(function () {
      setSearch(searchInput.current?.value.trim() || "");
    }, 1000);
    debouncedUpdate();
  };

  const isSearchEmpty = () => search === "";

  useEffect(() => {
    //Reset pagination if new search
    if (prevSearch !== search) {
      setCurrentPage(1);
    }

    if (search !== "") {
      getImages({ variables: { q: search, from: currentPage } });
      setPrevSearch(search);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage]);

  return (
    <div className="my-12">
      <h1 className="text-6xl text-center font-bold mt-5">Nasa Image Search</h1>
      <div className="text-center mt-8">
        <input
          className="shadow-xl border-4 border-emerald-300 focus:border-purple-300 hover:border-purple-300 border-solid w-96 my-2 px-8 py-4"
          type="text"
          ref={searchInput}
          onChange={handleChange}
          placeholder={"Earth"}
        />
        {isSearchEmpty() && <p className="text-xl mt-2">^ Start with search</p>}
        {!isSearchEmpty() && loading && (
          <p className="text-md text-rose-500 text-blue-600 py-5">
            Loading ...
          </p>
        )}
        {!isSearchEmpty() && error && (
          <p className="text-md text-rose-500 py-5">
            Error! {formatErrorMessage(error)}
          </p>
        )}
        {!isSearchEmpty() && data && (
          <>
            <Pagination
              currentPage={currentPage}
              totalPages={data.nasa.totalPages}
              setCurrentPage={setCurrentPage}
            />
            <ImageGrid collection={data.nasa.collection} />
            <Pagination
              currentPage={currentPage}
              totalPages={data.nasa.totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
